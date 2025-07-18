// นำเข้า React และ Hook ที่จำเป็น
import React, { useState, useEffect } from "react";
// ใช้ useParams จาก 'react-router' (core) สำหรับดึง id
import { useParams } from "react-router";
import Swal from "sweetalert2"; // *** คงไว้: นำเข้า SweetAlert2 ***

// กำหนด URL พื้นฐานของ Backend API ของคุณ
const API_BASE_URL = 'http://localhost:5000/api/v1/restaurant';

const Update = () => {
  // ดึง id จาก URL เช่น /update/3 => id = 3
  const { id } = useParams();

  // เก็บข้อมูลร้านอาหารที่จะแก้ไขไว้ใน state
  // เปลี่ยนชื่อ key ใน state ให้ตรงกับ Frontend เดิม (title, img)
  const [restaurant, setRestaurant] = useState({
    title: "",    // กลับไปใช้ title
    type: "",
    img: "",      // กลับไปใช้ img
  });
  // เพิ่ม: สถานะการโหลดข้อมูลและข้อผิดพลาด
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ดึงข้อมูลร้านอาหารจาก server เมื่อโหลด component นี้
  useEffect(() => {
    const fetchRestaurant = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/${id}`); // ใช้ API_BASE_URL
        if (!response.ok) {
          if (response.status === 404) {
            Swal.fire({ // ใช้ SweetAlert2
              icon: 'error',
              title: 'ไม่พบร้านอาหาร',
              text: `ไม่พบร้านอาหารด้วย ID: ${id}`,
              customClass: { popup: "rounded-xl" },
            }).then(() => {
              window.location.href = "/"; // กลับหน้าหลักถ้าไม่พบ
            });
            return;
          }
          const errorData = await response.json();
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // ปรับโครงสร้างข้อมูลที่ได้จาก Backend (name, imageUrl) ให้เข้ากับ state ของ Frontend (title, img)
        setRestaurant({
          title: data.name,     // Backend name -> Frontend title
          type: data.type,
          img: data.imageUrl    // Backend imageUrl -> Frontend img
        });
      } catch (err) {
        console.error("Error fetching restaurant for update:", err);
        Swal.fire({ // ใช้ SweetAlert2
          icon: 'error',
          title: 'เกิดข้อผิดพลาด!',
          text: `ไม่สามารถโหลดข้อมูลร้านอาหารได้: ${err.message}`,
          customClass: { popup: "rounded-xl" },
        });
        setError(`Failed to load restaurant: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [id]);

  // เมื่อกดปุ่ม "บันทึก" ให้ส่งข้อมูลใหม่ไปที่ server
  const handleSubmit = async () => {
    // ตรวจสอบข้อมูลก่อนส่ง (Validation) ด้วย SweetAlert2
    if (!restaurant.title || !restaurant.type || !restaurant.img) {
      Swal.fire({
        icon: 'error',
        title: 'ข้อมูลไม่ครบถ้วน',
        text: 'กรุณากรอกข้อมูลให้ครบถ้วน',
        customClass: { popup: "rounded-xl" },
      });
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        // ปรับโครงสร้างข้อมูลที่ส่งไป Backend (name, imageUrl) ให้มาจาก Frontend (title, img)
        body: JSON.stringify({
          name: restaurant.title,
          type: restaurant.type,
          imageUrl: restaurant.img
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      Swal.fire({ // ใช้ SweetAlert2
        icon: 'success',
        title: 'อัปเดตข้อมูลสำเร็จ!',
        showConfirmButton: false,
        timer: 1500,
        customClass: { popup: "rounded-xl" },
      }).then(() => {
        window.location.href = "/"; // กลับไปหน้าแรกหลังอัปเดตเสร็จด้วย window.location.href
      });

    } catch (err) {
      console.error("Error updating restaurant:", err);
      Swal.fire({ // ใช้ SweetAlert2
        icon: 'error',
        title: 'เกิดข้อผิดพลาด!',
        text: `ไม่สามารถอัปเดตข้อมูลได้: ${err.message}`,
        customClass: { popup: "rounded-xl" },
      });
    }
  };

  // แสดงสถานะการโหลดหรือข้อผิดพลาด
  if (loading) {
    return <p className="text-center text-gray-500 mt-20">Loading restaurant data...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-20">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6 py-16">
      <div className="bg-white bg-opacity-70 backdrop-blur-md rounded-3xl shadow-md max-w-lg w-full p-10">
        <h2 className="text-3xl font-light mb-8 text-gray-900 text-center tracking-wide select-none">
          แก้ไขข้อมูลร้านอาหาร
        </h2>

        {/* ช่องกรอกชื่อร้านอาหาร */}
        <label className="block mb-3 font-semibold text-gray-700">ชื่อร้าน (Title)</label>
        <input
          type="text"
          value={restaurant.title}
          onChange={(e) => setRestaurant({ ...restaurant, title: e.target.value })}
          className="w-full mb-8 rounded-xl border border-gray-300 bg-white bg-opacity-90 px-5 py-3 text-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          placeholder="กรอกชื่อร้านอาหาร"
          required
        />

        {/* ช่องกรอกประเภทอาหาร */}
        <label className="block mb-3 font-semibold text-gray-700">ประเภทอาหาร (Type)</label>
        <input
          type="text"
          value={restaurant.type}
          onChange={(e) => setRestaurant({ ...restaurant, type: e.target.value })}
          className="w-full mb-8 rounded-xl border border-gray-300 bg-white bg-opacity-90 px-5 py-3 text-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          placeholder="เช่น อาหารไทย, อาหารญี่ปุ่น"
          required
        />

        {/* ช่องกรอก URL รูปภาพ */}
        <label className="block mb-3 font-semibold text-gray-700">URL รูปภาพ (Image URL)</label>
        <input
          type="text"
          value={restaurant.img}
          onChange={(e) => setRestaurant({ ...restaurant, img: e.target.value })}
          className="w-full mb-10 rounded-xl border border-gray-300 bg-white bg-opacity-90 px-5 py-3 text-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          placeholder="กรอก URL รูปภาพ"
          required
        />

        {/* ปุ่มบันทึก */}
        <button
          onClick={handleSubmit}
          className="w-full rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 shadow-lg transition"
        >
          บันทึกการเปลี่ยนแปลง
        </button>
      </div>
    </div>
  );
};

export default Update;
