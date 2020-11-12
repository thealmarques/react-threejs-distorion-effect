import * as THREE from "three";
import { Texture } from "three";
import { Effects } from "../interfaces/effects";

export const SliderEffect = (opts: {
  parent: HTMLElement,
  images: Element[]
}): Effects => {

  const vertex = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 0.7 );
      }
  `;

  const fragment = `
      varying vec2 vUv;

      uniform sampler2D currentImage;
      uniform sampler2D nextImage;

      uniform float dispFactor;

      void main() {

          vec2 uv = vUv;
          vec4 _currentImage;
          vec4 _nextImage;
          float intensity = 0.6;

          vec4 orig1 = texture2D(currentImage, uv);
          vec4 orig2 = texture2D(nextImage, uv);
          
          _currentImage = texture2D(currentImage, vec2(uv.x, uv.y + dispFactor * (orig2 * intensity)));

          _nextImage = texture2D(nextImage, vec2(uv.x, uv.y + (1.0 - dispFactor) * (orig1 * intensity)));

          vec4 finalTexture = mix(_currentImage, _nextImage, dispFactor);

          gl_FragColor = finalTexture;
      }
  `;

  let images = opts.images, image: Texture, sliderImages: Texture[] = [];;
  let canvasWidth = images[0].clientWidth;
  let canvasHeight = images[0].clientHeight;
  let parent = opts.parent;
  let renderWidth = window.innerWidth;
  let renderHeight = window.innerHeight;

  let renderW: number, renderH: number;

  if( renderWidth > canvasWidth ) {
    renderW = renderWidth;
  } else {
    renderW = canvasWidth;
  }

  renderH = canvasHeight;

  let renderer = new THREE.WebGLRenderer({
      antialias: false,
  });

  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setClearColor( 0x23272A, 1.0 );
  renderer.setSize( renderW, renderH );
  parent.appendChild( renderer.domElement );

  let loader = new THREE.TextureLoader();
   loader.crossOrigin = "anonymous";

  images.forEach((img: Element) => {
      image = loader.load( img.getAttribute( 'src' ) + '?v=' + Date.now() );
      image.magFilter = image.minFilter = THREE.LinearFilter;
      image.anisotropy = renderer.capabilities.getMaxAnisotropy();
      sliderImages.push( image );
  });

  let scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x23272A );
  let camera = new THREE.OrthographicCamera(
      renderWidth / -2,
      renderWidth / 2,
      renderHeight / 2,
      renderHeight / -2,
      1,
      1000
  );
  camera.position.z = 2;

  let mat = new THREE.ShaderMaterial({
    uniforms: {
      dispFactor: { value: 0.0 },
      currentImage: { value: sliderImages[0] },
      nextImage: { value: sliderImages[1] },
  },
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      opacity: 1.0
  });

  let geometry = new THREE.PlaneBufferGeometry(
      parent.offsetWidth,
      parent.offsetHeight,
      1
  );
  let object = new THREE.Mesh(geometry, mat);
  object.position.set(0, 0, 0);
  scene.add(object);

  window.addEventListener( 'resize' , function(e) {
      renderer.setSize(renderW, renderH);
  });

  let animate = function() {
      requestAnimationFrame(animate);

      renderer.render(scene, camera);
  };
  animate();

  return {
    material: mat,
    images: sliderImages
  };
};