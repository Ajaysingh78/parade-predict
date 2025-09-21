import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars, Float, Text, Sphere, Torus, Ring, Trail, Sparkles, Cloud, Environment } from "@react-three/drei";
import * as THREE from "three";

// Advanced NASA Satellite with realistic details
const AdvancedNASASatellite = () => {
  const satelliteRef = useRef(null);
  const solarPanelRef1 = useRef(null);
  const solarPanelRef2 = useRef(null);
  const dishRef = useRef(null);
  const [signalPulse, setSignalPulse] = useState(0);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (satelliteRef.current) {
      // Complex orbital movement
      satelliteRef.current.rotation.y += 0.008;
      satelliteRef.current.position.y = Math.sin(time * 0.7) * 0.5 + 1;
      satelliteRef.current.position.x = Math.cos(time * 0.4) * 3.5;
      satelliteRef.current.position.z = Math.sin(time * 0.3) * 1.5;
    }
    
        // Solar panel tracking simulation
        if (solarPanelRef1.current && solarPanelRef2.current) {
          const sunAngle = Math.atan2(2, Math.cos(time * 0.4) * 3.5);
          solarPanelRef1.current.rotation.y = sunAngle * 0.5;
          solarPanelRef2.current.rotation.y = sunAngle * 0.5;
          solarPanelRef1.current.rotation.z = Math.sin(time * 0.8) * 0.15;
          solarPanelRef2.current.rotation.z = -Math.sin(time * 0.8) * 0.15;
        }

        // Communication dish tracking
        if (dishRef.current) {
          dishRef.current.rotation.x = Math.sin(time * 0.5) * 0.3 + Math.PI / 6;
          dishRef.current.rotation.y = Math.cos(time * 0.3) * 0.2;
        }

    setSignalPulse(Math.sin(time * 4) * 0.5 + 0.5);
  });

  return (
    <group ref={satelliteRef} position={[4, 2, -3]}>
      {/* Main satellite body with detailed geometry */}
      <group>
        <mesh>
          <boxGeometry args={[1.2, 0.8, 1.6]} />
          <meshStandardMaterial 
            color="#1565C0" 
            metalness={0.95} 
            roughness={0.1}
            emissive="#0D47A1"
            emissiveIntensity={0.15}
          />
        </mesh>
        
        {/* Detailed panels on satellite body */}
        <mesh position={[0.6, 0, 0]}>
          <planeGeometry args={[0.4, 0.6]} />
          <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[-0.6, 0, 0]}>
          <planeGeometry args={[0.4, 0.6]} />
          <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Sensor equipment */}
        <mesh position={[0, -0.5, 0.8]}>
          <cylinderGeometry args={[0.15, 0.15, 0.3, 8]} />
          <meshStandardMaterial color="#E65100" metalness={0.7} roughness={0.3} />
        </mesh>
      </group>
      
      {/* Advanced communication dish */}
      <group ref={dishRef} position={[0, 0.6, 0]}>
        <mesh rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.08, 32]} />
          <meshStandardMaterial 
            color="#E0E0E0" 
            metalness={0.9} 
            roughness={0.1}
            emissive="#424242"
            emissiveIntensity={signalPulse * 0.2}
          />
        </mesh>
        
        {/* Dish feed */}
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.2, 8]} />
          <meshStandardMaterial color="#FF5722" />
        </mesh>
      </group>
      
      {/* High-tech solar panels */}
      <group ref={solarPanelRef1} position={[2, 0, 0]}>
        <mesh>
          <planeGeometry args={[1.2, 2.5]} />
          <meshStandardMaterial 
            color="#1A237E" 
            transparent 
            opacity={0.95}
            emissive="#3F51B5"
            emissiveIntensity={0.3}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
        
        {/* Solar cell grid pattern */}
        {Array.from({ length: 6 }, (_, i) => (
          <mesh key={i} position={[-0.5 + i * 0.2, 0, 0.01]}>
            <planeGeometry args={[0.15, 2.3]} />
            <meshBasicMaterial 
              color="#303F9F" 
              transparent 
              opacity={0.6}
            />
          </mesh>
        ))}
      </group>
      
      <group ref={solarPanelRef2} position={[-2, 0, 0]}>
        <mesh>
          <planeGeometry args={[1.2, 2.5]} />
          <meshStandardMaterial 
            color="#1A237E" 
            transparent 
            opacity={0.95}
            emissive="#3F51B5"
            emissiveIntensity={0.3}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
        
        {/* Solar cell grid pattern */}
        {Array.from({ length: 6 }, (_, i) => (
          <mesh key={i} position={[-0.5 + i * 0.2, 0, 0.01]}>
            <planeGeometry args={[0.15, 2.3]} />
            <meshBasicMaterial 
              color="#303F9F" 
              transparent 
              opacity={0.6}
            />
          </mesh>
        ))}
      </group>
      
      {/* Multiple antennas */}
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.8, 8]} />
        <meshStandardMaterial 
          color="#FF5722" 
          emissive="#FF5722" 
          emissiveIntensity={signalPulse * 0.4}
        />
      </mesh>
      
      <mesh position={[0.3, 1.0, 0.3]} rotation={[0.2, 0, 0.1]}>
        <cylinderGeometry args={[0.02, 0.02, 0.5, 8]} />
        <meshStandardMaterial color="#4CAF50" emissive="#4CAF50" emissiveIntensity={0.3} />
      </mesh>
      
      {/* Signal visualization */}
      <Trail width={4} length={10} color="#00BCD4" attenuation={(t) => t * t}>
        <mesh position={[0, 1.2, 0]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshBasicMaterial 
            color="#00BCD4" 
            transparent 
            opacity={signalPulse}
          />
        </mesh>
      </Trail>
    </group>
  );
};

