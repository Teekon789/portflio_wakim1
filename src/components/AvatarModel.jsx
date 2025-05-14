import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const AvatarModel = ({ darkMode }) => {
  const mountRef = useRef(null);
  
  useEffect(() => {
    // สร้าง scene, camera และ renderer สำหรับ Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000); // อัตราส่วน 1:1 สำหรับ avatar
    
    // สร้าง renderer แบบโปร่งใส
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    
    // กำหนดขนาดของ renderer
    renderer.setSize(300, 300); // ขนาดที่เหมาะสมสำหรับ avatar
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // เคลียร์ DOM element เก่าก่อนเพิ่มใหม่
    if (mountRef.current.childNodes.length > 0) {
      mountRef.current.removeChild(mountRef.current.childNodes[0]);
    }
    
    mountRef.current.appendChild(renderer.domElement);
    
    // กำหนดตำแหน่งกล้อง
    camera.position.z = 5;
    
    // สร้างแสง
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7); // เพิ่มความสว่างของแสงโดยรวม
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 1.2); // เพิ่มความสว่างของแสงจุด
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    
    // สร้างกลุ่ม object สำหรับ avatar
    const avatarGroup = new THREE.Group();
    scene.add(avatarGroup);
    
    // สร้างหัว (ทรงกลม) ด้วยสีที่สว่างขึ้น
    const headGeometry = new THREE.SphereGeometry(1, 32, 32);
    const headMaterial = new THREE.MeshStandardMaterial({ 
      color: darkMode ? 0x818cf8 : 0x60a5fa, // เปลี่ยนเป็นสีฟ้าอ่อนที่สว่างกว่าเดิม
      roughness: 0.2,
      metalness: 0.5,
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    avatarGroup.add(head);
    
    // สร้างตา (ซ้าย)
    const eyeGeometry = new THREE.SphereGeometry(0.2, 32, 32);
    const eyeMaterial = new THREE.MeshStandardMaterial({ 
      color: darkMode ? 0xffffff : 0xf9fafb, // สีขาวสว่างขึ้น
      roughness: 0.1,
      metalness: 0.9,
    });
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.4, 0.2, 0.85);
    avatarGroup.add(leftEye);
    
    // สร้างตา (ขวา)
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.4, 0.2, 0.85);
    avatarGroup.add(rightEye);
    
    // สร้างม่านตา
    const pupilGeometry = new THREE.SphereGeometry(0.1, 32, 32);
    const pupilMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x334155, // เปลี่ยนจากสีดำเป็นสีเทาเข้มเพื่อให้ไม่ดูมืดเกินไป
      roughness: 0.1,
      metalness: 0.1,
    });
    const leftPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    leftPupil.position.set(-0.4, 0.2, 0.95);
    avatarGroup.add(leftPupil);
    
    const rightPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    rightPupil.position.set(0.4, 0.2, 0.95);
    avatarGroup.add(rightPupil);
    
    // สร้างปาก
    const mouthGeometry = new THREE.TorusGeometry(0.3, 0.1, 16, 100, Math.PI);
    const mouthMaterial = new THREE.MeshStandardMaterial({ 
      color: darkMode ? 0xfb7185 : 0xf472b6, // เปลี่ยนเป็นสีชมพูอ่อนที่สว่างกว่า
      roughness: 0.3,
      metalness: 0.2,
    });
    const mouth = new THREE.Mesh(mouthGeometry, mouthMaterial);
    mouth.position.set(0, -0.3, 0.9);
    mouth.rotation.set(Math.PI, 0, 0);
    avatarGroup.add(mouth);
    
    // สร้างโครงร่างรอบหัว
    const outlineGeometry = new THREE.TorusGeometry(1.1, 0.05, 16, 50);
    const outlineMaterial = new THREE.MeshStandardMaterial({ 
      color: darkMode ? 0xf9a8d4 : 0xfda4af, // เปลี่ยนเป็นสีชมพูอ่อนมากขึ้น
      roughness: 0.3,
      metalness: 0.7,
      side: THREE.DoubleSide,
    });
    
    const outline1 = new THREE.Mesh(outlineGeometry, outlineMaterial);
    outline1.rotation.set(Math.PI/2, 0, 0);
    avatarGroup.add(outline1);
    
    const outline2 = new THREE.Mesh(outlineGeometry, outlineMaterial);
    outline2.rotation.set(0, Math.PI/2, 0);
    avatarGroup.add(outline2);
    
    // เพิ่มวงแหวนเรืองแสงรอบนอก
    const glowGeometry = new THREE.TorusGeometry(1.2, 0.03, 16, 50);
    const glowMaterial = new THREE.MeshStandardMaterial({
      color: darkMode ? 0xc4b5fd : 0xa5b4fc,
      roughness: 0.1,
      metalness: 1.0,
      emissive: darkMode ? 0x8b5cf6 : 0x93c5fd,
      emissiveIntensity: 0.5,
      side: THREE.DoubleSide,
    });
    
    const glow1 = new THREE.Mesh(glowGeometry, glowMaterial);
    glow1.rotation.set(Math.PI/3, 0, 0);
    avatarGroup.add(glow1);
    
    // เพิ่มอนิเมชั่นการหมุน
    let mouseX = 0;
    let mouseY = 0;
    
    // รับพิกัดเมาส์
    const handleMouseMove = (event) => {
      // คำนวณตำแหน่งเมาส์เทียบกับหน้าจอ
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      
      mouseX = (event.clientX - windowHalfX) / windowHalfX;
      mouseY = (event.clientY - windowHalfY) / windowHalfY;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // หมุน avatar ตามตำแหน่งเมาส์อย่างนุ่มนวล
      avatarGroup.rotation.y = THREE.MathUtils.lerp(
        avatarGroup.rotation.y, 
        mouseX * 0.5, 
        0.05
      );
      
      avatarGroup.rotation.x = THREE.MathUtils.lerp(
        avatarGroup.rotation.x, 
        mouseY * 0.3, 
        0.05
      );
      
      // เคลื่อนไหวรูม่านตาตามตำแหน่งเมาส์
      leftPupil.position.x = -0.4 + mouseX * 0.05;
      rightPupil.position.x = 0.4 + mouseX * 0.05;
      
      leftPupil.position.y = 0.2 - mouseY * 0.05;
      rightPupil.position.y = 0.2 - mouseY * 0.05;
      
      // เพิ่มการเคลื่อนไหวลอยขึ้น-ลงเล็กน้อย
      const time = Date.now() * 0.001; // แปลงเป็นวินาที
      avatarGroup.position.y = Math.sin(time) * 0.1;
      
      // หมุนวงแหวนเรืองแสงเพื่อเพิ่มเอฟเฟกต์
      glow1.rotation.x += 0.004;
      glow1.rotation.y += 0.002;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // ฟังก์ชันเมื่อขนาดหน้าจอเปลี่ยน
    const handleResize = () => {
      renderer.setSize(300, 300); // คงขนาดไว้ที่ 300x300 px
    };
    
    window.addEventListener('resize', handleResize);
    
    // ทำความสะอาด resource เมื่อ component ถูก unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      
      // ล้าง scene
      scene.remove(avatarGroup);
      
      // ล้าง geometry และ material
      headGeometry.dispose();
      headMaterial.dispose();
      eyeGeometry.dispose();
      eyeMaterial.dispose();
      pupilGeometry.dispose();
      pupilMaterial.dispose();
      mouthGeometry.dispose();
      mouthMaterial.dispose();
      outlineGeometry.dispose();
      outlineMaterial.dispose();
      glowGeometry.dispose();
      glowMaterial.dispose();
      
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
      className={`
        relative 
        mx-auto 
        my-8 
        w-[300px] 
        h-[300px] 
        rounded-full
        transition-all
        duration-300
        cursor-pointer
        ${darkMode ? 'shadow-[0_0_25px_rgba(139,92,246,0.5)]' : 'shadow-[0_0_25px_rgba(96,165,250,0.4)]'}
        overflow-hidden
        z-10
      `}
    />
  );
};

export default AvatarModel;