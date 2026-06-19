from __future__ import annotations

from datetime import date
from pathlib import Path
import re

from PIL import Image, ImageDraw, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parents[1]
POSTS = ROOT / "src" / "content" / "writing"
OUT = ROOT / "public" / "og" / "writing"
AVATAR = ROOT / "public" / "media" / "avatar.png"

NEWSREADER = (
    ROOT
    / "node_modules"
    / "@fontsource-variable"
    / "newsreader"
    / "files"
    / "newsreader-latin-opsz-normal.woff2"
)
GEIST_MONO = (
    ROOT
    / "node_modules"
    / "@fontsource-variable"
    / "geist-mono"
    / "files"
    / "geist-mono-latin-wght-normal.woff2"
)

SCALE = 2
W, H = 1200 * SCALE, 630 * SCALE
MARGIN_X = 96 * SCALE

PAPER = "#faf9f5"
INK = "#211e1a"
MUTED = "#6e6a60"
FAINT = "#a39e92"
LINE = "#e7e3d9"
ACCENT = "#0f6b5c"


def font(path: Path, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(path), size * SCALE)


def parse_frontmatter(path: Path) -> dict[str, object]:
    text = path.read_text()
    match = re.match(r"^---\n(.*?)\n---\n", text, re.S)
    if not match:
        return {}

    data: dict[str, object] = {}
    for line in match.group(1).splitlines():
        if ":" not in line:
            continue
        key, value = line.split(":", 1)
        key = key.strip()
        value = value.strip().strip('"')
        if key == "tags":
            data[key] = [v.strip() for v in value.strip("[]").split(",") if v.strip()]
        else:
            data[key] = value
    return data


def format_year(iso: str) -> str:
    return str(date.fromisoformat(iso).year)


def text_width(draw: ImageDraw.ImageDraw, text: str, face: ImageFont.FreeTypeFont) -> int:
    return int(draw.textlength(text, font=face))


def truncate_to_width(
    draw: ImageDraw.ImageDraw, text: str, face: ImageFont.FreeTypeFont, max_width: int
) -> str:
    if text_width(draw, text, face) <= max_width:
        return text

    ellipsis = "..."
    while text and text_width(draw, text.rstrip() + ellipsis, face) > max_width:
        text = text[:-1]
    return text.rstrip() + ellipsis


def wrap_title(
    draw: ImageDraw.ImageDraw, title: str, face: ImageFont.FreeTypeFont, max_width: int
) -> list[str]:
    words = title.split()
    lines: list[str] = []
    current = ""

    for index, word in enumerate(words):
        candidate = word if not current else f"{current} {word}"
        if text_width(draw, candidate, face) <= max_width:
            current = candidate
            continue

        if current:
            lines.append(current)
        current = word

        if len(lines) == 1:
            remaining = " ".join([current, *words[index + 1 :]])
            lines.append(truncate_to_width(draw, remaining, face, max_width))
            return lines

    if current:
        lines.append(current)
    return lines[:2]


def draw_tracked(
    draw: ImageDraw.ImageDraw,
    xy: tuple[int, int],
    text: str,
    face: ImageFont.FreeTypeFont,
    fill: str,
    tracking: int,
) -> None:
    x, y = xy
    for char in text:
        draw.text((x, y), char, font=face, fill=fill)
        x += text_width(draw, char, face) + tracking


def circular_avatar(size: int) -> Image.Image:
    raw = Image.open(AVATAR).convert("RGB")
    avatar = ImageOps.fit(raw, (size, size), method=Image.Resampling.LANCZOS)

    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, size - 1, size - 1), fill=255)

    out = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    out.paste(avatar.convert("RGBA"), (0, 0), mask)
    return out


def render_card(entry: dict[str, object]) -> Image.Image:
    title = str(entry["title"])
    slug = str(entry["slug"])
    year = format_year(str(entry["date"]))

    canvas = Image.new("RGB", (W, H), PAPER)
    draw = ImageDraw.Draw(canvas)

    title_face = font(NEWSREADER, 84 if len(title) <= 34 else 78)
    mono = font(GEIST_MONO, 22)
    meta_face = font(GEIST_MONO, 24)

    draw.rectangle((0, 0, 6 * SCALE, H), fill=ACCENT)

    eyebrow = "ANKITHANS.COM / WRITING"
    draw_tracked(draw, (MARGIN_X, 80 * SCALE), eyebrow, mono, FAINT, 2 * SCALE)

    avatar_size = 64 * SCALE
    avatar_x = W - MARGIN_X - avatar_size
    avatar_y = 66 * SCALE
    avatar = circular_avatar(avatar_size)
    canvas.paste(avatar, (avatar_x, avatar_y), avatar)
    draw.ellipse(
        (avatar_x, avatar_y, avatar_x + avatar_size - 1, avatar_y + avatar_size - 1),
        outline=LINE,
        width=2 * SCALE,
    )

    max_title_width = 860 * SCALE
    lines = wrap_title(draw, title, title_face, max_title_width)
    title_top = 220 * SCALE if len(lines) == 1 else 188 * SCALE
    line_height = 86 * SCALE
    for idx, line in enumerate(lines):
        draw.text((MARGIN_X, title_top + idx * line_height), line, font=title_face, fill=INK)

    rule_y = title_top + len(lines) * line_height + 38 * SCALE
    draw.rounded_rectangle(
        (MARGIN_X, rule_y, MARGIN_X + 122 * SCALE, rule_y + 3 * SCALE),
        radius=2 * SCALE,
        fill=ACCENT,
    )

    meta = f"{year} / ESSAY"
    draw.text((MARGIN_X, rule_y + 32 * SCALE), meta, font=meta_face, fill=MUTED)

    slug_face = font(GEIST_MONO, 18)
    slug_text = f"/writing/{slug}"
    draw.text((MARGIN_X, H - 78 * SCALE), slug_text, font=slug_face, fill=FAINT)

    return canvas.resize((W // SCALE, H // SCALE), Image.Resampling.LANCZOS)


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)

    for path in sorted(POSTS.glob("*.mdx")):
        entry = parse_frontmatter(path)
        if not entry or entry.get("draft") is True:
            continue
        out = OUT / f"{entry['slug']}.png"
        render_card(entry).save(out, optimize=True)
        print(out.relative_to(ROOT))


if __name__ == "__main__":
    main()
