"use client";

import Link from "next/link";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, OrbitControls, RoundedBox } from "@react-three/drei";
import { ArrowRight, Box, Move3D, Scan, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const roomShades = [
  { name: "Warm Stone", code: "FT 308", color: "#b9aa98" },
  { name: "Coastal Sage", code: "FT 356", color: "#6f7c70" },
  { name: "Clay House", code: "FT 323", color: "#9d5c50" },
  { name: "Deep Rouge", code: "FT 341", color: "#6e3035" },
];

function AnimatedWallMaterial({ color }: { color: string }) {
  const material = useRef<THREE.MeshStandardMaterial>(null);
  const target = useMemo(() => new THREE.Color(color), [color]);
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => { invalidate(); }, [target, invalidate]);

  useFrame(() => {
    if (!material.current) return;
    const current = material.current.color;
    const delta = Math.abs(current.r - target.r) + Math.abs(current.g - target.g) + Math.abs(current.b - target.b);
    if (delta > 0.006) {
      material.current.color.lerp(target, 0.16);
      invalidate();
    } else {
      material.current.color.copy(target);
    }
  });

  return <meshStandardMaterial ref={material} color="#b9aa98" roughness={0.92} metalness={0} />;
}

function RoomScene({ wallColor, controlsEnabled }: { wallColor: string; controlsEnabled: boolean }) {
  const seatXs = [-1.75, -0.38, 0.99];
  const floorBoards = [-4.5, -3, -1.5, 0, 1.5, 3, 4.5];

  return (
    <>
      <color attach="background" args={["#d9d6cf"]} />
      <fog attach="fog" args={["#d9d6cf", 13, 24]} />
      <ambientLight intensity={0.72} color="#fff6e8" />
      <hemisphereLight args={["#dce8ee", "#5f4431", 1.25]} />
      <directionalLight
        castShadow
        position={[5.5, 9, 7]}
        intensity={2.25}
        color="#fff4df"
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
        shadow-bias={-0.0005}
      />
      <pointLight position={[-3.8, 3.8, 1]} intensity={22} distance={8} color="#ffcc93" />

      {/* Architectural shell */}
      <mesh position={[0, 3.25, -3.5]} receiveShadow>
        <boxGeometry args={[10, 6.5, 0.18]} />
        <AnimatedWallMaterial color={wallColor} />
      </mesh>
      <mesh position={[-5, 3.25, 0]} receiveShadow>
        <boxGeometry args={[0.18, 6.5, 7.2]} />
        <meshStandardMaterial color="#dedad1" roughness={0.95} />
      </mesh>
      <mesh position={[0, -0.06, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 9]} />
        <meshStandardMaterial color="#87664a" roughness={0.7} metalness={0.02} />
      </mesh>
      {floorBoards.map((x) => (
        <mesh key={x} position={[x, -0.025, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.018, 9]} />
          <meshBasicMaterial color="#624631" transparent opacity={0.5} />
        </mesh>
      ))}
      <mesh position={[0, 0.14, -3.34]} receiveShadow>
        <boxGeometry args={[10, 0.26, 0.12]} />
        <meshStandardMaterial color="#f1eee8" roughness={0.75} />
      </mesh>
      <mesh position={[-4.84, 0.14, 0]} receiveShadow>
        <boxGeometry args={[0.12, 0.26, 7]} />
        <meshStandardMaterial color="#f1eee8" roughness={0.75} />
      </mesh>

      {/* Window and curtains */}
      <mesh position={[3.35, 3.45, -3.34]} receiveShadow>
        <boxGeometry args={[2.3, 3.2, 0.12]} />
        <meshStandardMaterial color="#202428" roughness={0.35} />
      </mesh>
      <mesh position={[3.35, 3.45, -3.25]}>
        <planeGeometry args={[2.03, 2.92]} />
        <meshPhysicalMaterial color="#b9dce9" roughness={0.08} metalness={0.05} transmission={0.15} transparent opacity={0.86} />
      </mesh>
      <mesh position={[3.35, 3.45, -3.15]}>
        <boxGeometry args={[0.08, 2.92, 0.08]} />
        <meshStandardMaterial color="#f1eee8" />
      </mesh>
      <mesh position={[3.35, 3.45, -3.15]}>
        <boxGeometry args={[2.03, 0.08, 0.08]} />
        <meshStandardMaterial color="#f1eee8" />
      </mesh>
      <RoundedBox args={[0.48, 3.85, 0.24]} radius={0.12} smoothness={4} position={[2.05, 3.25, -3.05]} castShadow>
        <meshStandardMaterial color="#cfc5b7" roughness={0.96} />
      </RoundedBox>
      <RoundedBox args={[0.48, 3.85, 0.24]} radius={0.12} smoothness={4} position={[4.65, 3.25, -3.05]} castShadow>
        <meshStandardMaterial color="#cfc5b7" roughness={0.96} />
      </RoundedBox>

      {/* Wall art, mounted independently from paint */}
      <mesh position={[-1.65, 3.75, -3.32]} castShadow>
        <boxGeometry args={[1.8, 1.45, 0.12]} />
        <meshStandardMaterial color="#161616" roughness={0.5} />
      </mesh>
      <mesh position={[-1.65, 3.75, -3.24]}>
        <planeGeometry args={[1.54, 1.19]} />
        <meshStandardMaterial color="#e8e0d3" roughness={0.9} />
      </mesh>
      <mesh position={[-1.85, 3.82, -3.18]} rotation={[0, 0, -0.35]}>
        <planeGeometry args={[0.42, 0.9]} />
        <meshStandardMaterial color="#b21b20" />
      </mesh>
      <mesh position={[-1.25, 3.62, -3.17]} rotation={[0, 0, 0.5]}>
        <circleGeometry args={[0.31, 32]} />
        <meshStandardMaterial color="#202020" />
      </mesh>

      {/* Rug */}
      <RoundedBox args={[5.9, 0.055, 3.7]} radius={0.12} smoothness={4} position={[0.1, 0.04, 1.08]} receiveShadow>
        <meshStandardMaterial color="#d5cec2" roughness={1} />
      </RoundedBox>
      {[0.42, 0.82, 1.22, 1.62].map((z) => (
        <mesh key={z} position={[0.1, 0.072, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[5.3, 0.025]} />
          <meshBasicMaterial color="#afa79b" transparent opacity={0.48} />
        </mesh>
      ))}

      {/* Sofa structure */}
      <RoundedBox args={[4.65, 0.65, 1.55]} radius={0.18} smoothness={6} position={[-0.38, 0.62, -0.35]} castShadow receiveShadow>
        <meshStandardMaterial color="#c9c3b8" roughness={0.95} />
      </RoundedBox>
      <RoundedBox args={[4.55, 1.45, 0.38]} radius={0.15} smoothness={6} position={[-0.38, 1.42, -1.02]} castShadow>
        <meshStandardMaterial color="#bcb6ab" roughness={0.96} />
      </RoundedBox>
      <RoundedBox args={[0.42, 1.14, 1.64]} radius={0.16} smoothness={6} position={[-2.5, 1.02, -0.34]} castShadow>
        <meshStandardMaterial color="#bcb6ab" roughness={0.96} />
      </RoundedBox>
      <RoundedBox args={[0.42, 1.14, 1.64]} radius={0.16} smoothness={6} position={[1.74, 1.02, -0.34]} castShadow>
        <meshStandardMaterial color="#bcb6ab" roughness={0.96} />
      </RoundedBox>
      {seatXs.map((x) => (
        <group key={x}>
          <RoundedBox args={[1.24, 0.24, 1.23]} radius={0.1} smoothness={5} position={[x, 1.02, -0.18]} castShadow>
            <meshStandardMaterial color="#ddd8ce" roughness={1} />
          </RoundedBox>
          <RoundedBox args={[1.22, 0.98, 0.28]} radius={0.13} smoothness={5} position={[x, 1.66, -0.82]} rotation={[-0.07, 0, 0]} castShadow>
            <meshStandardMaterial color="#d8d2c8" roughness={1} />
          </RoundedBox>
        </group>
      ))}
      <RoundedBox args={[0.82, 0.82, 0.2]} radius={0.12} smoothness={5} position={[-1.65, 1.62, -0.46]} rotation={[0.05, -0.12, -0.14]} castShadow>
        <meshStandardMaterial color="#8d3436" roughness={0.95} />
      </RoundedBox>
      <RoundedBox args={[0.72, 0.72, 0.2]} radius={0.12} smoothness={5} position={[1.05, 1.58, -0.48]} rotation={[0.08, 0.12, 0.1]} castShadow>
        <meshStandardMaterial color="#202020" roughness={0.92} />
      </RoundedBox>
      {[-2.15, 1.38].map((x) => [-0.82, 0.08].map((z) => (
        <mesh key={`${x}-${z}`} position={[x, 0.25, z]} castShadow>
          <cylinderGeometry args={[0.055, 0.07, 0.42, 16]} />
          <meshStandardMaterial color="#202020" metalness={0.65} roughness={0.35} />
        </mesh>
      )))}

      {/* Coffee table */}
      <RoundedBox args={[2.45, 0.16, 1.2]} radius={0.08} smoothness={5} position={[0.35, 0.75, 2.0]} castShadow receiveShadow>
        <meshStandardMaterial color="#5a4030" roughness={0.45} />
      </RoundedBox>
      {[-0.65, 1.35].map((x) => [1.6, 2.4].map((z) => (
        <mesh key={`${x}-${z}`} position={[x, 0.38, z]} castShadow>
          <cylinderGeometry args={[0.045, 0.055, 0.68, 16]} />
          <meshStandardMaterial color="#171717" metalness={0.7} roughness={0.25} />
        </mesh>
      )))}
      <mesh position={[0.62, 0.91, 1.93]} castShadow>
        <cylinderGeometry args={[0.28, 0.23, 0.09, 32]} />
        <meshStandardMaterial color="#e7e0d5" roughness={0.65} />
      </mesh>
      <mesh position={[-0.15, 0.88, 2.02]} rotation={[0, 0.18, 0]} castShadow>
        <boxGeometry args={[0.72, 0.07, 0.48]} />
        <meshStandardMaterial color="#a62429" roughness={0.8} />
      </mesh>

      {/* Side lamp */}
      <mesh position={[-3.62, 0.98, -0.55]} castShadow>
        <cylinderGeometry args={[0.32, 0.38, 0.1, 32]} />
        <meshStandardMaterial color="#2a2927" metalness={0.5} roughness={0.35} />
      </mesh>
      <mesh position={[-3.62, 2.25, -0.55]} castShadow>
        <cylinderGeometry args={[0.035, 0.045, 2.5, 16]} />
        <meshStandardMaterial color="#292725" metalness={0.72} roughness={0.25} />
      </mesh>
      <mesh position={[-3.62, 3.25, -0.55]} castShadow>
        <cylinderGeometry args={[0.48, 0.72, 0.86, 32, 1, true]} />
        <meshStandardMaterial color="#ead8bd" roughness={0.82} side={THREE.DoubleSide} />
      </mesh>

      {/* Plant with separate leaves */}
      <mesh position={[3.75, 0.52, 0.1]} castShadow>
        <cylinderGeometry args={[0.43, 0.34, 0.85, 32]} />
        <meshStandardMaterial color="#a45e42" roughness={0.88} />
      </mesh>
      {[
        [[3.75, 1.55, 0.1], [0.24, 1.25, 0.24], 0],
        [[3.35, 1.42, 0.08], [0.62, 0.2, 0.32], -0.3],
        [[4.15, 1.72, 0.02], [0.65, 0.22, 0.34], 0.4],
        [[3.52, 2.05, 0.12], [0.58, 0.2, 0.3], -0.55],
        [[4.02, 2.25, 0.05], [0.62, 0.21, 0.31], 0.52],
        [[3.76, 2.55, 0], [0.56, 0.2, 0.3], 0.05],
      ].map(([position, scale, rotation], index) => (
        <mesh key={index} position={position as [number, number, number]} scale={scale as [number, number, number]} rotation={[0, 0, rotation as number]} castShadow>
          <sphereGeometry args={[1, 24, 16]} />
          <meshStandardMaterial color={index % 2 ? "#48654c" : "#5d7855"} roughness={0.92} />
        </mesh>
      ))}

      <ContactShadows position={[0, 0.025, 0.5]} opacity={0.32} scale={11} blur={2.4} far={5.5} color="#1b120d" />
      <OrbitControls
        makeDefault
        enabled={controlsEnabled}
        target={[0, 1.65, -0.35]}
        enablePan={false}
        enableZoom={false}
        minAzimuthAngle={-0.2}
        maxAzimuthAngle={0.28}
        minPolarAngle={1.18}
        maxPolarAngle={1.43}
        dampingFactor={0.065}
        enableDamping
      />
    </>
  );
}

export function RoomColourPreview() {
  const [active, setActive] = useState(roomShades[0]);
  const [inspecting, setInspecting] = useState(false);

  useEffect(() => {
    if (!inspecting) return;
    const exit = (event: KeyboardEvent) => {
      if (event.key === "Escape") setInspecting(false);
    };
    window.addEventListener("keydown", exit);
    return () => window.removeEventListener("keydown", exit);
  }, [inspecting]);

  return (
    <section className="overflow-hidden bg-[#101010] text-white">
      <div className="site-container grid items-center gap-12 py-20 lg:grid-cols-[.7fr_1.3fr] lg:gap-16 lg:py-28">
        <div data-reveal="left" className="max-w-lg">
          <p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-[#ff4147]">Interactive 3D colour studio</p>
          <h2 className="mt-5 font-display text-[clamp(3rem,6vw,5.8rem)] leading-[.9] tracking-[-.05em]">
            Change the wall.<br /><em>Keep the room real.</em>
          </h2>
          <p className="mt-6 text-sm leading-7 text-white/60">
            Wall colour should change the architecture—not tint your sofa, flooring and décor. Explore a fully modelled room where each material responds independently to light.
          </p>
          <div className="mt-7 grid grid-cols-2 gap-3 text-[10px] leading-4 text-white/55">
            <div className="border-t border-white/15 pt-3"><strong className="block text-white">Real wall material</strong>Only the painted surface changes.</div>
            <div className="border-t border-white/15 pt-3"><strong className="block text-white">Live 3D lighting</strong>Furniture keeps natural shadows.</div>
          </div>
          <Link href="/shop?category=Interior+Paints" className="button-primary mt-8">
            Shop interior finishes <ArrowRight size={14} />
          </Link>
        </div>

        <div data-reveal="right" className="room-preview relative overflow-hidden rounded-[24px] border border-white/10 bg-[#d9d6cf] shadow-[0_30px_90px_rgba(0,0,0,.42)] sm:rounded-[30px]">
          <div className={`relative h-[450px] sm:h-[610px] ${inspecting ? "cursor-grab active:cursor-grabbing" : "cursor-default"}`}>
            <Canvas
              shadows
              frameloop="demand"
              dpr={[1, 1.35]}
              camera={{ position: [8.2, 5.1, 10.5], fov: 37, near: 0.1, far: 60 }}
              gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
              style={{ touchAction: inspecting ? "none" : "pan-y", pointerEvents: inspecting ? "auto" : "none" }}
              fallback={<div className="grid h-full place-items-center bg-[#d9d6cf] px-8 text-center text-sm text-[#101010]">3D preview requires WebGL. Your selected shade is {active.name}.</div>}
            >
              <RoomScene wallColor={active.color} controlsEnabled={inspecting} />
            </Canvas>
            <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 rounded-full border border-black/12 bg-white/88 px-3 py-2 text-[9px] font-bold uppercase tracking-[.13em] text-[#101010] shadow-lg backdrop-blur-md sm:left-6 sm:top-6">
              <Box size={13} className="text-[#d71920]" /> Live 3D material preview
            </div>
            {!inspecting ? (
              <div className="absolute inset-0 z-20 grid place-items-center bg-black/5">
                <button type="button" onClick={() => setInspecting(true)} className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-[#101010]/88 px-5 py-3 text-[10px] font-bold uppercase tracking-[.12em] text-white shadow-xl backdrop-blur-md transition hover:bg-[#d71920]">
                  <Scan size={15} /> Inspect room in 3D
                </button>
              </div>
            ) : (
              <button type="button" onClick={() => setInspecting(false)} className="absolute right-4 top-4 z-30 inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#101010]/88 px-4 py-2.5 text-[9px] font-bold uppercase tracking-[.12em] text-white shadow-xl backdrop-blur-md transition hover:bg-[#d71920] sm:right-6 sm:top-6">
                <Move3D size={13} /> Done viewing <span className="hidden text-white/45 sm:inline">Esc</span><X size={13} />
              </button>
            )}
          </div>

          <div className="border-t border-white/10 bg-[#0a0a0a] p-4 text-white sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div aria-live="polite">
                <p className="text-[9px] font-bold uppercase tracking-[.15em] text-white/48">Wall material</p>
                <p className="mt-1 font-display text-2xl"><span className="room-shade-name" key={active.code}>{active.name}</span> <span className="ml-1 font-sans text-[10px] font-bold uppercase tracking-wider text-[#ff555a]">{active.code}</span></p>
              </div>
              <div className="flex gap-3" aria-label="Preview wall colours">
                {roomShades.map((shade) => (
                  <button
                    key={shade.code}
                    type="button"
                    onClick={() => setActive(shade)}
                    aria-label={`Paint wall ${shade.name}`}
                    aria-pressed={active.code === shade.code}
                    className={`room-swatch relative size-10 rounded-full border border-white/25 sm:size-11 ${active.code === shade.code ? "is-active" : ""}`}
                    style={{ backgroundColor: shade.color }}
                  >
                    <span className="sr-only">{shade.name}</span>
                  </button>
                ))}
              </div>
            </div>
            <p className="mt-4 border-t border-white/12 pt-3 text-[9px] leading-4 text-white/40">Interactive preview is indicative. Confirm your final colour with a physical shade card under the room’s natural and artificial light.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