// Dynamic Weather Data Visualization with Particle Systems
const EnhancedWeatherDataStream = () => {
  const particlesRef = useRef(null);
  const trailParticlesRef = useRef(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(5000 * 3);
    const velocities = new Float32Array(5000 * 3);
    const colors = new Float32Array(5000 * 3);
    const sizes = new Float32Array(5000);
    
    for (let i = 0; i < 5000; i++) {
      // Create spiral data streams
      const radius = (Math.random() * 15) + 5;
      const angle = (i / 5000) * Math.PI * 8;
      const height = (Math.random() - 0.5) * 20;
      
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = height;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
      
      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = Math.random() * 0.01;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
      
      // Weather data colors
      const temp = Math.random();
      if (temp < 0.3) {
        colors[i * 3] = 0.2; colors[i * 3 + 1] = 0.8; colors[i * 3 + 2] = 1.0; // Cold blue
      } else if (temp < 0.6) {
        colors[i * 3] = 0.0; colors[i * 3 + 1] = 1.0; colors[i * 3 + 2] = 0.5; // Green
      } else {
        colors[i * 3] = 1.0; colors[i * 3 + 1] = 0.6; colors[i * 3 + 2] = 0.0; // Warm orange
      }
      
      sizes[i] = Math.random() * 0.08 + 0.02;
    }
    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    return geometry;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      const time = state.clock.elapsedTime;
      particlesRef.current.rotation.y += 0.003;
      
      // Animate particle positions
      const positions = particlesRef.current.geometry.attributes.position.array;
      const velocities = particlesRef.current.geometry.attributes.velocity.array;
      
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += Math.sin(time * 0.5 + i * 0.01) * 0.01;
        positions[i + 1] += velocities[i + 1];
        positions[i + 2] += Math.cos(time * 0.3 + i * 0.01) * 0.01;
        
        // Reset particles that go too far
        if (Math.abs(positions[i + 1]) > 15) {
          positions[i + 1] = (Math.random() - 0.5) * 20;
        }
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <>
      <points ref={particlesRef} geometry={particles}>
        <pointsMaterial 
          size={0.05} 
          vertexColors 
          transparent 
          opacity={0.9}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
      
      {/* Add sparkles for extra magic */}
      <Sparkles 
        count={200} 
        scale={25} 
        size={3} 
        speed={0.8} 
        opacity={0.6}
        color="#4FC3F7"
      />
    </>
  );
};

