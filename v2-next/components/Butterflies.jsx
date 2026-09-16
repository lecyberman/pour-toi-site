"use client";
import { useMemo, useRef, useEffect } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function wingTexture() {
  const c = document.createElement("canvas"); c.width = c.height = 160; const x = c.getContext("2d");
  const g = x.createLinearGradient(0, 20, 150, 150);
  g.addColorStop(0, "#E9DEF7"); g.addColorStop(.45, "#B49BDA"); g.addColorStop(1, "#7C5FB0"); x.fillStyle = g;
  x.beginPath(); x.moveTo(6, 84); x.bezierCurveTo(2, 18, 150, 2, 150, 46); x.bezierCurveTo(150, 70, 96, 82, 6, 84); x.closePath(); x.fill();
  x.beginPath(); x.moveTo(8, 86); x.bezierCurveTo(18, 158, 120, 156, 110, 112); x.bezierCurveTo(102, 92, 70, 88, 8, 86); x.closePath(); x.fill();
  x.fillStyle = "rgba(255,255,255,.55)"; x.beginPath(); x.arc(112, 40, 9, 0, 6.28); x.fill();
  x.fillStyle = "rgba(45,25,70,.45)"; x.beginPath(); x.arc(96, 118, 8, 0, 6.28); x.fill();
  return new THREE.CanvasTexture(c);
}
const rnd = (a, b) => a + Math.random() * (b - a);

function Papillons({ count }) {
  const { scene, camera } = useThree();
  const repel = useRef(null);

  const data = useMemo(() => {
    const AIRE = { x: 13, y: 8, z: 6 };
    const tex = wingTexture();
    const wingMat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, side: THREE.DoubleSide, depthWrite: false });
    const wingGeo = new THREE.PlaneGeometry(2, 2.4); wingGeo.translate(1, 0, 0);
    const arr = [];
    const flowers = [[-8, -6, -1], [7, -6.5, -2], [0, -7, -3]].map((p) => new THREE.Vector3(p[0], p[1], p[2]));
    for (let i = 0; i < count; i++) {
      const g = new THREE.Group();
      const ad = new THREE.Mesh(wingGeo, wingMat);
      const ag = new THREE.Mesh(wingGeo, wingMat); ag.scale.x = -1;
      const pd = new THREE.Group(); pd.add(ad); g.add(pd);
      const pg = new THREE.Group(); pg.add(ag); g.add(pg);
      const corps = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.07, 2, 8), new THREE.MeshStandardMaterial({ color: 0x2a1f3a, roughness: .6 }));
      corps.rotation.x = Math.PI / 2; g.add(corps);
      const tete = new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 8), new THREE.MeshStandardMaterial({ color: 0x1a1230, roughness: .5 }));
      tete.position.z = 1.05; g.add(tete);
      g.scale.setScalar(rnd(0.6, 1.1));
      const pos = new THREE.Vector3(rnd(-AIRE.x, AIRE.x), rnd(-AIRE.y, AIRE.y), rnd(-AIRE.z, AIRE.z));
      g.position.copy(pos);
      scene.add(g);
      arr.push({ g, pd, pg, pos, vel: new THREE.Vector3(rnd(-1, 1), rnd(-1, 1), rnd(-1, 1)).normalize().multiplyScalar(rnd(1.2, 2.2)), phase: rnd(0, 6.28), flap: rnd(9, 14), wander: rnd(0, 6.28), pose: 0, pp: rnd(5, 15), cible: null });
    }
    return { arr, AIRE, flowers };
  }, [count, scene]);

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
      if (b.vel.lengthSq() > 0.001) { tmp.copy(b.pos).add(b.vel); b.g.lookAt(tmp); }
      const posed = b.pose > 0, amp = posed ? 0.5 : 1.15, spd = posed ? 3 : b.flap;
      const a = 0.15 + (Math.sin(t * spd + b.phase) * 0.5 + 0.5) * amp;
      b.pd.rotation.y = -a; b.pg.rotation.y = a;
    }
  });

  return null;
}

export default function Butterflies({ count }) {
  const n = typeof count === "number" ? count : (typeof window !== "undefined" && (matchMedia("(pointer:coarse)").matches || innerWidth < 640) ? 5 : 10);
  return (
    <Canvas
      style={{ position: "fixed", inset: 0, zIndex: 1 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 16], fov: 50 }}
    >
      <ambientLight intensity={1.1} color={0xbfa8f0} />
      <directionalLight position={[4, 8, 10]} intensity={1} />
      <Papillons count={n} />
    </Canvas>
  );
}
