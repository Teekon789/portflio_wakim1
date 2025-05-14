import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const HeroBackground = ({ darkMode }) => {
  const mountRef = useRef(null);
  
  useEffect(() => {
    // สร้าง scene, camera และ renderer สำหรับ Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // เคลียร์ DOM element เก่าก่อนเพิ่มใหม่
    if (mountRef.current.childNodes.length > 0) {
      mountRef.current.removeChild(mountRef.current.childNodes[0]);
    }
    mountRef.current.appendChild(renderer.domElement);
    
    // กำหนดตำแหน่งกล้อง
    camera.position.z = 20;
    
    // สร้างพาร์ทิเคิลจำนวนมาก
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    
    // สร้าง array สำหรับตำแหน่งพาร์ทิเคิล (x, y, z)
    const positionArray = new Float32Array(particlesCount * 3);
    
    // กำหนดตำแหน่งพาร์ทิเคิลแบบสุ่ม
    for (let i = 0; i < particlesCount * 3; i++) {
      // สร้างพาร์ทิเคิลในรูปทรงทรงกลม
      positionArray[i] = (Math.random() - 0.5) * 50;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3));
    
    // สร้าง material สำหรับพาร์ทิเคิล
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      sizeAttenuation: true,
      // เปลี่ยนสีตาม darkMode
      color: darkMode ? 0x8884ff : 0x4b4bdb,
      transparent: true,
      opacity: 0.8,
    });
    
    // สร้างระบบพาร์ทิเคิล
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // สร้างเส้นเชื่อมระหว่างพาร์ทิเคิล
    const connectionsGeometry = new THREE.BufferGeometry();
    const connections = [];
    const linesMaterial = new THREE.LineBasicMaterial({ 
      color: darkMode ? 0x6366f1 : 0x4338ca, 
      transparent: true,
      opacity: 0.2,
    });
    
    // ฟังก์ชันอัพเดทการเชื่อมต่อระหว่างพาร์ทิเคิล
    const updateConnections = () => {
      // ลบเส้นเชื่อมต่อเก่า
      scene.remove(scene.getObjectByName('connections'));
      connections.length = 0;
      
      // สร้างเส้นเชื่อมต่อใหม่ (เฉพาะพาร์ทิเคิลที่อยู่ใกล้กัน)
      const positions = particlesGeometry.attributes.position.array;
      
      for (let i = 0; i < particlesCount; i++) {
        const x1 = positions[i * 3];
        const y1 = positions[i * 3 + 1];
        const z1 = positions[i * 3 + 2];
        
        for (let j = i + 1; j < particlesCount; j++) {
          const x2 = positions[j * 3];
          const y2 = positions[j * 3 + 1];
          const z2 = positions[j * 3 + 2];
          
          // คำนวณระยะห่างระหว่างพาร์ทิเคิล
          const distance = Math.sqrt(
            Math.pow(x2 - x1, 2) + 
            Math.pow(y2 - y1, 2) + 
            Math.pow(z2 - z1, 2)
          );
          
          // เชื่อมต่อเฉพาะพาร์ทิเคิลที่อยู่ใกล้กัน
          if (distance < 5) {
            connections.push(x1, y1, z1, x2, y2, z2);
          }
        }
      }
      
      // สร้างเส้นเชื่อมต่อ
      if (connections.length > 0) {
        connectionsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(connections, 3));
        const linesMesh = new THREE.LineSegments(connectionsGeometry, linesMaterial);
        linesMesh.name = 'connections';
        scene.add(linesMesh);
      }
    };
    
    // ฟังก์ชันเมื่อขนาดหน้าจอเปลี่ยน
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // อัพเดทเส้นเชื่อมต่อเมื่อโหลดครั้งแรก
    updateConnections();
    
    // animation loop
    let mouseX = 0;
    let mouseY = 0;
    
    // รับพิกัดเมาส์
    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // ฟังก์ชัน animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      // หมุนพาร์ทิเคิลตามเมาส์
      particlesMesh.rotation.x += 0.001;
      particlesMesh.rotation.y += 0.001;
      
      // ทำให้พาร์ทิเคิลเคลื่อนที่ตามเมาส์
      particlesMesh.rotation.x += mouseY * 0.0005;
      particlesMesh.rotation.y += mouseX * 0.0005;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // ทำความสะอาด resource เมื่อ component ถูก unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      
      // ล้าง scene
      scene.remove(particlesMesh);
      scene.remove(scene.getObjectByName('connections'));
      
      // ล้าง geometry และ material
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      connectionsGeometry.dispose();
      linesMaterial.dispose();
      
      // หยุด renderer
      renderer.dispose();
      
      // ลบ canvas จาก DOM
      if (mountRef.current && mountRef.current.childNodes.length > 0) {
        mountRef.current.removeChild(mountRef.current.childNodes[0]);
      }
    };
  }, [darkMode]); // รีเรนเดอร์เมื่อ darkMode เปลี่ยน

  return (
    <div 
      ref={mountRef} 
      className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden"
      style={{ 
        pointerEvents: 'none',
        // เพิ่ม style เพื่อให้แน่ใจว่าอยู่ด้านหลังจริงๆ
        zIndex: -1,
      }}
    />
  );
};

export default HeroBackground;