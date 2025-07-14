// นำเข้า React และ Hook ที่ใช้
import React, { useState, useEffect } from "react";
import { useParams } from "react-router"; // ใช้ดึงพารามิเตอร์ id จาก URL

const Update = () => {
  // ดึง id จาก URL เช่น /update/3 => id = 3
  const { id } = useParams();

  // เก็บข้อมูลร้านอาหารที่จะแก้ไขไว้ใน state
  const [restaurant, setRestaurant] = useState({
    title: "",
    type: "",
    img: "",
  });

  // ดึงข้อมูลร้านอาหารจาก server เมื่อโหลด component นี้
  useEffect(() => {
    fetch("http://localhost:3000/restaurants/" + id)
      .then((res) => res.json())
      .then((response) => {
        setRestaurant(response); // เซตข้อมูลที่ได้เข้า state
      })
      .catch((err) => {
        console.log(err.message); // แสดง error ถ้ามี
      });
  }, [id]);

  // เมื่อกดปุ่ม "บันทึก" ให้ส่งข้อมูลใหม่ไปที่ server
  const handleSubmit = () => {
    fetch("http://localhost:3000/restaurants/" + id, {
      method: "PUT", // ใช้ PUT เพื่ออัปเดตข้อมูล
      headers: {
        "Content-Type": "application/json", // แจ้งว่าเราส่ง JSON
      },
      body: JSON.stringify(restaurant), // แปลงข้อมูลร้านอาหารเป็น JSON
    })
      .then(() => {
        window.location.href = "/"; // กลับไปหน้าแรกหลังอัปเดตเสร็จ
      })
      .catch((err) => console.log(err.message));
  };

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
        />

        {/* ช่องกรอกประเภทอาหาร */}
        <label className="block mb-3 font-semibold text-gray-700">ประเภทอาหาร (Type)</label>
        <input
          type="text"
          value={restaurant.type}
          onChange={(e) => setRestaurant({ ...restaurant, type: e.target.value })}
          className="w-full mb-8 rounded-xl border border-gray-300 bg-white bg-opacity-90 px-5 py-3 text-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          placeholder="เช่น อาหารไทย, อาหารญี่ปุ่น"
        />

        {/* ช่องกรอก URL รูปภาพ */}
        <label className="block mb-3 font-semibold text-gray-700">URL รูปภาพ (Image URL)</label>
        <input
          type="text"
          value={restaurant.img}
          onChange={(e) => setRestaurant({ ...restaurant, img: e.target.value })}
          className="w-full mb-10 rounded-xl border border-gray-300 bg-white bg-opacity-90 px-5 py-3 text-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          placeholder="กรอก URL รูปภาพ"
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
