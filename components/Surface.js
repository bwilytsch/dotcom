import React, {useEffect} from 'react';
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
import {lerp} from './utils';

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
  uniform vec3 color;
  varying vec2 vUv;
  uniform sampler2D map;

  float grid(vec2 st, float res){
    vec2 grid = fract(st*res);
    return (step(res, grid.x) * step(res, grid.y));
  }

  void main(){
    vec2 grid_uv = vUv * 480.0;
    // grid_uv.y *= 0.5;
    float x = grid(grid_uv, 0.0543);
    vec4 tex = texture2D(map, vUv);
    gl_FragColor = vec4(1.0 - vec3(1.) * x, 0.5);
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

const Surface = ({ratio = [1, 1]}) => {
  useEffect(() => {
    const size = 512;

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

    // Bind interaction
    const updatePointer = e => {
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
      disableScroll();
      renderer.domElement.addEventListener('touchmove', updatePointer);
      renderer.domElement.addEventListener('mousemove', updatePointer);
    };

    const onEnd = () => {
      pressed = false;
      targetForce = 0;
      enableScroll();
      renderer.domElement.removeEventListener('touchmove', updatePointer);
      renderer.domElement.removeEventListener('mousemove', updatePointer);
    };

    renderer.domElement.ontouchstart = onStart;
    renderer.domElement.ontouchend = onEnd;

    renderer.domElement.onmousedown = onStart;
    renderer.domElement.onmouseup = onEnd;

    renderer.domElement.onmouseleave = onEnd;

    const animate = () => {
      update();
      render();

      raf = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      // Cleanup
      cancelAnimationFrame(raf);
      onEnd();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <StyledTarget id="three-target"></StyledTarget>;
};

export default Surface;