// Enhanced Weather Station Network with realistic orbital mechanics
const SmartWeatherStationNetwork = () => {
  const stationRefs = useRef([]);
  const orbitRefs = useRef([]);
  
  const stations = useMemo(() => [
    { name: "GOES-East", color: "#4FC3F7", radius: 6, speed: 0.4, size: 0.2, inclination: 0 },
    { name: "GOES-West", color: "#FF9800", radius: 7, speed: 0.35, size: 0.18, inclination: Math.PI / 8 },
    { name: "MeteoSat", color: "#4CAF50", radius: 8, speed: 0.3, size: 0.22, inclination: Math.PI / 6 },
    { name: "Himawari", color: "#E91E63", radius: 9, speed: 0.28, size: 0.19, inclination: -Math.PI / 8 },
    { name: "FengYun", color: "#9C27B0", radius: 10, speed: 0.25, size: 0.21, inclination: Math.PI / 4 },
  ], []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    stationRefs.current.forEach((station, index) => {
      if (station) {
        const stationData = stations[index];
        const angle = time * stationData.speed + index * Math.PI * 0.4;
        
        // 3D orbital mechanics
        station.position.x = Math.cos(angle) * stationData.radius;
        station.position.z = Math.sin(angle) * stationData.radius * Math.cos(stationData.inclination);
        station.position.y = Math.sin(angle) * stationData.radius * Math.sin(stationData.inclination);
        
        station.rotation.y += 0.03;
        station.rotation.x = Math.sin(time * 0.5 + index) * 0.2;
      }
    });

    // Animate orbital paths
    orbitRefs.current.forEach((orbit, index) => {
      if (orbit) {
        orbit.rotation.y += stations[index].speed * 0.1;
      }
    });
  });

  return (
    <group>
      {/* Orbital paths */}
      {stations.map((station, index) => (
        <group key={`orbit-${index}`} ref={(el) => orbitRefs.current[index] = el}>
          <mesh rotation={[station.inclination, 0, 0]}>
            <torusGeometry args={[station.radius, 0.02, 4, 64]} />
            <meshBasicMaterial 
              color={station.color} 
              transparent 
              opacity={0.3}
            />
          </mesh>
        </group>
      ))}
      
      {/* Weather stations */}
      {stations.map((station, index) => (
        <Float key={station.name} speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
          <group 
            ref={(el) => stationRefs.current[index] = el}
            position={[0, 0, 0]}
          >
            {/* Main satellite body */}
            <mesh>
              <sphereGeometry args={[station.size, 16, 16]} />
              <meshStandardMaterial 
                color={station.color} 
                emissive={station.color} 
                emissiveIntensity={0.4}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
            
            {/* Solar panels */}
            <mesh position={[station.size * 1.5, 0, 0]}>
              <planeGeometry args={[station.size * 0.8, station.size * 1.5]} />
              <meshStandardMaterial 
                color="#1A237E" 
                transparent 
                opacity={0.8}
                emissive="#3F51B5"
                emissiveIntensity={0.2}
              />
            </mesh>
            <mesh position={[-station.size * 1.5, 0, 0]}>
              <planeGeometry args={[station.size * 0.8, station.size * 1.5]} />
              <meshStandardMaterial 
                color="#1A237E" 
                transparent 
                opacity={0.8}
                emissive="#3F51B5"
                emissiveIntensity={0.2}
              />
            </mesh>
            
            {/* Communication rings with animation */}
            <Ring 
              args={[station.size * 2, station.size * 2.8, 32]} 
              position={[0, 0, 0]}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <meshBasicMaterial 
                color={station.color} 
                transparent 
                opacity={0.4}
                side={THREE.DoubleSide}
              />
            </Ring>
            
            <Ring 
              args={[station.size * 3.5, station.size * 4, 32]} 
              position={[0, 0, 0]}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <meshBasicMaterial 
                color={station.color} 
                transparent 
                opacity={0.2}
                side={THREE.DoubleSide}
              />
            </Ring>
            
            {/* Station label */}
            <Text
              position={[0, station.size + 0.5, 0]}
              fontSize={0.15}
              color={station.color}
              anchorX="center"
              anchorY="middle"
            >
              {station.name}
            </Text>
          </group>
        </Float>
      ))}
    </group>
  );
};

// Realistic Earth with detailed weather visualization
const UltraRealisticWeatherEarth = () => {
  const earthRef = useRef(null);
  const cloudsRef = useRef(null);
  const atmosphereRef = useRef(null);
  const [earthTexture, setEarthTexture] = useState(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.004;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.006;
      cloudsRef.current.rotation.x = Math.sin(time * 0.1) * 0.05;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group position={[0, 0, -15]}>
      {/* Earth core */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[3, 128, 128]} />
        <meshStandardMaterial 
          color="#1565C0" 
          roughness={0.8}
          metalness={0.1}
          emissive="#0D47A1"
          emissiveIntensity={0.1}
        />
      </mesh>
      
      {/* Detailed cloud layer */}
      <mesh ref={cloudsRef} scale={1.02}>
        <sphereGeometry args={[3, 64, 64]} />
        <meshBasicMaterial 
          color="#ffffff" 
          transparent 
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Weather patterns layer */}
      <mesh scale={1.01}>
        <sphereGeometry args={[3, 64, 64]} />
        <meshBasicMaterial 
          color="#42A5F5" 
          transparent 
          opacity={0.2}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Atmospheric layers */}
      <mesh ref={atmosphereRef} scale={1.08}>
        <sphereGeometry args={[3, 64, 64]} />
        <meshBasicMaterial 
          color="#87CEEB" 
          transparent 
          opacity={0.15}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Outer atmosphere glow */}
      <mesh scale={1.12}>
        <sphereGeometry args={[3, 32, 32]} />
        <meshBasicMaterial 
          color="#B3E5FC" 
          transparent 
          opacity={0.08}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};

