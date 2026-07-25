"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let rafId: number;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.05);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    camera.position.z = 200;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    containerRef.current.appendChild(renderer.domElement);

    const isMobile = window.innerWidth < 768;
    const counts = {
      stars: isMobile ? 8000 : 25000,
      nebula: isMobile ? 15 : 40,
      dust: isMobile ? 300 : 1000,
      nodes: isMobile ? 30 : 80,
      globeNodes: isMobile ? 200 : 500,
    };

    let time = 0;
    const clock = new THREE.Clock();

    let mouseX = 0;
    let mouseY = 0;
    const cameraDrift = { z: 200 };
    let isCinematicActive = true;

    const createSoftTexture = (coreIntensity: number, edgeSoftness: number) => {
      const canvas = document.createElement("canvas");
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext("2d");
      if (!ctx) return new THREE.Texture();
      const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      gradient.addColorStop(0, `rgba(255, 255, 255, ${coreIntensity})`);
      gradient.addColorStop(edgeSoftness, `rgba(255, 255, 255, 0.2)`);
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 128, 128);
      return new THREE.CanvasTexture(canvas);
    };

    // 1. Starfield
    const starPositions = new Float32Array(counts.stars * 3);
    const starColors = new Float32Array(counts.stars * 3);
    const starSizes = new Float32Array(counts.stars);

    for (let i = 0; i < counts.stars; i++) {
      const cluster = Math.random() > 0.6;
      let r, theta, phi;
      if (cluster) {
        const arm = Math.floor(Math.random() * 3);
        const armOffset = ((Math.PI * 2) / 3) * arm;
        r = 200 + Math.random() * 800;
        theta = armOffset + r * 0.005 + (Math.random() - 0.5) * 0.5;
        phi = Math.acos(Math.random() * 0.4 - 0.2);
      } else {
        r = 100 + Math.random() * 1000;
        theta = 2 * Math.PI * Math.random();
        phi = Math.acos(2 * Math.random() - 1);
      }
      starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = r * Math.cos(phi);

      const colorMix = Math.random();
      starColors[i * 3] = colorMix > 0.9 ? 0.9 : 1.0;
      starColors[i * 3 + 1] = colorMix > 0.9 ? 0.9 : 1.0;
      starColors[i * 3 + 2] = colorMix > 0.8 ? 1.0 : 0.95;

      starSizes[i] = Math.random() * (Math.random() > 0.95 ? 2.5 : 1.0);
    }

    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute("color", new THREE.BufferAttribute(starColors, 3));
    starGeometry.setAttribute("size", new THREE.BufferAttribute(starSizes, 1));

    const starMaterial = new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 } },
      vertexShader: `
          attribute float size;
          attribute vec3 color;
          varying vec3 vColor;
          varying float vOpacity;
          uniform float time;
          void main() {
              vColor = color;
              vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
              gl_PointSize = size * (400.0 / -mvPosition.z);
              gl_Position = projectionMatrix * mvPosition;
              vOpacity = 0.6 + 0.4 * sin(time * 0.2 + position.x * 0.05 + position.y * 0.05);
          }
      `,
      fragmentShader: `
          varying vec3 vColor;
          varying float vOpacity;
          void main() {
              vec2 coord = gl_PointCoord - vec2(0.5);
              if(length(coord) > 0.5) discard;
              gl_FragColor = vec4(vColor, vOpacity * 0.8);
          }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const starfield = new THREE.Points(starGeometry, starMaterial);
    scene.add(starfield);

    // 2. Nebula
    const nebulaGeo = new THREE.BufferGeometry();
    const nebulaPos = new Float32Array(counts.nebula * 3);
    const nebulaSizes = new Float32Array(counts.nebula);
    for (let i = 0; i < counts.nebula; i++) {
      nebulaPos[i * 3] = (Math.random() - 0.5) * 800;
      nebulaPos[i * 3 + 1] = (Math.random() - 0.5) * 800;
      nebulaPos[i * 3 + 2] = (Math.random() - 0.5) * 600 - 200;
      nebulaSizes[i] = 300 + Math.random() * 500;
    }
    nebulaGeo.setAttribute("position", new THREE.BufferAttribute(nebulaPos, 3));
    nebulaGeo.setAttribute("size", new THREE.BufferAttribute(nebulaSizes, 1));

    const nebulaMat = new THREE.ShaderMaterial({
      uniforms: { map: { value: createSoftTexture(0.2, 0.4) } },
      vertexShader: `
          attribute float size;
          void main() {
              vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
              gl_PointSize = size * (400.0 / -mvPosition.z);
              gl_Position = projectionMatrix * mvPosition;
          }
      `,
      fragmentShader: `
          uniform sampler2D map;
          void main() {
              vec4 texColor = texture2D(map, gl_PointCoord);
              gl_FragColor = vec4(1.0, 1.0, 1.0, texColor.a * 0.05);
          }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const nebula = new THREE.Points(nebulaGeo, nebulaMat);
    scene.add(nebula);

    // 3. Cosmic Dust
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(counts.dust * 3);
    const dustVelocities: { x: number; y: number; z: number }[] = [];
    for (let i = 0; i < counts.dust; i++) {
      dustPos[i * 3] = (Math.random() - 0.5) * 400;
      dustPos[i * 3 + 1] = (Math.random() - 0.5) * 400;
      dustPos[i * 3 + 2] = (Math.random() - 0.5) * 400;
      dustVelocities.push({
        x: (Math.random() - 0.5) * 0.05,
        y: (Math.random() - 0.5) * 0.05,
        z: (Math.random() - 0.5) * 0.05,
      });
    }
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
      size: 1.5,
      color: 0xffffff,
      transparent: true,
      opacity: 0.3,
      map: createSoftTexture(0.8, 0.2),
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const dust = new THREE.Points(dustGeo, dustMat);
    scene.add(dust);

    // 4. Foreground Network
    const nodeGeo = new THREE.BufferGeometry();
    const nodePos = new Float32Array(counts.nodes * 3);
    const nodeVelocities: { x: number; y: number; z: number }[] = [];
    for (let i = 0; i < counts.nodes; i++) {
      nodePos[i * 3] = (Math.random() - 0.5) * 300;
      nodePos[i * 3 + 1] = (Math.random() - 0.5) * 300;
      nodePos[i * 3 + 2] = (Math.random() - 0.5) * 200;
      nodeVelocities.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02,
      });
    }
    nodeGeo.setAttribute("position", new THREE.BufferAttribute(nodePos, 3));
    const nodeMat = new THREE.PointsMaterial({
      size: 3.0,
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
      map: createSoftTexture(1.0, 0.1),
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const networkNodes = new THREE.Points(nodeGeo, nodeMat);
    scene.add(networkNodes);

    const lineGeo = new THREE.BufferGeometry();
    const lineMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.03,
      blending: THREE.AdditiveBlending,
    });
    const networkLines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(networkLines);

    // 5. Central Cosmic Globe
    const globeGroup = new THREE.Group();
    const globeRadius = 100;
    const sphereGeo = new THREE.SphereGeometry(globeRadius, 32, 32);

    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.02,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    globeGroup.add(new THREE.Mesh(sphereGeo, coreMat));

    const wireframeMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.04,
      blending: THREE.AdditiveBlending,
    });
    globeGroup.add(new THREE.LineSegments(new THREE.WireframeGeometry(sphereGeo), wireframeMat));

    const globeNodeGeo = new THREE.BufferGeometry();
    const globeNodePos = new Float32Array(counts.globeNodes * 3);
    const surfacePoints: THREE.Vector3[] = [];
    for (let i = 0; i < counts.globeNodes; i++) {
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      const x = globeRadius * Math.sin(phi) * Math.cos(theta);
      const y = globeRadius * Math.sin(phi) * Math.sin(theta);
      const z = globeRadius * Math.cos(phi);
      globeNodePos[i * 3] = x;
      globeNodePos[i * 3 + 1] = y;
      globeNodePos[i * 3 + 2] = z;
      surfacePoints.push(new THREE.Vector3(x, y, z));
    }
    globeNodeGeo.setAttribute("position", new THREE.BufferAttribute(globeNodePos, 3));
    const globeNodeMat = new THREE.PointsMaterial({
      size: 1.5,
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
      map: createSoftTexture(1.0, 0.2),
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    globeGroup.add(new THREE.Points(globeNodeGeo, globeNodeMat));

    const globeLinePos = [];
    for (let i = 0; i < surfacePoints.length; i++) {
      for (let j = i + 1; j < surfacePoints.length; j++) {
        if (surfacePoints[i].distanceTo(surfacePoints[j]) < 20 && Math.random() > 0.5) {
          globeLinePos.push(
            surfacePoints[i].x,
            surfacePoints[i].y,
            surfacePoints[i].z,
            surfacePoints[j].x,
            surfacePoints[j].y,
            surfacePoints[j].z
          );
        }
      }
    }
    const globeLineGeo = new THREE.BufferGeometry();
    globeLineGeo.setAttribute("position", new THREE.Float32BufferAttribute(globeLinePos, 3));
    const globeLineMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.08,
      blending: THREE.AdditiveBlending,
    });
    globeGroup.add(new THREE.LineSegments(globeLineGeo, globeLineMat));

    globeGroup.position.set(70, -50, -300);
    globeGroup.scale.set(0.01, 0.01, 0.01);
    globeGroup.rotation.x = 0.2;
    globeGroup.rotation.z = -0.1;
    scene.add(globeGroup);

    scene.add(new THREE.AmbientLight(0xffffff, 0.05));

    const ctx = gsap.context(() => {
      gsap.to(scene.fog as THREE.FogExp2, {
        density: 0.0012,
        duration: 3,
        ease: "power2.inOut",
      });

      gsap.to(globeGroup.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 4,
        ease: "power3.out",
        delay: 1.5,
      });

      gsap.to(globeGroup.position, {
        y: -20,
        z: -100,
        duration: 4,
        ease: "power3.out",
        delay: 1.5,
        onComplete: () => {
          isCinematicActive = false;
        },
      });
    });

    const updateDustAndNetwork = () => {
      const dPos = dust.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < counts.dust; i++) {
        dPos[i * 3] += dustVelocities[i].x;
        dPos[i * 3 + 1] += dustVelocities[i].y;
        dPos[i * 3 + 2] += dustVelocities[i].z;
        if (Math.abs(dPos[i * 3]) > 200) dPos[i * 3] *= -0.9;
        if (Math.abs(dPos[i * 3 + 1]) > 200) dPos[i * 3 + 1] *= -0.9;
        if (Math.abs(dPos[i * 3 + 2]) > 200) dPos[i * 3 + 2] *= -0.9;
      }
      dust.geometry.attributes.position.needsUpdate = true;

      const nPos = networkNodes.geometry.attributes.position.array as Float32Array;
      const linePositions = [];
      for (let i = 0; i < counts.nodes; i++) {
        nPos[i * 3] += nodeVelocities[i].x;
        nPos[i * 3 + 1] += nodeVelocities[i].y;
        nPos[i * 3 + 2] += nodeVelocities[i].z;
        if (Math.abs(nPos[i * 3]) > 150) nodeVelocities[i].x *= -1;
        if (Math.abs(nPos[i * 3 + 1]) > 150) nodeVelocities[i].y *= -1;
        if (Math.abs(nPos[i * 3 + 2]) > 100) nodeVelocities[i].z *= -1;

        for (let j = i + 1; j < counts.nodes; j++) {
          const dx = nPos[i * 3] - nPos[j * 3];
          const dy = nPos[i * 3 + 1] - nPos[j * 3 + 1];
          const dz = nPos[i * 3 + 2] - nPos[j * 3 + 2];
          if (dx * dx + dy * dy + dz * dz < 900) {
            linePositions.push(
              nPos[i * 3],
              nPos[i * 3 + 1],
              nPos[i * 3 + 2],
              nPos[j * 3],
              nPos[j * 3 + 1],
              nPos[j * 3 + 2]
            );
          }
        }
      }
      networkNodes.geometry.attributes.position.needsUpdate = true;
      lineGeo.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(linePositions.length > 0 ? linePositions : [], 3)
      );
    };

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const safeDelta = Math.min(clock.getDelta(), 0.1);
      time += safeDelta;

      if (starfield && starMaterial.uniforms) {
        starMaterial.uniforms.time.value = time;
      }

      if (nebula) {
        nebula.rotation.z += 0.0001;
        nebula.rotation.y += 0.00005;
      }

      if (globeGroup) {
        globeGroup.rotation.y += 0.0005;
        globeGroup.rotation.x += 0.0002;
        if (!isCinematicActive) {
          const scale = 1.0 + Math.sin(time * 0.5) * 0.01;
          globeGroup.scale.set(scale, scale, scale);
          globeGroup.position.y = -20 + Math.sin(time * 0.3) * 3;
        }
      }

      cameraDrift.z -= 0.05;
      if (cameraDrift.z < 0) cameraDrift.z += 200;

      const targetX = mouseX * 20;
      const targetY = mouseY * 20;

      camera.position.x += (targetX - camera.position.x) * 0.02;
      camera.position.y += (-targetY - camera.position.y) * 0.02;
      camera.position.z = cameraDrift.z + mouseY * 10;
      camera.lookAt(scene.position);
      camera.rotation.z = camera.position.x * -0.002;

      updateDustAndNetwork();
      renderer.render(scene, camera);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    clock.start();
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      ctx.revert();
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      [starGeometry, nebulaGeo, dustGeo, nodeGeo, lineGeo, sphereGeo, globeNodeGeo, globeLineGeo].forEach(geo => geo.dispose());
      [starMaterial, nebulaMat, dustMat, nodeMat, lineMat, coreMat, wireframeMat, globeNodeMat, globeLineMat].forEach(mat => mat.dispose());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none",
        willChange: "transform",
        transform: "translateZ(0)",
      }}
    />
  );
}
