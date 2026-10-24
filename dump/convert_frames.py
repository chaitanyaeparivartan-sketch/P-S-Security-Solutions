#!/usr/bin/env python3
"""
Convert .mov videos → 300 WebP frames at 30fps using ffmpeg pipe + PIL.
Usage: python3 convert_frames.py <input.mov> <output_folder>
"""
import sys, os, subprocess
from PIL import Image
import io

def convert(video_path, out_folder, fps=30, total_frames=300, quality=88):
    os.makedirs(out_folder, exist_ok=True)
    # Remove existing webp files
    for f in os.listdir(out_folder):
        if f.endswith('.webp'):
            os.remove(os.path.join(out_folder, f))

    print(f"▶ Converting {os.path.basename(video_path)} → {out_folder} ({total_frames} frames @ {fps}fps, q={quality})")

    cmd = [
        'ffmpeg', '-i', video_path,
        '-vf', f'fps={fps},scale=1920:1080:flags=lanczos',
        '-vframes', str(total_frames),
        '-f', 'image2pipe',
        '-vcodec', 'mjpeg',
        '-q:v', '2',   # high quality JPEG
        '-',
        '-y'
    ]
    proc = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL)

    frame_idx = 0
    buf = b''
    SOI = b'\xff\xd8'
    EOI = b'\xff\xd9'

    while True:
        chunk = proc.stdout.read(65536)
        if not chunk:
            break
        buf += chunk
        while True:
            start = buf.find(SOI)
            if start == -1:
                buf = b''
                break
            end = buf.find(EOI, start)
            if end == -1:
                buf = buf[start:]
                break
            jpeg_data = buf[start:end+2]
            buf = buf[end+2:]

            frame_idx += 1
            out_path = os.path.join(out_folder, f'f_{frame_idx:04d}.webp')
            try:
                img = Image.open(io.BytesIO(jpeg_data))
                img.save(out_path, 'WEBP', quality=quality, method=4)
            except Exception as e:
                print(f"  ⚠ Frame {frame_idx} error: {e}")

    proc.wait()
    print(f"  ✅ Done → {frame_idx} frames written to {out_folder}")
    return frame_idx

if __name__ == '__main__':
    if len(sys.argv) != 3:
        print("Usage: python3 convert_frames.py <video.mov> <output_folder>")
        sys.exit(1)
    convert(sys.argv[1], sys.argv[2])
