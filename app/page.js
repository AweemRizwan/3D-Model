// 'use client';
// import { Canvas, useFrame } from "@react-three/fiber";
// import { Leva } from "leva";
// import { useRef } from "react";
// // import { FirstPersonControls } from "@react-three/drei";
// import { OrbitControls, GizmoHelper,GizmoViewcube,GizmoViewport } from "@react-three/drei";
// import { useControls } from "leva";
// function AnimatedBox() {
//   function setGeometry (value) {
//     console.log(value);
//      setGeometry(value === "box" ? <boxGeometry args={[1, 1, 1]} /> : value === "sphere" ? <sphereGeometry args={[3, 3, 3]} /> : value === "torus" ? <torusGeometry args={[2, 2, 2]} /> : <torusKnotGeometry args={[1.7, 0.3, 256, 256]} />);
//   }

//   const { color,speed,shape } = useControls({
//     color: {
//       value: "#00bfff", 
//       label: "Box Color",
//       options: {
        
//         red: "#ff0000",
//         green: "#00ff00",
//         blue: "#0000ff",
//         yellow: "#ffff00",
//         cyan: "#00ffff",
//         magenta: "#ff00ff"
//       },
      
//     },
//     shape: {
//       options: {
//         box: "Box",
//         sphere: "Sphere",
//         torus: "Torus",
//         torusKnot: "Torus Knot"
//       },
//       value: "box",
//       label: "Shape",
//       onChange: (value) => {
//         console.log(value);
//         // Update the geometry of the mesh based on the selected shape
//         // This is just a placeholder for the actual implementation   
//         // You would need to use a state variable to manage the geometry
//         // and update it accordingly
//         // For example:
//         // setGeometry(value);
//         // setGeometry(value === "box" ? <boxGeometry args={[1, 1, 1]} /> : value === "sphere" ? <sphereGeometry args={[3, 3, 3]} /> : value === "torus" ? <torusGeometry args={[2, 2, 2]} /> : <torusKnotGeometry args={[1.7, 0.3, 256, 256]} />);
//       }
//     },
//     speed: {
//        value: 0.005, 
//        min: 0.0, 
//        max: 0.03,
//        step: 0.001
//        }
//     });
//   const boxRef = useRef();
  
//   useFrame(() => {
//     boxRef.current.rotation.x +=  speed;
//     boxRef.current.rotation.y +=  speed;
//     boxRef.current.rotation.z += speed;
//   });

//   return (
//     <>
//           <axesHelper args={[10]} />
//     <mesh ref={boxRef} position={[0,0,0]}>
      
//           <boxGeometry args={[1, 1, 1]} />
//           {/* <sphereGeometry attach="geometry" args={[3, 3, 3]} /> */}
//           {/* <torusGeometry args={[2,2,2]}/> // width height depth // */}
//           {/* <torusKnotGeometry args={[1.7, 0.3, 256, 256]}/> */}
//           <meshStandardMaterial color={color}/>
//         </mesh>
//         </>
//   )
// }
// export default function Home() {
//   return (
//     <div className="w-full h-screen">
//       <Leva collapsed={true} oneLineLabels={true} />
//       <Canvas>
//         <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
//           <GizmoViewport axisColors={["red", "green", "blue"]} labelColor="black" />
//           <GizmoViewcube/>
//         </GizmoHelper>
//         <gridHelper args={[20, 20, 0xff22a, 0x55ccff]}/>
//         <axesHelper args={[10]} />
//         {/* <FirstPersonControls movementSpeed={1}/> */}
//         <OrbitControls/>
//         <AnimatedBox/>
//           <directionalLight position={[2,5,1]}/>
//       </Canvas>
//     </div>
//   );
// }
'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useHelper } from '@react-three/drei';
import { useRef, useState, useEffect, use } from 'react';
import { useControls, Leva } from 'leva';
import { FirstPersonControls } from '@react-three/drei';
import { SpotLightHelper, DirectionalLightHelper } from 'three';

// function AnimatedMesh() {
//   const meshRef = useRef();

//   const [geometry, setGeometry] = useState(<boxGeometry args={[1, 1, 1]} />);

//   const { speed, color, shape } = useControls({
//     speed: { value: 0.005, min: 0, max: 0.03, step: 0.001 },
//     color: '#00bfff',
//     shape: {
//       options: {
//         box: 'Box',
//         sphere: 'Sphere',
//         torus: 'Torus',
//         torusKnot: 'Torus Knot',
//       },
//       value: 'box',
//       label: 'Shape',
//     },
//   });

