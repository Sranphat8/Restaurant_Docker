// นำเข้า React, useState สำหรับเก็บข้อมูล form และ useNavigate สำหรับเปลี่ยนหน้า
import React, { useState } from "react";
import { useNavigate } from "react-router"; // ใช้ react-router (v7)

const Add = () => {
  const navigate = useNavigate(); // ใช้เปลี่ยนหน้า (หลังบันทึกข้อมูล)

  // สร้าง state เก็บค่าจาก input form
  const [form, setForm] = useState({
    title: "", // ชื่อร้านอาหาร
    type: "",  // ประเภทอาหาร
    img: "",   // URL รูปภาพ
  });

  // handleChange จะอัปเดตค่าที่ผู้ใช้กรอกลงในฟอร์ม
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // handleSubmit จะเรียกเมื่อผู้ใช้กดปุ่ม "เพิ่มร้านอาหาร"
  const handleSubmit = async (e) => {
    e.preventDefault(); // ป้องกันการ reload หน้า

    // ตรวจสอบว่าผู้ใช้กรอกครบทุกช่อง
    if (!form.title || !form.type || !form.img) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    // ส่งข้อมูลไปที่ API (json-server) เพื่อเพิ่มข้อมูลร้านอาหาร
    try {
      await fetch("http://localhost:3000/restaurants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form), // ส่งข้อมูลฟอร์มในรูปแบบ JSON
      });

      // เมื่อเพิ่มสำเร็จ ให้เปลี่ยนหน้าไปที่หน้า Home (/)
      navigate("/");
    } catch (err) {
      console.error("เกิดข้อผิดพลาดในการเพิ่มร้านอาหาร:", err);
    }
  };

  return (
    // กล่องฟอร์มตรงกลางจอ พื้นหลังไล่สี
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
              name="title"
              value={form.title}
              onChange={handleChange}
              className="input input-bordered input-primary w-full"
              placeholder="เช่น ชาบูอร่อยเด็ด"
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
            />
          </div>

          {/* ลิงก์รูปภาพ */}
          <div className="form-control">
            <label className="label font-semibold text-base-content">ลิงก์รูปภาพ</label>
            <input
              type="text"
              name="img"
              value={form.img}
              onChange={handleChange}
              className="input input-bordered input-primary w-full"
              placeholder="https://example.com/image.jpg"
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
