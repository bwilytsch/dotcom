import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';
import {
  PerspectiveCamera,
  WebGLRenderer,
  Scene,
  Mesh,
  SphereGeometry,
  PlaneBufferGeometry,
  ClampToEdgeWrapping,
  PlaneGeometry,
  ShaderMaterial,
  LinearFilter,
  NearestFilter,
  Color,
  Vector2,
  Vector3,
  TextureLoader,
  Texture,
  Uniform,
  CanvasTexture,
  Raycaster,
  MeshBasicMaterial,
} from 'three';
import {lerp, supportsWebp} from './utils';
import gsap from 'gsap';
import {projects, experiments} from '../pages/api/hello';

const setAttrs = (target, attrs) => {
  Object.keys(attrs).forEach(key => {
    target[key] = attrs[key];
  });
};

const vertexShader = `
  uniform vec3 pointer;
  uniform vec2 uPosition;
  uniform float maxLength;
  uniform float force;
  varying vec2 vUv;

  void main(){
    vUv = uv;
    vec3 pos = position.xyz;
    pos.xy += uPosition;

    float dist = distance(position, pointer) / maxLength;
    float progress = smoothstep(dist, 1., force);

    pos = mix(pos, pointer, progress);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform sampler2D map;
  uniform float showImage;

  float grid(vec2 st, float res){
    vec2 grid = fract(st*res);
    return (step(res, grid.x) * step(res, grid.y));
  }

  void main(){
     vec4 color = vec4(0.);
  
    if (showImage == 1.){
      color = texture2D(map, vUv);
    } else {
     vec2 grid_uv = vUv * 480.0;
     float x = grid(grid_uv, 0.0543);
     color = vec4(1.0 - vec3(1.) * x, 0.5); 
    }

    gl_FragColor = vec4(color);
  }
`;

const StyledTarget = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  canvas {
    width: 100%;
    height: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    &:hover {
      cursor: pointer;
    }
  }