// Advanced UI Overlay with weather data
const WeatherUIOverlay = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Top status bar */}
      <div className="fixed top-4 left-4 bg-black/20 backdrop-blur-md rounded-lg p-3 text-white">
        <div className="text-xs opacity-75">WEATHER SATELLITE NETWORK</div>
        <div className="text-sm font-mono">{currentTime.toLocaleTimeString()}</div>
      </div>
      
      {/* Bottom info panel */}
      <div className="fixed bottom-4 right-4 bg-black/20 backdrop-blur-md rounded-lg p-3 text-white text-xs">
        <div className="mb-1">• 5 Active Satellites</div>
        <div className="mb-1">• Real-time Data Stream</div>
        <div className="opacity-75">• Global Weather Monitoring</div>
      </div>
      
      {/* Connection indicators */}
      <div className="fixed top-4 right-4 flex space-x-2">
        {['GOES-E', 'GOES-W', 'MeteoSat', 'Himawari', 'FengYun'].map((sat, i) => (
          <div key={sat} className="bg-green-500/80 w-2 h-2 rounded-full animate-pulse" 
               style={{ animationDelay: `${i * 0.2}s` }}></div>
        ))}
      </div>
    </div>
  );
};

// Main Enhanced Background3D Component
const Background3D = () => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10">
      {loading && (
        <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50">
          <div className="text-white text-xl animate-pulse">Loading Satellite Network...</div>
        </div>
      )}
      
      <Canvas
        camera={{ position: [0, 3, 12], fov: 65 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.3
        }}
        onCreated={({ scene }) => {
          scene.fog = new THREE.Fog(0x000322, 20, 80);
        }}
      >
        {/* Professional HDR Environment */}
        <Environment preset="night" />
        
        {/* Advanced Lighting System */}
        <ambientLight intensity={0.2} color="#4A90E2" />
        <pointLight position={[15, 15, 15]} intensity={1.5} color="#FFD700" castShadow />
        <pointLight position={[-15, -15, -15]} intensity={1.0} color="#FF6B35" />
        <directionalLight 
          position={[8, 8, 8]} 
          intensity={1.2} 
          color="#87CEEB"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <spotLight 
          position={[0, 20, 10]} 
          intensity={0.8} 
          color="#9C27B0"
          angle={0.3}
          penumbra={0.2}
          castShadow
        />

        {/* Enhanced Deep Space Starfield */}
        <Stars 
          radius={500} 
          depth={150} 
          count={50000} 
          factor={12} 
          saturation={1}
          fade 
          speed={1.2}
        />

        {/* Ultra-Realistic Earth */}
        <UltraRealisticWeatherEarth />

        {/* Advanced NASA Weather Satellite */}
        <AdvancedNASASatellite />

        {/* Smart Weather Stations Network */}
        <SmartWeatherStationNetwork />

        {/* Enhanced Weather Data Streams */}
        <EnhancedWeatherDataStream />

        {/* Dynamic Geometric Elements */}
        <Float speed={1.8} rotationIntensity={1.2} floatIntensity={1.5}>
          <mesh position={[4, -4, -2]} rotation={[Math.PI / 4, 0, Math.PI / 6]}>
            <torusKnotGeometry args={[1.5, 0.5, 256, 64, 4, 3]} />
            <meshStandardMaterial 
              color="#4FC3F7" 
              metalness={0.95}
              roughness={0.05}
              emissive="#1565C0"
              emissiveIntensity={0.4}
            />
          </mesh>
        </Float>

        <Float speed={1.4} rotationIntensity={0.8} floatIntensity={1.0}>
          <mesh position={[-5, 2, -1]} rotation={[0, Math.PI / 3, Math.PI / 4]}>
            <torusKnotGeometry args={[1.0, 0.4, 200, 48, 3, 7]} />
            <meshStandardMaterial 
              color="#FF9800" 
              metalness={0.9}
              roughness={0.1}
              emissive="#E65100"
              emissiveIntensity={0.3}
            />
          </mesh>
        </Float>

        {/* Professional Camera Controls */}
        <OrbitControls 
          enableZoom={true}
          minDistance={8}
          maxDistance={25}
          autoRotate 
          autoRotateSpeed={0.6}
          enablePan={true}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 6}
          enableDamping={true}
          dampingFactor={0.03}
          rotateSpeed={0.5}
          panSpeed={0.8}
          zoomSpeed={0.6}
        />
      </Canvas>
      
      {/* Weather UI Overlay */}
      <WeatherUIOverlay />
    </div>
  );
};

export default Background3D;