
import { Canvas } from "@react-three/fiber";
import { useTheme } from "@/contexts/ThemeContext";

function SimpleShape({ position, color }: { 
  position: [number, number, number], 
  color: string 
}) {
  const { resolvedTheme } = useTheme();
  const currentColor = resolvedTheme === 'dark' ? '#A78BFA' : color;

  return (
    <mesh position={position}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshBasicMaterial color={currentColor} transparent opacity={0.6} />
    </mesh>
  );
}

export function FloatingShapes() {
  const { resolvedTheme } = useTheme();
  
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <SimpleShape position={[-2, 1, -1]} color="#8B5CF6" />
        <SimpleShape position={[2, -1, -1]} color="#EC4899" />
        <SimpleShape position={[1, 2, -2]} color="#06B6D4" />
        <SimpleShape position={[-1, -1, -1]} color="#10B981" />
      </Canvas>
    </div>
  );
}
