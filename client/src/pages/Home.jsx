// นำเข้า React Hook ที่จำเป็น และ component ที่ใช้
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2"; // ใช้แสดง popup แจ้งเตือน
import Navbar from "../components/Navbar"; // Navbar ด้านบน
import Restaurants from "../components/Restaurants"; // Component แสดงรายการร้านอาหาร

const Home = () => {
  const [restaurants, setRestaurants] = useState([]); // เก็บข้อมูลร้านอาหารทั้งหมด
  const [keyword, setKeyword] = useState(""); // เก็บคำที่ใช้ค้นหา

  // ใช้ useEffect ดึงข้อมูลร้านอาหารจาก API เมื่อโหลดหน้า
  useEffect(() => {
    fetch("http://localhost:3000/restaurants")
      .then((res) => res.json())
      .then((data) => setRestaurants(data)) // เซตข้อมูลเข้า state
      .catch((err) => console.error(err)); // ถ้า error ให้แสดงใน console
  }, []);

  // ลบข้อมูลร้านอาหาร
  const handleDelete = (id) => {
    // ยืนยันก่อนลบโดยใช้ SweetAlert2
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      customClass: {
        popup: "rounded-xl", // เพิ่มความโค้งของ popup
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // ส่งคำขอ DELETE ไปที่ API
        fetch(`http://localhost:3000/restaurants/${id}`, { method: "DELETE" })
          .then(() => {
            // ลบออกจาก state (ไม่ต้อง reload)
            setRestaurants(restaurants.filter((item) => item.id !== id));
            // แจ้งเตือนลบสำเร็จ
            Swal.fire({
              title: "Deleted!",
              text: "Your restaurant has been deleted.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
          })
          .catch((err) => console.error(err));
      }
    });
  };

  // ฟิลเตอร์ร้านอาหารตาม keyword ที่ผู้ใช้พิมพ์
  const filtered = restaurants.filter(
    (r) =>
      r.title.toLowerCase().includes(keyword.toLowerCase()) || // ค้นหาด้วยชื่อ
      r.type.toLowerCase().includes(keyword.toLowerCase())     // หรือประเภท
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar /> {/* แถบนำทางด้านบน */}

      <main className="container mx-auto px-4 pt-28 pb-12 max-w-5xl">
        <h1 className="text-4xl font-extralight mb-8 text-gray-900 text-center tracking-wide select-none">
          All Restaurants
        </h1>

        {/* กล่องค้นหาร้านอาหาร */}
        <form onSubmit={(e) => e.preventDefault()} className="max-w-xl mx-auto mb-10">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <div className="relative">
            {/* ไอคอนแว่นขยาย */}
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* ช่องพิมพ์ค้นหา */}
            <input
              type="search"
              id="search"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder="Search restaurants..."
            />
          </div>
        </form>

        {/* แสดงรายการร้านอาหาร (ถ้ามีข้อมูล) */}
        {filtered.length > 0 ? (
          <Restaurants restaurants={filtered} onDelete={handleDelete} />
        ) : (
          // ถ้าไม่มีข้อมูลที่ค้นหา
          <p className="text-center text-gray-500 mt-10 text-lg">No restaurants found.</p>
        )}
      </main>
    </div>
  );
};

export default Home;
