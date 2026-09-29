"use client";
import { useMemo, useRef, useEffect } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Une moitié de papillon (côté droit) : aile supérieure + aile inférieure,
// racine des ailes au bord gauche (x=0), centrée verticalement.
function wingTexture() {
  const c = document.createElement("canvas"); c.width = c.height = 256; const x = c.getContext("2d");
  const g = x.createLinearGradient(0, 20, 240, 240);
  g.addColorStop(0, "#F1E7FC"); g.addColorStop(.5, "#C3A9EC"); g.addColorStop(1, "#8E6FBF");
  x.fillStyle = g;
  x.beginPath(); x.moveTo(8, 128);
  x.bezierCurveTo(24, 8, 250, 12, 236, 82);
  x.bezierCurveTo(226, 122, 150, 134, 8, 128);
  x.closePath(); x.fill();
  x.beginPath(); x.moveTo(10, 130);
  x.bezierCurveTo(0, 250, 196, 252, 176, 170);
  x.bezierCurveTo(160, 138, 96, 132, 10, 130);
  x.closePath(); x.fill();
  x.strokeStyle = "rgba(70,40,110,.30)"; x.lineWidth = 4;
  x.beginPath(); x.moveTo(8, 128); x.bezierCurveTo(24, 8, 250, 12, 236, 82); x.stroke();
  x.fillStyle = "rgba(255,255,255,.65)"; x.beginPath(); x.arc(184, 64, 15, 0, 6.28); x.fill();
  x.fillStyle = "rgba(255,255,255,.4)"; x.beginPath(); x.arc(120, 98, 9, 0, 6.28); x.fill();
  x.fillStyle = "rgba(60,30,90,.5)"; x.beginPath(); x.arc(122, 198, 13, 0, 6.28); x.fill();
  x.fillStyle = "rgba(255,220,150,.6)"; x.beginPath(); x.arc(122, 198, 5, 0, 6.28); x.fill();
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
    const wingGeo = new THREE.PlaneGeometry(2.2, 2.6); wingGeo.translate(1.1, 0, 0);
    const corpsMat = new THREE.MeshStandardMaterial({ color: 0x3a2a55, roughness: .6 });
    const arr = [];
    const flowers = [[-8, -6, -1], [7, -6.5, -2], [0, -7, -3]].map((p) => new THREE.Vector3(p[0], p[1], p[2]));
    for (let i = 0; i < count; i++) {
      const g = new THREE.Group();
      const ad = new THREE.Mesh(wingGeo, wingMat);
      const ag = new THREE.Mesh(wingGeo, wingMat); ag.scale.x = -1;
      const pd = new THREE.Group(); pd.add(ad); g.add(pd);
      const pg = new THREE.Group(); pg.add(ag); g.add(pg);
      const corps = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.04, 1.7, 8), corpsMat); g.add(corps);
      const tete = new THREE.Mesh(new THREE.SphereGeometry(0.13, 10, 8), corpsMat); tete.position.y = 0.92; g.add(tete);
      const antG = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.01, 0.5, 5), corpsMat); antG.position.set(-0.12, 1.15, 0); antG.rotation.z = 0.5; g.add(antG);
      const antD = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.01, 0.5, 5), corpsMat); antD.position.set(0.12, 1.15, 0); antD.rotation.z = -0.5; g.add(antD);
      g.scale.setScalar(rnd(0.65, 1.15));
      const pos = new THREE.Vector3(rnd(-AIRE.x, AIRE.x), rnd(-AIRE.y, AIRE.y), rnd(-AIRE.z, AIRE.z));
      g.position.copy(pos);
      scene.add(g);
      arr.push({ g, pd, pg, pos, vel: new THREE.Vector3(rnd(-1, 1), rnd(-1, 1), rnd(-1, 1)).normalize().multiplyScalar(rnd(1.2, 2.2)), phase: rnd(0, 6.28), flap: rnd(9, 14), wander: rnd(0, 6.28), pose: 0, pp: rnd(5, 15), cible: null });
    }
    return { arr, AIRE, flowers };
  }, [count, scene]);

  useEffect(() => () => { data.arr.forEach((b) => scene.remove(b.g)); }, [data, scene]);

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
      b.g.quaternion.copy(camera.quaternion);
      b.g.rotateZ(Math.sin(t * 1.1 + b.phase) * 0.14 - b.vel.x * 0.05);
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
