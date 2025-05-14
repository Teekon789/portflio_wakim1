import { useEffect, useRef } from "react";
import * as THREE from "three";

const AvatarModel = ({ darkMode }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    // สร้าง scene, camera และ renderer สำหรับ Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000); // อัตราส่วน 1:1 สำหรับ avatar

    // สร้าง renderer แบบโปร่งใส
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
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
    outline1.rotation.set(Math.PI / 2, 0, 0);
    avatarGroup.add(outline1);

    const outline2 = new THREE.Mesh(outlineGeometry, outlineMaterial);
    outline2.rotation.set(0, Math.PI / 2, 0);
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
    glow1.rotation.set(Math.PI / 3, 0, 0);
    avatarGroup.add(glow1);

    // เพิ่มแสงเรืองรอบหัว
    const haloGeometry = new THREE.RingGeometry(1.3, 1.5, 32);
    const haloMaterial = new THREE.MeshBasicMaterial({
      color: darkMode ? 0xa78bfa : 0x93c5fd,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.3,
    });
    const halo = new THREE.Mesh(haloGeometry, haloMaterial);
    halo.rotation.x = Math.PI / 2;
    avatarGroup.add(halo);

    // สร้างเปลือกตา
    const eyelidGeometry = new THREE.SphereGeometry(
      0.21,
      32,
      16,
      0,
      Math.PI * 2,
      0,
      Math.PI * 0.6
    );
    const eyelidMaterial = new THREE.MeshStandardMaterial({
      color: headMaterial.color,
      roughness: 0.2,
      metalness: 0.5,
      side: THREE.DoubleSide,
    });

    const leftEyelid = new THREE.Mesh(eyelidGeometry, eyelidMaterial);
    leftEyelid.position.set(-0.4, 0.2, 0.85);
    leftEyelid.rotation.x = Math.PI;
    leftEyelid.visible = false; // เริ่มต้นไม่แสดง
    avatarGroup.add(leftEyelid);

    const rightEyelid = new THREE.Mesh(eyelidGeometry, eyelidMaterial);
    rightEyelid.position.set(0.4, 0.2, 0.85);
    rightEyelid.rotation.x = Math.PI;
    rightEyelid.visible = false; // เริ่มต้นไม่แสดง
    avatarGroup.add(rightEyelid);

    // ตัวแปรสำหรับควบคุมอนิเมชัน
    let mouseX = 0;
    let mouseY = 0;
    let lastMouseMoveTime = Date.now();
    let isBlinking = false;
    let blinkTimeout = null;
    let isMouthMoving = false;
    let mouthTimeout = null;
    let idleMovementAngle = 0;
    let idleEyeMovementAngle = 0;
    let isUserInteracting = false;

    // รับพิกัดเมาส์
    const handleMouseMove = (event) => {
      // คำนวณตำแหน่งเมาส์เทียบกับหน้าจอ
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;

      mouseX = (event.clientX - windowHalfX) / windowHalfX;
      mouseY = (event.clientY - windowHalfY) / windowHalfY;

      lastMouseMoveTime = Date.now();
      isUserInteracting = true;

      // ยกเลิกการกะพริบตาที่กำลังจะเกิดขึ้น
      if (blinkTimeout) {
        clearTimeout(blinkTimeout);
      }

      // ตั้งเวลากะพริบตาใหม่
      scheduleNextBlink();
    };

    // ฟังก์ชันกะพริบตา
    const blink = () => {
      if (isBlinking) return;

      isBlinking = true;
      leftEyelid.visible = true;
      rightEyelid.visible = true;

      // เปิดตาหลังจาก 150ms
      setTimeout(() => {
        leftEyelid.visible = false;
        rightEyelid.visible = false;
        isBlinking = false;

        // กะพริบตารอบถัดไป
        scheduleNextBlink();
      }, 150);
    };

    // ฟังก์ชันตั้งเวลากะพริบตา
    const scheduleNextBlink = () => {
      if (blinkTimeout) {
        clearTimeout(blinkTimeout);
      }

      // กะพริบตาทุก 2-6 วินาที
      const nextBlinkTime = 2000 + Math.random() * 4000;
      blinkTimeout = setTimeout(blink, nextBlinkTime);
    };

    // ฟังก์ชันเคลื่อนไหวปาก
    const moveMouth = () => {
      if (isMouthMoving) return;

      isMouthMoving = true;

      // สุ่มขนาดปาก
      const originalScale = mouth.scale.clone();
      const targetScaleY = 0.6 + Math.random() * 0.8;

      // เปลี่ยนขนาดปาก
      mouth.scale.y = targetScaleY;

      // คืนค่าปากหลังจาก 300ms
      setTimeout(() => {
        mouth.scale.y = originalScale.y;
        isMouthMoving = false;

        // เคลื่อนไหวปากรอบถัดไป
        scheduleNextMouthMovement();
      }, 300);
    };

    // ฟังก์ชันตั้งเวลาเคลื่อนไหวปาก
    const scheduleNextMouthMovement = () => {
      if (mouthTimeout) {
        clearTimeout(mouthTimeout);
      }

      // เคลื่อนไหวปากทุก 5-10 วินาที
      const nextMouthTime = 5000 + Math.random() * 5000;
      mouthTimeout = setTimeout(moveMouth, nextMouthTime);
    };

    // เริ่มต้นตั้งเวลากะพริบตาและเคลื่อนไหวปาก
    scheduleNextBlink();
    scheduleNextMouthMovement();

    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      const currentTime = Date.now();
      const idleTime = 3000; // 3 วินาทีไม่มีการเคลื่อนไหวเมาส์จะเริ่มเข้าสู่โหมด idle

      // ตรวจสอบว่าอยู่ในโหมด idle หรือไม่
      isUserInteracting = currentTime - lastMouseMoveTime < idleTime;

      // คำนวณการเคลื่อนไหวในโหมด idle
      if (!isUserInteracting) {
        // เพิ่มมุมการเคลื่อนไหวแบบ idle
        idleMovementAngle += 0.005;
        idleEyeMovementAngle += 0.01;

        // เคลื่อนไหวแบบวงกลมเล็กๆ
        const idleX = Math.sin(idleMovementAngle) * 0.3;
        const idleY = Math.cos(idleMovementAngle * 0.5) * 0.2;

        // หมุนหัวในโหมด idle
        avatarGroup.rotation.y = THREE.MathUtils.lerp(
          avatarGroup.rotation.y,
          idleX,
          0.02
        );

        avatarGroup.rotation.x = THREE.MathUtils.lerp(
          avatarGroup.rotation.x,
          idleY,
          0.02
        );

        // เคลื่อนไหวตาแบบวงกลมในโหมด idle
        const eyeIdleX = Math.sin(idleEyeMovementAngle) * 0.08;
        const eyeIdleY = Math.cos(idleEyeMovementAngle) * 0.05;

        leftPupil.position.x = -0.4 + eyeIdleX;
        rightPupil.position.x = 0.4 + eyeIdleX;

        leftPupil.position.y = 0.2 + eyeIdleY;
        rightPupil.position.y = 0.2 + eyeIdleY;
      } else {
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
      }

      // เพิ่มการเคลื่อนไหวลอยขึ้น-ลงเล็กน้อย (การหายใจ)
      const time = Date.now() * 0.001; // แปลงเป็นวินาที
      const breathAmp = isUserInteracting ? 0.1 : 0.15; // เพิ่มแอมพลิจูดเมื่ออยู่ในโหมด idle
      avatarGroup.position.y = Math.sin(time * 0.8) * breathAmp;

      // เพิ่มการเคลื่อนไหวบิดเอียงเล็กน้อย (คล้ายการหายใจ)
      avatarGroup.rotation.z = Math.sin(time * 0.5) * 0.03;

      // หมุนวงแหวนเรืองแสงเพื่อเพิ่มเอฟเฟกต์
      glow1.rotation.x += 0.004;
      glow1.rotation.y += 0.002;

      // เพิ่มการเปลี่ยนแปลงขนาดและความโปร่งใสของแสงเรือง
      const haloScale = 1 + Math.sin(time * 1.2) * 0.1;
      halo.scale.set(haloScale, haloScale, haloScale);
      halo.material.opacity = 0.2 + Math.sin(time) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    // ฟังก์ชันเมื่อขนาดหน้าจอเปลี่ยน
    const handleResize = () => {
      renderer.setSize(300, 300); // คงขนาดไว้ที่ 300x300 px
    };

    window.addEventListener("resize", handleResize);

    // ทำความสะอาด resource เมื่อ component ถูก unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);

      // ยกเลิก timeout ทั้งหมด
      if (blinkTimeout) clearTimeout(blinkTimeout);
      if (mouthTimeout) clearTimeout(mouthTimeout);

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
      haloGeometry.dispose();
      haloMaterial.dispose();
      eyelidGeometry.dispose();
      eyelidMaterial.dispose();

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
        ${
          darkMode
            ? "shadow-[0_0_25px_rgba(139,92,246,0.5)]"
            : "shadow-[0_0_25px_rgba(96,165,250,0.4)]"
        }
        overflow-hidden
        z-10
      `}
    />
  );
};

export default AvatarModel;
