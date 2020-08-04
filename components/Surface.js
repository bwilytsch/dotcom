import React, {useEffect} from 'react';
import styled from 'styled-components';
import {
  PerspectiveCamera,
  WebGLRenderer,
  Scene,
  Mesh,
  SphereGeometry,
  PlaneBufferGeometry,
  PlaneGeometry,
  ShaderMaterial,
  Color,
  Vector2,
  TextureLoader,
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
    gl_FragColor = vec4((1.0 - tex.xyz) * 0.24, 1.0);
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
    height: 100%;
  }
`;

const assetURL = './grid.png';

const Surface = () => {
  useEffect(() => {
    const size = 512;
    const container = document.getElementById('three-target');
    // Clear container for hot-reload
    container.innerHTML = null;

    let raf = null;
    let mat = null;

    const renderer = new WebGLRenderer({antialias: true});
    renderer.setSize(size, size, false);

    const scene = new Scene();
    const camera = new PerspectiveCamera(72, 1, 0.001, 1000);

    // Append to DOM
    container.appendChild(renderer.domElement);

    const textureLoader = new TextureLoader();

    const uniforms = {
      time: {
        value: 0.0,
      },
      color: {
        value: new Color(1, 1, 0),
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
        value: null,
      },
      force: {
        value: 0,
      },
    };

    textureLoader.load(assetURL, texture => {
      uniforms.map.value = texture;

      mat = new ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms,
        transparent: true,
      });

      const plane = new Mesh(new PlaneBufferGeometry(1, 1, 24, 24), mat);

      plane.position.z -= 0.68;

      scene.add(plane);

      animate();
    });

    // Magic

    const render = () => {
      renderer.render(scene, camera);
    };

    const pointer = new Vector2(0, 0);
    const raycaster = new Raycaster();

    const targetPlane = new Mesh(
      new PlaneGeometry(),
      new MeshBasicMaterial({color: new Color(255, 0, 0)}),
    );
    targetPlane.visible = false;
    targetPlane.position.z -= 0.68;

    scene.add(targetPlane);

    const rect = container.getBoundingClientRect();

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

    renderer.domElement.ontouchstart = e => {
      updatePointer(e);
      pressed = true;
      disableScroll();
      renderer.domElement.addEventListener('touchmove', updatePointer);
    };

    renderer.domElement.ontouchend = e => {
      pressed = false;
      enableScroll();
      renderer.domElement.removeEventListener('touchmove', updatePointer);
      pointer.set(-2, -2);
    };

    renderer.domElement.onmousedown = e => {
      pressed = true;
      disableScroll();
      updatePointer(e);
      renderer.domElement.addEventListener('mousemove', updatePointer);
    };

    renderer.domElement.onmouseup = e => {
      pressed = false;
      enableScroll();
      renderer.domElement.removeEventListener('mousemove', updatePointer);
      pointer.set(-2, -2);
    };

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

    return () => {
      // Cleanup
      cancelAnimationFrame(raf);
    };
  }, []);
  return <StyledTarget id="three-target"></StyledTarget>;
};

export default Surface;
