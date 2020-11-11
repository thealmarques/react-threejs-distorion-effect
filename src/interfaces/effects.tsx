import { ShaderMaterial, Texture } from "three";

export interface Effects {
  material: ShaderMaterial;
  images: Texture[];
}