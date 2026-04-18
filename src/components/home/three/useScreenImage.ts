import { useEffect, useState } from "react";
import * as THREE from "three";

/**
 * Loads an image as a THREE.Texture suitable for projecting onto a device screen.
 * Returns null until loaded so the calling mesh can render a fallback.
 */
export function useScreenImage(src: string) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");
    loader.load(
      src,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.anisotropy = 16;
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.LinearFilter;
        tex.needsUpdate = true;
        setTexture(tex);
      },
      undefined,
      () => setTexture(null)
    );
  }, [src]);

  return texture;
}
