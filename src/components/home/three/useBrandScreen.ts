import { useEffect, useState } from "react";
import * as THREE from "three";

export interface BrandScreenOptions {
  width: number;
  height: number;
  /** Title shown under the logo, e.g. "Build the Future" */
  title: string;
  /** Sub-tagline, e.g. "with TechnoSpyre" */
  tagline: string;
  /** Small label above the logo (device context) */
  eyebrow: string;
}

/**
 * Renders a branded device screen: gradient bg, TechnoSpyre logo, headline + tagline,
 * subtle UI accents. Returns a CanvasTexture once the logo image is loaded.
 *
 * All three devices (laptop / tablet / phone) share this look so the brand stays
 * consistent across the hero slider.
 */
export function useBrandScreen({ width, height, title, tagline, eyebrow }: BrandScreenOptions) {
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);

  useEffect(() => {
    const c = document.createElement("canvas");
    c.width = width;
    c.height = height;
    const ctx = c.getContext("2d")!;

    const draw = (logoImg?: HTMLImageElement) => {
      // ---------- Background ----------
      const bg = ctx.createLinearGradient(0, 0, width, height);
      bg.addColorStop(0, "#04081f");
      bg.addColorStop(0.55, "#0a1d8a");
      bg.addColorStop(1, "#0066ff");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      // Soft radial glow behind logo
      const glow = ctx.createRadialGradient(
        width / 2,
        height * 0.42,
        20,
        width / 2,
        height * 0.42,
        Math.max(width, height) * 0.55
      );
      glow.addColorStop(0, "rgba(0, 207, 255, 0.45)");
      glow.addColorStop(1, "rgba(0, 207, 255, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      // Subtle grid lines
      ctx.strokeStyle = "rgba(255,255,255,0.05)";
      ctx.lineWidth = 1;
      const step = Math.round(width / 14);
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // ---------- Top status bar ----------
      ctx.fillStyle = "rgba(0,0,0,0.25)";
      ctx.fillRect(0, 0, width, Math.round(height * 0.04));
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.textAlign = "left";
      ctx.font = `bold ${Math.round(height * 0.018)}px -apple-system, sans-serif`;
      ctx.fillText("● TechnoSpyre OS", 24, Math.round(height * 0.028));
      ctx.textAlign = "right";
      ctx.fillText("◐  ◔  100%", width - 24, Math.round(height * 0.028));

      // ---------- Eyebrow chip ----------
      ctx.textAlign = "center";
      const eyebrowFontSize = Math.round(height * 0.022);
      ctx.font = `bold ${eyebrowFontSize}px -apple-system, sans-serif`;
      const eyebrowWidth = ctx.measureText(eyebrow.toUpperCase()).width + 32;
      const eyebrowX = (width - eyebrowWidth) / 2;
      const eyebrowY = height * 0.18;
      ctx.fillStyle = "rgba(0, 207, 255, 0.18)";
      roundRect(ctx, eyebrowX, eyebrowY, eyebrowWidth, eyebrowFontSize * 1.9, eyebrowFontSize);
      ctx.fill();
      ctx.strokeStyle = "rgba(0, 207, 255, 0.5)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillStyle = "#7fe3ff";
      ctx.fillText(eyebrow.toUpperCase(), width / 2, eyebrowY + eyebrowFontSize * 1.3);

      // ---------- Logo ----------
      const logoH = Math.round(height * 0.18);
      const logoW = logoImg ? (logoImg.width / logoImg.height) * logoH : logoH;
      const logoY = height * 0.27;
      if (logoImg) {
        ctx.drawImage(logoImg, (width - logoW) / 2, logoY, logoW, logoH);
      } else {
        // Fallback monogram
        ctx.fillStyle = "#00CFFF";
        ctx.font = `bold ${logoH}px -apple-system, sans-serif`;
        ctx.fillText("◆", width / 2, logoY + logoH * 0.85);
      }

      // ---------- Headline ----------
      ctx.textAlign = "center";
      ctx.fillStyle = "#ffffff";
      const titleSize = Math.round(height * 0.07);
      ctx.font = `bold ${titleSize}px -apple-system, sans-serif`;
      ctx.fillText(title, width / 2, logoY + logoH + titleSize * 1.3);

      // Tagline with gradient accent
      const tagSize = Math.round(height * 0.045);
      ctx.font = `600 ${tagSize}px -apple-system, sans-serif`;
      const tagGrad = ctx.createLinearGradient(0, 0, width, 0);
      tagGrad.addColorStop(0, "#00CFFF");
      tagGrad.addColorStop(1, "#7fe3ff");
      ctx.fillStyle = tagGrad;
      ctx.fillText(tagline, width / 2, logoY + logoH + titleSize * 1.3 + tagSize * 1.4);

      // ---------- Bottom feature pills ----------
      const pills = ["Hospital ERP", "Custom Apps", "AI & Cloud"];
      const pillY = height * 0.78;
      const pillFont = Math.round(height * 0.022);
      ctx.font = `600 ${pillFont}px -apple-system, sans-serif`;
      const totalPillsWidth = pills.reduce(
        (acc, p) => acc + ctx.measureText(p).width + 40,
        0
      ) + (pills.length - 1) * 16;
      let pillX = (width - totalPillsWidth) / 2;
      pills.forEach((p) => {
        const w = ctx.measureText(p).width + 40;
        ctx.fillStyle = "rgba(255,255,255,0.1)";
        roundRect(ctx, pillX, pillY, w, pillFont * 2.2, pillFont);
        ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,0.18)";
        ctx.stroke();
        ctx.fillStyle = "#ffffff";
        ctx.fillText(p, pillX + w / 2, pillY + pillFont * 1.5);
        pillX += w + 16;
      });

      // ---------- Bottom website url ----------
      ctx.fillStyle = "rgba(255,255,255,0.55)";
      ctx.font = `500 ${Math.round(height * 0.022)}px -apple-system, sans-serif`;
      ctx.fillText("technospyre.com", width / 2, height * 0.93);

      const tex = new THREE.CanvasTexture(c);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 16;
      tex.needsUpdate = true;
      setTexture(tex);
    };

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => draw(img);
    img.onerror = () => draw(undefined);
    img.src = "/logo1.png";

    return () => {
      // noop — texture cleaned up by GC when component unmounts
    };
  }, [width, height, title, tagline, eyebrow]);

  return texture;
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
