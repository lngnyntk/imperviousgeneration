from PIL import Image, ImageDraw

INK = (10, 10, 15, 255)
PAPER = (245, 243, 238, 255)
SIGNAL = (230, 57, 70, 255)


def rounded_rect_mask(size, radius):
    mask = Image.new("L", (size, size), 0)
    d = ImageDraw.Draw(mask)
    d.rounded_rectangle([0, 0, size - 1, size - 1], radius=radius, fill=255)
    return mask


def make_icon(size):
    # Supersample for smooth edges, then downscale.
    scale = 4
    s = size * scale

    canvas = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    draw = ImageDraw.Draw(canvas)

    radius = int(s * 0.19)
    draw.rounded_rectangle([0, 0, s - 1, s - 1], radius=radius, fill=INK)

    # Faint ring, echoing the SVG source.
    ring_r = int(s * 0.31)
    cx = cy = s // 2
    ring_width = max(2, int(s * 0.027))
    ring_color = (245, 243, 238, 90)  # slightly stronger so it survives downscaling
    draw.ellipse(
        [cx - ring_r, cy - ring_r, cx + ring_r, cy + ring_r],
        outline=ring_color,
        width=ring_width,
    )

    # Play triangle.
    tri_left = int(s * 0.418)
    tri_right = int(s * 0.699)
    tri_top = int(s * 0.328)
    tri_bottom = int(s * 0.672)
    draw.polygon(
        [(tri_left, tri_top), (tri_left, tri_bottom), (tri_right, cy)],
        fill=SIGNAL,
    )

    canvas = canvas.resize((size, size), Image.LANCZOS)
    return canvas


sizes = {
    "/home/claude/imperviousgeneration/public/images/brand/icon-192.png": 192,
    "/home/claude/imperviousgeneration/public/images/brand/icon-512.png": 512,
    "/home/claude/imperviousgeneration/public/images/brand/apple-touch-icon.png": 180,
}

for path, size in sizes.items():
    icon = make_icon(size)
    icon.save(path)
    print(f"saved {path} ({size}x{size})")

# Favicon: multi-size .ico (16/32/48)
fav_sizes = [16, 32, 48]
fav_images = [make_icon(s) for s in fav_sizes]
fav_images[0].save(
    "/home/claude/imperviousgeneration/public/favicon.ico",
    format="ICO",
    sizes=[(s, s) for s in fav_sizes],
    append_images=fav_images[1:],
)
print("saved favicon.ico")

# OG cover image (1200x630) — dark background, centered wordmark feel via
# the same play-mark, kept simple since this is just a social preview card.
og = Image.new("RGBA", (1200, 630), INK)
draw = ImageDraw.Draw(og)
cx, cy = 600, 315
ring_r = 130
draw.ellipse([cx - ring_r, cy - ring_r, cx + ring_r, cy + ring_r], outline=(245, 243, 238, 46), width=4)
draw.polygon([(cx - 45, cy - 75), (cx - 45, cy + 75), (cx + 80, cy)], fill=SIGNAL)
og.convert("RGB").save("/home/claude/imperviousgeneration/public/images/brand/og-cover.png")
# Save a webp copy too since metadata references .webp for OG image.
og.convert("RGB").save("/home/claude/imperviousgeneration/public/images/brand/og-cover.webp", "WEBP", quality=90)
print("saved og-cover")
