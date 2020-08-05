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
  TextureLoader,
  Texture,
  CanvasTexture,
  Raycaster,
  MeshBasicMaterial,
} from 'three';

const vertexShader = `
  precision highp float;
  uniform vec2 pointer;
  uniform vec2 resolution;
  uniform float force;
  uniform float time;
  varying vec2 vUv;
  varying float noise;

  void main(){
    vUv = uv;
    vec3 pos = position;

    float dist = distance(position.xy, pointer.xy);

    dist = clamp(0.0, 0.4, dist);
    
    float f = pow(dist, 2.) * force * normal.z;
    pos.z -= smoothstep(0.0, 4., f);

   noise = pos.z;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform vec3 color;
  uniform float time;
  uniform vec2 resolution;
  uniform vec2 grid;
  uniform vec2 pointer;
  varying vec2 vUv;
  uniform sampler2D map;
  varying float noise;

  void main(){
    vec4 tex = texture2D(map, vUv + (noise * 0.1));
    gl_FragColor = vec4(tex.xyz, 1.0);
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

    tex.setSize(size * w * 2, size * h * 2);

    tex.grid({
      tileSize: 32,
      color: '#555555',
    });

    tex.text('Hello.', {size: 240 * w});
    // Clear container for hot-reload
    container.innerHTML = null;

    let raf = null;
    let mat = null;

    const renderer = new WebGLRenderer({antialias: true});
    renderer.setSize(size * w, size * h, false);

    const scene = new Scene();
    const camera = new PerspectiveCamera(72, w / h, 0.001, 1000);

    // Append to DOM
    container.appendChild(renderer.domElement);

    const texture = new Texture(tex.domElement);
    texture.generateMipmaps = false;
    texture.wrapS = texture.wrapT = ClampToEdgeWrapping;
    texture.minFilter = LinearFilter;
    texture.needsUpdate = true;

    const uniforms = {
      time: {
        value: 0.0,
      },
      color: {
        value: new Color(1, 1, 1),
      },
      resolution: {
        value: new Vector2(size, size),
        type: 'v2',
      },
      grid: {
        value: new Vector2(10, 10),
        type: 'v2',
      },
      pointer: {
        value: new Vector2(size / 2, size / 2),
      },
      map: {
        value: texture,
      },
      force: {
        value: 0,
      },
    };

    mat = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
    });

    mat.uniforms.map.value.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const plane = new Mesh(new PlaneBufferGeometry(w, h, 24, 24), mat);

    plane.position.z -= 0.72;

    scene.add(plane);

    // Magic

    const render = () => {
      renderer.render(scene, camera);
    };

    const pointer = new Vector2(0, 0);
    const raycaster = new Raycaster();

    const targetPlane = new Mesh(
      new PlaneGeometry(w, h),
      new MeshBasicMaterial({color: new Color(255, 0, 0)}),
    );
    targetPlane.visible = false;
    targetPlane.position.z -= 0.68;

    scene.add(targetPlane);

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

      if (mat === null) return;
      mat.uniforms.force.value = 3.0;
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
      disableScroll();
      renderer.domElement.addEventListener('touchmove', updatePointer);
      renderer.domElement.addEventListener('mousemove', updatePointer);
    };

    const onEnd = () => {
      pressed = false;
      enableScroll();
      renderer.domElement.removeEventListener('touchmove', updatePointer);
      renderer.domElement.removeEventListener('mousemove', updatePointer);
      pointer.set(-2, -2);
    };

    renderer.domElement.ontouchstart = onStart;
    renderer.domElement.ontouchend = onEnd;

    renderer.domElement.onmousedown = onStart;
    renderer.domElement.onmouseup = onEnd;

    renderer.domElement.onmouseleave = onEnd;

    const animate = () => {
      raycaster.setFromCamera(pointer, camera);

      if (pressed) {
        const intersects = raycaster.intersectObjects([targetPlane]);

        if (intersects.length > 0) {
          const obj = intersects[0];
          mat.uniforms.pointer.value.copy(obj.point);
        } else {
          if (mat.uniforms.force.value > 0) {
            mat.uniforms.force.value -= 0.01;
          }
        }
      } else {
        if (mat.uniforms.force.value > 0) {
          mat.uniforms.force.value -= 0.2;
        }
      }
      render();

      // mat.uniforms.time.value += 0.01;

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
