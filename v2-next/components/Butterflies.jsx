"use client";
import { Suspense, useMemo, useRef, useEffect } from "react";
import { Canvas, useThree, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const rnd = (a, b) => a + Math.random() * (b - a);
const MODEL = "/models/butterfly.glb";

// Prépare un gabarit : modèle centré, mis à l'échelle, et orienté "à plat face caméra".
function useGabarit() {
  const gltf = useLoader(GLTFLoader, MODEL);
  return useMemo(() => {
    const src = gltf.scene.clone(true);
    // orientation : on met la face la plus large vers +Z (vers la caméra)
    const box0 = new THREE.Box3().setFromObject(src);
    const size = new THREE.Vector3(); box0.getSize(size);
    const minAxis = size.x <= size.y && size.x <= size.z ? "x" : (size.y <= size.z ? "y" : "z");
    if (minAxis === "x") src.rotation.y = Math.PI / 2;
    else if (minAxis === "y") src.rotation.x = -Math.PI / 2;
    // recentre + échelle pour une envergure ~2.6
    const box = new THREE.Box3().setFromObject(src);
    const s = new THREE.Vector3(); box.getSize(s);
    const c = new THREE.Vector3(); box.getCenter(c);
    src.position.sub(c);
    const wrap = new THREE.Group(); wrap.add(src);
    const span = Math.max(s.x, s.y, s.z) || 1;
    wrap.scale.setScalar(2.6 / span);
    // matériaux : un peu plus lumineux, doublés pour voir le dessous des ailes
    wrap.traverse((o) => { if (o.isMesh && o.material) { o.material = o.material.clone(); o.material.side = THREE.DoubleSide; } });
    return wrap;
  }, [gltf]);
}

function Papillons({ count }) {
  const { camera } = useThree();
  const gabarit = useGabarit();
  const repel = useRef(null);
  const groupRef = useRef(null);

  const data = useMemo(() => {
    const AIRE = { x: 13, y: 8, z: 6 };
    const flowers = [[-8, -6, -1], [7, -6.5, -2], [0, -7, -3]].map((p) => new THREE.Vector3(p[0], p[1], p[2]));
    const arr = [];
    for (let i = 0; i < count; i++) {
      const g = new THREE.Group();
      const m = gabarit.clone(true);
      g.add(m);
      g.scale.setScalar(rnd(0.7, 1.15));
      const pos = new THREE.Vector3(rnd(-AIRE.x, AIRE.x), rnd(-AIRE.y, AIRE.y), rnd(-AIRE.z, AIRE.z));
      g.position.copy(pos);
      arr.push({ g, inner: m, pos, vel: new THREE.Vector3(rnd(-1, 1), rnd(-1, 1), rnd(-1, 1)).normalize().multiplyScalar(rnd(1.2, 2.2)), phase: rnd(0, 6.28), flap: rnd(6, 9), wander: rnd(0, 6.28), pose: 0, pp: rnd(5, 15), cible: null });
    }
    return { arr, AIRE, flowers };
  }, [count, gabarit]);

  useEffect(() => {
    const grp = groupRef.current; if (!grp) return;
    data.arr.forEach((b) => grp.add(b.g));
    return () => { data.arr.forEach((b) => grp.remove(b.g)); };
  }, [data]);

  useEffect(() => {
    const set = (cx, cy) => {
      const el = document.querySelector("canvas");
      const r = el ? el.getBoundingClientRect() : { left: 0, top: 0, width: innerWidth, height: innerHeight };
      repel.current = { x: ((cx - r.left) / r.width) * 2 - 1, y: -((cy - r.top) / r.height) * 2 + 1, t: performance.now() };
    };
    const mm = (e) => set(e.clientX, e.clientY);
    const tm = (e) => { if (e.touches[0]) set(e.touches[0].clientX, e.touches[0].clientY); };
    addEventListener("mousemove", mm, { passive: true });
    addEventListener("touchmove", tm, { passive: true });
    return () => { removeEventListener("mousemove", mm); removeEventListener("touchmove", tm); };
  }, []);

  const tmp = useMemo(() => new THREE.Vector3(), []);
  useFrame((_, delta) => {
    const dt = Math.min(0.05, delta), t = performance.now() / 1000;
    const { arr, AIRE, flowers } = data;
    let rep = repel.current; if (rep && performance.now() - rep.t > 250) rep = null;
    for (const b of arr) {
      if (b.pose <= 0) {
        b.pp -= dt;
        if (b.pp <= 0 && flowers.length) { b.cible = flowers[(Math.random() * flowers.length) | 0].clone(); b.cible.z += 0.4; b.pp = 1e9; }
      } else {
        b.pose -= dt;
        if (b.pose <= 0) { b.pp = rnd(7, 16); b.cible = null; b.vel.set(rnd(-1, 1), rnd(1, 1.4), rnd(-1, 1)).normalize().multiplyScalar(rnd(1.2, 2)); }
      }
      if (b.cible && b.pose <= 0) {
        tmp.copy(b.cible).sub(b.pos); const d = tmp.length();
        if (d < 0.7) { b.pose = rnd(2.5, 5); b.vel.multiplyScalar(0.05); }
        else { tmp.normalize().multiplyScalar(2.4); b.vel.lerp(tmp, 0.05); }
      } else if (b.pose > 0) {
        b.vel.multiplyScalar(0.85); b.pos.y += Math.sin(t * 2 + b.phase) * 0.002;
      } else {
        b.wander += dt * rnd(0.6, 1.1);
        b.vel.x += Math.sin(b.wander * 0.7 + b.phase) * 0.9 * dt;
        b.vel.y += Math.cos(b.wander * 0.5) * 0.7 * dt;
        b.vel.z += Math.sin(b.wander * 0.9 + 1.3) * 0.6 * dt;
        if (Math.abs(b.pos.x) > AIRE.x) b.vel.x -= Math.sign(b.pos.x) * dt * 2.2;
        if (Math.abs(b.pos.y) > AIRE.y) b.vel.y -= Math.sign(b.pos.y) * dt * 2.2;
        if (Math.abs(b.pos.z) > AIRE.z) b.vel.z -= Math.sign(b.pos.z) * dt * 2.2;
        const sp = b.vel.length(); if (sp > 2.6) b.vel.multiplyScalar(2.6 / sp);
      }
      if (rep) {
        tmp.copy(b.pos).project(camera);
        const dx = tmp.x - rep.x, dy = tmp.y - rep.y, dd = Math.hypot(dx, dy);
        if (dd < 0.3) { const f = (0.3 - dd) * 10; b.vel.x += (dx / (dd || 1)) * f * dt * 9; b.vel.y += (dy / (dd || 1)) * f * dt * 9; if (b.pose > 0) { b.pose = 0; b.pp = rnd(5, 10); b.cible = null; } }
      }
      b.pos.addScaledVector(b.vel, dt);
      b.g.position.copy(b.pos);
      // face à la caméra (jamais de profil) + léger roulis vivant
      b.g.quaternion.copy(camera.quaternion);
      b.g.rotateZ(Math.sin(t * 1.1 + b.phase) * 0.14 - b.vel.x * 0.05);
      // "respir" des ailes : léger battement par mise à l'échelle horizontale
      const posed = b.pose > 0, amp = posed ? 0.05 : 0.16, spd = posed ? 3 : b.flap;
      b.inner.scale.x = 1 - (Math.sin(t * spd + b.phase) * 0.5 + 0.5) * amp;
    }
  });

  return <group ref={groupRef} />;
}

export default function Butterflies({ count }) {
  const n = typeof count === "number" ? count : (typeof window !== "undefined" && (matchMedia("(pointer:coarse)").matches || innerWidth < 640) ? 4 : 8);
  return (
    <Canvas
      style={{ position: "fixed", inset: 0, zIndex: 1 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 16], fov: 50 }}
    >
      <ambientLight intensity={1.15} color={0xffffff} />
      <directionalLight position={[4, 8, 10]} intensity={1.1} />
      <directionalLight position={[-6, -2, 4]} intensity={0.4} color={0xbfa8f0} />
      <Suspense fallback={null}>
        <Papillons count={n} />
      </Suspense>
    </Canvas>
  );
}
