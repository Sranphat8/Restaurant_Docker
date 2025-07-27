// นำเข้า React (จำเป็นเมื่อเขียน JSX)
import React from "react";

const Navbar = () => {
  return (
    // Header หลักของ Navbar
    // จัดให้แสดงอยู่ด้านบนสุดของหน้าจอ และมีความโปร่งใส / blur 
    <header className="fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border border-gray-100 bg-white/80 py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
      
      {/* Container ของ Navbar */}
      <div className="px-4">
        <div className="flex items-center justify-between">
          
          {/* โลโก้หรือชื่อเว็บ - อยู่ทางซ้าย */}
          <div
            className="flex shrink-0 cursor-pointer"
            onClick={() => (window.location.href = "/")} // คลิกแล้วกลับหน้าหลัก
          >
            <span className="font-extrabold text-gray-900 text-lg">
              Grab Restaurant
            </span>
          </div>

          {/* เมนูหลัก - แสดงเฉพาะบนหน้าจอขนาด md (กลาง) ขึ้นไป */}
          <nav className="hidden md:flex md:items-center md:justify-center md:gap-5">
            
            {/* ปุ่มเพิ่มร้านอาหาร */}
            <button
              onClick={() => (window.location.href = "/add")} // ลิงก์ไปหน้า Add
              className="inline-block rounded-lg px-3 py-1 text-sm font-semibold text-gray-900 bg-indigo-100 hover:bg-indigo-200 transition-all duration-200 shadow-sm"
            >
              Add Restaurant
            </button>

            {/* ปุ่มค้นหา - ตอนนี้ยังไม่เปิดใช้งาน (แสดง Coming Soon) */}
            <button
              onClick={() => alert("Coming Soon")}
              className="inline-block rounded-lg px-3 py-1 text-sm font-semibold text-gray-900 hover:bg-gray-100 transition-all duration-200"
            >
              Search
            </button>
          </nav>

          {/* ปุ่มด้านขวา - สมัครสมาชิก / เข้าสู่ระบบ */}
          <div className="flex items-center justify-end gap-3">
            
            {/* ปุ่ม Register - ซ่อนในจอเล็ก แสดงในจอ sm ขึ้นไป */}
            <button
              onClick={() => alert("Register clicked")}
              className="hidden sm:inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50"
            >
              Register
            </button>

            {/* ปุ่ม Login - แสดงทุกขนาดหน้าจอ */}
            <button
              onClick={() => alert("Login clicked")}
              className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

// ส่งออก Component Navbar นี้ให้ใช้งานในไฟล์อื่นได้
export default Navbar;