//   // Update geometry when shape changes
//   useEffect(() => {
//     const newGeometry = {
//       box: <boxGeometry args={[1, 1, 1]} />,
//       sphere: <sphereGeometry args={[0.8, 32, 32]} />,
//       torus: <torusGeometry args={[0.7, 0.3, 16, 100]} />,
//       torusKnot: <torusKnotGeometry args={[0.7, 0.2, 128, 32]} />,
//     }[shape];

//     setGeometry(newGeometry);
//   }, [shape]);

//   useFrame(() => {
//     if (meshRef.current) {
//       meshRef.current.rotation.x += speed;
//       meshRef.current.rotation.y += speed;
//     }
//   });

//   return (
//     <>
//       <axesHelper args={[5]} />
//       <mesh ref={meshRef}>
//         {geometry}
//         <meshStandardMaterial color={color} />
//       </mesh>
//     </>
//   );
// }

// export default function Home() {
//   return (
//     <div className="w-full h-screen">
//       <Leva collapsed={false} />
//       <Canvas camera={{ position: [3, 3, 3] }}>
//         <ambientLight intensity={0.4} />
//         <directionalLight position={[2, 5, 2]} intensity={0.8} />
//         <OrbitControls />
//         <gridHelper args={[10, 10]} />
//         <AnimatedMesh />
//       </Canvas>
//     </div>
//   );
// }

function LightWithHelpers() {
  
  const light = useRef();
  useHelper(light, DirectionalLightHelper,2, 'crimson');

  const { angle, penumbra } = useControls({
    angle: { value: Math.PI / 15, min: 0, max: Math.PI / 2, step: 0.01 },
    penumbra: { value: 0.0, min: 0.0, max: 1.0, step: 0.1 },
  });
  return (
      <spotLight
        ref={light}
        position={[2, 5, 1]}
        intensity={80}
        color={0xffea00}
        penumbra={penumbra}
        angle={angle}
        castShadow
        />
  );
}
function DLightWithHelpers() {
  
  const light = useRef();
  useHelper(light, SpotLightHelper, 'orange');

  return (
      <directionalLight
        ref={light}
        position={[-5, 8, 1]}
        castShadow
        />
  );
}

function AnimatedBox() {
  const { geometryType, color, speed } = useControls({
    speed: { value: 0.005, min: 0.0, max: 0.03, step: 0.001 },
    color: "#00bfff",
    geometryType: {
      options: ["box", "sphere", "torus", "torusKnot"],
    },
  });

  const boxRef = useRef();

  useFrame(() => {
    if (boxRef.current) {
      boxRef.current.rotation.x += speed;
      boxRef.current.rotation.y += speed;
      boxRef.current.rotation.z += speed;
    }
  });

  let geometry;
  switch (geometryType) {
    case "sphere":
      geometry = <sphereGeometry args={[0.8, 32, 32]} />;
      break;
    case "torus":
      geometry = <torusGeometry args={[0.7, 0.3, 16, 100]} />;
      break;
    case "torusKnot":
      geometry = <torusKnotGeometry args={[0.7, 0.2, 128
, 32]} />;  
      break;
    default:
      geometry = <boxGeometry args={[1, 1, 1]} />;
  }

  return (
    <>
      <mesh castShadow ref={boxRef} position={[0, 0, 0]}>
      <axesHelper args={[5]} />
        {geometry}
        <meshStandardMaterial color={color} />
      </mesh>
    </>
  );
}
export default function Home() {
  return (
    <div className="w-full h-screen">
      <Leva collapsed={false} />
      <Canvas shadows camera={{ position: [3, 3, 3] }}>
        {/* <ambientLight intensity={0.2} color={0xfcfcfc} /> */}
        {/* <directionalLight position={[2, 5, 2]} intensity={0.8} color={0xffbb} /> */}
        <spotLight position={[2, 5, 1]} intensity={80} color={0xffea00} />
        <OrbitControls />
        <FirstPersonControls movementSpeed={6} />
        <gridHelper args={[10, 10]} />
        <AnimatedBox />
        <LightWithHelpers />
        <DLightWithHelpers />
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial /> 
        </mesh>
      </Canvas>
    </div>
  );
}

