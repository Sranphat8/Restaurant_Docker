// นำเข้า React, useState สำหรับเก็บข้อมูล form
import React, { useState } from "react";
// ไม่ใช้ useNavigate จาก react-router-dom แล้ว
// import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // นำเข้า SweetAlert2

// กำหนด URL พื้นฐานของ Backend API ของคุณ
const API_BASE_URL = 'http://localhost:5000/api/v1/restaurant';

const Add = () => {
  // สร้าง state เก็บค่าจาก input form
  // เปลี่ยนชื่อ key ใน state ให้ตรงกับ Frontend เดิม (title, img)
  const [form, setForm] = useState({
    title: "", // กลับไปใช้ title
    type: "",  // ประเภทอาหาร
    img: "",   // กลับไปใช้ img
  });

  // handleChange จะอัปเดตค่าที่ผู้ใช้กรอกลงในฟอร์ม
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // handleSubmit จะเรียกเมื่อผู้ใช้กดปุ่ม "เพิ่มร้านอาหาร"
  const handleSubmit = async (e) => {
    e.preventDefault(); // ป้องกันการ reload หน้า

    // ตรวจสอบว่าผู้ใช้กรอกครบทุกช่องด้วย SweetAlert2
    if (!form.title || !form.type || !form.img) {
      Swal.fire({
        icon: 'error',
        title: 'ข้อมูลไม่ครบถ้วน',
        text: 'กรุณากรอกข้อมูลให้ครบถ้วน',
        customClass: { popup: "rounded-xl" },
      });
      return;
    }

    // ส่งข้อมูลไปที่ API Backend เพื่อเพิ่มข้อมูลร้านอาหาร
    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // ปรับโครงสร้างข้อมูลที่ส่งไป Backend (name, imageUrl) ให้มาจาก Frontend (title, img)
        body: JSON.stringify({
          name: form.title,
          type: form.type,
          imageUrl: form.img
        }),
      });

      // ตรวจสอบว่า response สำเร็จหรือไม่
      if (!response.ok) {
        // พยายามอ่าน error จาก response.json() ถ้ามี
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (jsonError) {
          // ถ้า response ไม่ใช่ JSON หรืออ่านไม่ได้
          console.error("Failed to parse error response:", jsonError);
        }
        throw new Error(errorMessage);
      }

      Swal.fire({ // ใช้ SweetAlert2
        icon: 'success',
        title: 'เพิ่มร้านอาหารสำเร็จ!',
        showConfirmButton: false,
        timer: 1500,
        customClass: { popup: "rounded-xl" },
      }).then(() => {
        window.location.href = "/"; // กลับไปหน้าแรกหลังเพิ่มสำเร็จด้วย window.location.href
      });

    } catch (err) {
      console.error("เกิดข้อผิดพลาดในการเพิ่มร้านอาหาร:", err);
      // แสดงข้อความ error ที่ชัดเจนขึ้น
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด!',
        text: `ไม่สามารถเพิ่มร้านอาหารได้: ${err.message}`, // err.message จะมาจาก throw new Error
        customClass: { popup: "rounded-xl" },
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-200 to-base-100 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-neutral">เพิ่มร้านอาหาร</h2>

        {/* ฟอร์มสำหรับกรอกข้อมูลร้าน */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ชื่อร้าน */}
          <div className="form-control">
            <label className="label font-semibold text-base-content">ชื่อร้านอาหาร</label>
            <input
              type="text"
              name="title" // คงไว้ name attribute เป็น "title"
              value={form.title}
              onChange={handleChange}
              className="input input-bordered input-primary w-full"
              placeholder="เช่น ชาบูอร่อยเด็ด"
              required
            />
          </div>

          {/* ประเภทอาหาร */}
          <div className="form-control">
            <label className="label font-semibold text-base-content">ประเภทอาหาร</label>
            <input
              type="text"
              name="type"
              value={form.type}
              onChange={handleChange}
              className="input input-bordered input-primary w-full"
              placeholder="เช่น ชาบู, ปิ้งย่าง"
              required
            />
          </div>

          {/* ลิงก์รูปภาพ */}
          <div className="form-control">
            <label className="label font-semibold text-base-content">ลิงก์รูปภาพ</label>
            <input
              type="text"
              name="img" // คงไว้ name attribute เป็น "img"
              value={form.img}
              onChange={handleChange}
              className="input input-bordered input-primary w-full"
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>

          {/* ปุ่ม submit */}
          <button type="submit" className="btn btn-primary w-full rounded-full tracking-wide text-lg">
            เพิ่มร้านอาหาร
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
