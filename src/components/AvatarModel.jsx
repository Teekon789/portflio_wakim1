import { useEffect, useRef, useState } from "react"; // เพิ่ม useState
import * as THREE from "three";

const AvatarModel = ({ darkMode, t }) => {
  const mountRef = useRef(null);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const messageRef = useRef(null);
  const messageTimer = useRef(null);

  // ใช้ t ที่รับมาจาก prop โดยตรง
  const getRandomMessage = () => {
    const messages = [
      t.avatar.message1,
      t.avatar.message2,
      t.avatar.message3,
      t.avatar.message4,
      t.avatar.message5,
      t.avatar.message6,
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const handleAvatarClick = () => {
    if (messageTimer.current) {
      clearTimeout(messageTimer.current);
    }

    // สุ่มข้อความใหม่เมื่อคลิกที่ avatar
    setMessage(getRandomMessage());
    setShowMessage(true);
    // ตั้งค่าให้แสดงข้อความ
    messageTimer.current = setTimeout(() => {
      setShowMessage(false);
    }, 3500);
  };

  // เอฟเฟกต์การแสดงข้อความ
  useEffect(() => {
    if (showMessage && messageRef.current) {
      messageRef.current.style.opacity = "0";
      messageRef.current.style.transform = "translateY(10px) scale(0.9)";

      setTimeout(() => {
        messageRef.current.style.opacity = "1";
        messageRef.current.style.transform = "translateY(0) scale(1)";
      }, 10);
    }

    // เคลียร์ timer เมื่อ component unmount
    return () => {
      if (messageTimer.current) {
        clearTimeout(messageTimer.current);
      }
    };
  }, [showMessage]);

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

    // เพิ่มหูฟัง (เฉพาะโหมดมืด)
    if (darkMode) {
      // สร้างก้านหูฟัง
      const headphoneBandGeometry = new THREE.TorusGeometry(
        1.05,
        0.05,
        16,
        32,
        Math.PI
      );
      const headphoneBandMaterial = new THREE.MeshStandardMaterial({
        color: 0x6366f1,
        roughness: 0.3,
        metalness: 0.7,
      });
      const headphoneBand = new THREE.Mesh(
        headphoneBandGeometry,
        headphoneBandMaterial
      );
      headphoneBand.position.set(0, 0, 0);
      headphoneBand.rotation.set(0, 0, Math.PI);
      avatarGroup.add(headphoneBand);

      // สร้างฝาครอบหูซ้าย
      const earphoneGeometry = new THREE.SphereGeometry(
        0.25,
        32,
        32,
        0,
        Math.PI * 2,
        0,
        Math.PI * 0.7
      );
      const earphoneMaterial = new THREE.MeshStandardMaterial({
        color: 0x818cf8,
        roughness: 0.2,
        metalness: 0.8,
        side: THREE.DoubleSide,
      });

      const leftEarphone = new THREE.Mesh(earphoneGeometry, earphoneMaterial);
      leftEarphone.position.set(-1.05, 0, 0);
      leftEarphone.rotation.set(0, Math.PI / 2, 0);
      avatarGroup.add(leftEarphone);

      // สร้างฝาครอบหูขวา
      const rightEarphone = new THREE.Mesh(earphoneGeometry, earphoneMaterial);
      rightEarphone.position.set(1.05, 0, 0);
      rightEarphone.rotation.set(0, -Math.PI / 2, 0);
      avatarGroup.add(rightEarphone);
    }

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
    let isWaving = false;
    let lastClickTime = Date.now();

    // เพิ่มแขนและมือสำหรับการโบกมือ
    const armGeometry = new THREE.CylinderGeometry(0.08, 0.06, 0.8, 16);
    const armMaterial = new THREE.MeshStandardMaterial({
      color: headMaterial.color,
      roughness: 0.2,
      metalness: 0.5,
    });

    const arm = new THREE.Mesh(armGeometry, armMaterial);
    arm.position.set(1.2, -0.6, 0);
    arm.rotation.z = Math.PI / 4; // เอียงแขนขึ้น

    // สร้างข้อศอก (pivot point)
    const elbow = new THREE.Group();
    elbow.position.set(1.2, -0.6, 0);

    // สร้างแขนส่วนล่าง
    const forearmGeometry = new THREE.CylinderGeometry(0.06, 0.05, 0.7, 16);
    const forearm = new THREE.Mesh(forearmGeometry, armMaterial);
    forearm.position.set(0.4, 0.3, 0);

    // สร้างมือ
    const handGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    const hand = new THREE.Mesh(handGeometry, armMaterial);
    hand.position.set(0.7, 0.6, 0);

    // เพิ่มแขนและมือเข้าไปในกลุ่ม
    elbow.add(forearm);
    elbow.add(hand);
    avatarGroup.add(arm);
    avatarGroup.add(elbow);

    // ซ่อนแขนและมือเริ่มต้น
    arm.visible = false;
    elbow.visible = false;

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

    // ฟังก์ชันสำหรับการโบกมือ
    const waveHand = () => {
      if (isWaving) return;

      isWaving = true;
      lastClickTime = Date.now();

      // แสดงแขนและมือ
      arm.visible = true;
      elbow.visible = true;

      // ซ่อนแขนและมือหลังจาก 3 วินาที
      setTimeout(() => {
        arm.visible = false;
        elbow.visible = false;
        isWaving = false;
      }, 3000);
    };

    // ฟังก์ชั่นจัดการคลิก
    const handleCanvasClick = () => {
      waveHand();
      // ส่งข้อมูลกลับไปที่ component
      if (mountRef.current) {
        mountRef.current.dispatchEvent(
          new CustomEvent("avatarClicked", { bubbles: true })
        );
      }
    };

    // เพิ่ม event listener สำหรับการคลิกที่ canvas
    renderer.domElement.addEventListener("click", handleCanvasClick);

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

      // อนิเมชั่นโบกมือ
      if (isWaving) {
        const waveTime = (Date.now() - lastClickTime) * 0.005;
        elbow.rotation.z = Math.sin(waveTime * 5) * 0.5;
      }

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
      renderer.domElement.removeEventListener("click", handleCanvasClick);

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

      // ล้าง geometry และ material ที่เพิ่มเข้ามาใหม่
      if (armGeometry) armGeometry.dispose();
      if (armMaterial) armMaterial.dispose();
      if (forearmGeometry) forearmGeometry.dispose();

      // ล้าง renderer
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [darkMode]); // เรียกใช้ useEffect ใหม่เมื่อ darkMode เปลี่ยน

  return (
    <div className="relative flex justify-center items-center">
      {/* ส่วนแสดง 3D Avatar */}
      <div
        ref={mountRef}
        className="w-auto h-auto md:w-auto md:h-auto cursor-pointer"
        onClick={handleAvatarClick}
      ></div>

      {/* ช่องข้อความแบบใหม่ที่สวยงามและ responsive */}
      {showMessage && (
        <div
          ref={messageRef}
          className={`
            absolute bottom-52 left-1/2 -translate-x-1/2 mb-3
            bg-white dark:bg-gray-800 
            px-4 py-3 rounded-2xl shadow-2xl
            text-gray-800 dark:text-gray-100
            transition-all duration-300
            max-w-[90vw] w-max
            ${darkMode ? "border-indigo-400" : "border-blue-300"} border
            before:content-[''] before:absolute before:top-full before:left-1/2 
            before:-translate-x-1/2 before:border-8 before:border-transparent 
            before:border-t-white dark:before:border-t-gray-800
            z-10
          `}
          style={{
            boxShadow: darkMode
              ? "0 4px 20px rgba(99, 102, 241, 0.3)"
              : "0 4px 20px rgba(59, 130, 246, 0.3)",
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
          }}
        >
          <div className="flex flex-col items-center">
            {/* เอฟเฟกต์การพูด */}
            <div className="flex space-x-1 mb-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    darkMode ? "bg-indigo-300" : "bg-blue-300"
                  }`}
                  style={{
                    opacity: 0.3 + i * 0.2,
                    animation: `pulse 1.5s infinite ${i * 0.2}s`,
                  }}
                />
              ))}
            </div>

            <p className="text-sm md:text-base text-center leading-relaxed">
              {message}
            </p>
          </div>
        </div>
      )}

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  );
};

export default AvatarModel;