`;

const assetURL = '';

const defaultTextOptions = {
  font: 'Inter, sans-serif',
  size: 240,
  weight: 700,
  color: '#FFFFFF',
  verticalAlign: 'center',
  margin: 24,
};

class DynamicTexture {
  constructor() {
    this.domElement = document.createElement('canvas');
    this.domElement.setAttribute('data-name', 'texture');
    this._ctx = this.domElement.getContext('2d');
  }
  setSize(width, height) {
    this.domElement.width = width;
    this.domElement.height = height;
  }
  image(imageUrl) {}
  text(word = 'Hello.', opts = defaultTextOptions) {
    const {font, size, weight, color, margin} = {
      ...defaultTextOptions,
      ...opts,
    };
    this._ctx.font = `${weight} ${size}px ${font} `;
    this._ctx.fillStyle = color;
    this._ctx.fillText(word, margin, size, this.domElement.width - 2 * margin);
  }
  clear() {
    this._ctx.fillStyle = '#000000';
    this._ctx.fillRect(0, 0, this.domElement.width, this.domElement.height);
  }
  grid(
    {tileSize, color} = {
      tileSize: 16,
      color: '#FFFFFF',
    },
  ) {
    // Calculate Columns
    const columnCount = Math.floor(this.domElement.width / tileSize);
    const rowCount = Math.floor(this.domElement.height / tileSize);

    this.setSize(columnCount * tileSize, rowCount * tileSize);

    for (let i = 0; i < rowCount; i++) {
      for (let j = 0; j < columnCount; j++) {
        this._ctx.strokeStyle = color;
        this._ctx.rect(j * tileSize, i * tileSize, tileSize, tileSize);
        this._ctx.stroke();
        this._ctx.closePath();
      }
    }
  }
}

const Surface = ({ratio = [1, 1], projectId = null}) => {
  const textureSwitcher = useRef(null);

  useEffect(() => {
    const size = 1024;

    const [w, h] = ratio;
    const container = document.getElementById('three-target');
    const tex = new DynamicTexture();

    tex.setSize(size * w, size * h);

    // tex.grid({
    //   tileSize: 24,
    //   color: '#555555',
    // });

    // tex.text('Hello.', {size: 64 * w});
    // Clear container for hot-reload
    container.innerHTML = null;

    let raf = null;
    let mat = null;

    const renderer = new WebGLRenderer({antialias: true});
    renderer.setSize(size * w, size * h, false);

    const scene = new Scene();
    const camera = new PerspectiveCamera(72, w / h, 0.001, 1000);
    camera.position.z += 0.78;

    // Append to DOM
    container.appendChild(renderer.domElement);

    const texture = new Texture(tex.domElement);
    texture.generateMipmaps = false;
    texture.wrapS = texture.wrapT = ClampToEdgeWrapping;
    texture.minFilter = LinearFilter;
    texture.needsUpdate = true;

    const getViewSize = () => {
      const fovInRadians = (camera.fov * Math.PI) / 180;
      const height = Math.abs(
        camera.position.z * Math.tan(fovInRadians / 2) * 2,
      );

      return {width: height * camera.aspect, height};
    };

    const viewSize = getViewSize();

    const maxLength = Math.sqrt(
      (viewSize.width + 10) * (viewSize.width + 10) +
        (viewSize.height + 10) * (viewSize.height + 10),
    );

    const force = new Uniform(0);
    const pointer = new Vector3(0, 0, 0);
    const maxForce = 0.2;
    let targetForce = 0;

    const uniforms = {
      color: new Uniform(new Color(1, 1, 1)),
      pointer: new Uniform(pointer),
      map: new Uniform(texture),
      maxLength: new Uniform(maxLength),
      showImage: new Uniform(0),
      force,
      uPosition: new Uniform(
        new Vector2(
          -viewSize.width / 2 + (w * 1.13) / 2 + pointer.x,
          -viewSize.height / 2 + (h * 1.13) / 2 + pointer.y,
        ),
      ),
    };

    mat = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
    });

    const plane = new Mesh(new PlaneBufferGeometry(w, h, 1, 1), mat);

    scene.add(plane);

    // Magic
    const update = () => {
      let change = lerp(force.value, targetForce, 0.1, 0.0001);

      if (change !== 0) {
        force.value += change;
        force.needsUpdate = true;
      }
    };

    const render = () => {
      renderer.render(scene, camera);
    };

    let rect = container.getBoundingClientRect();

    const handleResize = () => {
      let rect = container.getBoundingClientRect();
    };

    window.addEventListener('resize', handleResize);

    // Pre-load Image Textures
    const textureLoader = new TextureLoader();

    // Bind interaction
    const updatePointer = e => {
      e.preventDefault();
      e.stopPropagation();

      let clientX = 0;
      let clientY = 0;

      if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].pageX;
        clientY = e.touches[0].pageY;
      } else {
        clientX = e.pageX;
        clientY = e.pageY;
      }

      pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      pointer.z = 0;
    };

    let pressed = false;

    const disableScroll = () => {
      document.body.style.overflow = 'hidden';
    };

    const enableScroll = () => {
      document.body.style.overflow = 'inherit';
    };

    const onStart = e => {
      updatePointer(e);
      pressed = true;
      targetForce = maxForce;
      renderer.domElement.addEventListener('mousemove', updatePointer);
      renderer.domElement.addEventListener('mouseup', onEnd);
    };

    const onTouchStart = e => {
      disableScroll();
      renderer.domElement.addEventListener('touchmove', updatePointer);
      renderer.domElement.addEventListener('touchend', onTouchEnd);
      onStart(e);
    };

    const onEnd = () => {
      pressed = false;
      targetForce = 0;
      renderer.domElement.removeEventListener('mousemove', updatePointer);
      renderer.domElement.removeEventListener('mouseup', onEnd);
    };

    const onTouchEnd = e => {
      enableScroll();
      renderer.domElement.removeEventListener('touchmove', updatePointer);
      renderer.domElement.removeEventListener('touchend', onTouchEnd);
      onEnd();
    };

    renderer.domElement.addEventListener('touchstart', onTouchStart);
    renderer.domElement.addEventListener('mousedown', onStart);
    renderer.domElement.addEventListener('mouseleave', onEnd);

    const animate = () => {
      update();
      render();

      raf = requestAnimationFrame(animate);
    };

    animate();

    let textures = [];

    const loadAllTextures = (arr, callback = () => {}) => {
      if (arr.length === 0) return;

      const buffer = [];
      const len = arr.length;

      const loadTexture = index => {
        const obj = arr[index];

        textureLoader.load(obj.url, tex => {
          // Process
          tex.generateMipmaps = false;
          tex.wrapS = texture.wrapT = ClampToEdgeWrapping;
          tex.minFilter = LinearFilter;
          tex.needsUpdate = true;
          tex._projectId = obj._id;

          buffer.push(tex);

          if (index === len - 1) {
            callback(buffer);
          } else {
            loadTexture(index + 1);
          }
        });
      };

      loadTexture(0);
    };

    const changeTexture = id => {
      if (!id) return;

      const results = textures.filter(texture => texture._projectId === id);

      if (results.length === 0 && mat.uniforms.showImage.value === 0) return;

      gsap.to('#three-target', 0.24, {
        opacity: 0,
        scaleX: 0.98,
        scaleY: 0.98,
        onComplete: () => {
          if (mat.uniforms.showImage.value === 0) {
            mat.uniforms.showImage.value = 1;
          }

          if (results.length === 0) {
            // Default back to grid
            mat.uniforms.showImage.value = 0;
          } else {
            // Swap texture
            mat.uniforms.map.value = results[0];
          }

          gsap.to('#three-target', 0.48, {opacity: 1, scaleX: 1, scaleY: 1});
        },
      });
    };

    // Unblock main thread
    setTimeout(async () => {
      // Buffer Textures

      const webpSupported = await supportsWebp();
      const source = webpSupported ? 0 : 1;

      loadAllTextures(
        [...projects, ...experiments]
          .map(({media, _id}) => ({url: media[source].src, _id}))
          .filter(({url}) => url.length > 0),
        arr => {
          textures = arr;
          // Load first image by default

          changeTexture(textures[0]._projectId);
        },
      );
    }, 0);

    textureSwitcher.current = changeTexture;

    return () => {
      // Cleanup
      cancelAnimationFrame(raf);
      onEnd();
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('touchstart', onTouchStart);
      renderer.domElement.removeEventListener('mousedown', onStart);
      renderer.domElement.removeEventListener('mouseleave', onEnd);
    };
  }, []);

  useEffect(() => {
    if (
      textureSwitcher.current &&
      typeof textureSwitcher.current === 'function'
    ) {
      textureSwitcher.current(projectId);
    }
  }, [projectId]);

  return <StyledTarget id="three-target"></StyledTarget>;
};

export default Surface;
