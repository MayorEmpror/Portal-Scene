import { OrbitControls, useGLTF, useTexture,Center, Sparkles,shaderMaterial } from '@react-three/drei'
import { extend,useFrame } from '@react-three/fiber'
import { MeshBasicMaterial } from 'three'
import Fragment from "./shaders/portal/fragment.glsl"
import Vertex from "./shaders/portal/vertex.glsl"
import * as THREE from "three"
import { useRef } from 'react'
export default function Experience()
{
    const {nodes} = useGLTF('./model/portal.glb')
    const texture = useTexture('./model/baked.jpg')
    texture.flipY = false
    console.log(texture)
    console.log(nodes)
    const portalMaterial = useRef()
    useFrame((state, delta) =>
{
    portalMaterial.current.uTime += delta
})
    const PortalMaterial = shaderMaterial({
      uTime: 0,
      uColorStart: new THREE.Color('#ffffff'),
      uColorEnd: new THREE.Color('#000000')
     },
     Vertex,Fragment

      )
      extend({ PortalMaterial })

  return <>

        <OrbitControls makeDefault />
        <color args= {["#000000"]} attach="background"/>
        <mesh scale={ 1.5 } position-y={-5}>
            <boxGeometry />
            <meshNormalMaterial  />
        </mesh>
  <Center>
   <mesh geometry={nodes.baked.geometry}>
   <meshBasicMaterial map={texture}/>
   </mesh>
   <mesh geometry={nodes.poleLightA.geometry} position={nodes.poleLightA.position}></mesh>
   <mesh geometry={nodes.poleLightB.geometry} position={nodes.poleLightB.position}></mesh>
   <mesh geometry={nodes.portalLight.geometry} position={nodes.portalLight.position} rotation={nodes.portalLight.rotation}>
   <portalMaterial  ref={ portalMaterial } />
    {/* <shaderMaterial
    fragmentShader={Fragment}
    vertexShader={Vertex}
    uniforms={
  {
    uTime: { value: 0 },
        uColorStart: { value: new THREE.Color('#ffffff') },
        uColorEnd: { value: new THREE.Color('#000000') }
    }
    }
    /> */}
   </mesh>
   <Sparkles
   size={6}
   scale={[4,2,4]}
   position-y={1}
   
   />
  </Center>
  
    </>
}