// นำเข้า React และ Card component
import React from "react";
import Card from "./Card";

// สร้าง Component Restaurants ซึ่งรับ props: restaurants และ onDelete
const Restaurants = ({ restaurants, onDelete }) => {
  return (
    // Container ใช้ flex-wrap เพื่อแสดงหลายร้านแบบ responsive
    <div className="flex flex-wrap justify-center gap-4">
      {restaurants &&
        restaurants.map((restaurant) => (
          // วนลูปแต่ละร้านอาหารแล้วส่งข้อมูลไปให้ Card component แสดง
          <Card
            key={restaurant.id}           // คีย์สำหรับ React ช่วยระบุความแตกต่างของแต่ละ Card
            id={restaurant.id}            // ส่ง id ไปให้ Card ใช้ในการลบหรือแก้ไข
            img={restaurant.img}          // URL รูปภาพของร้าน
            title={restaurant.title}      // ชื่อร้านอาหาร
            type={restaurant.type}        // ประเภทของอาหาร (ชาบู, ปิ้งย่าง ฯลฯ)
            onDelete={onDelete}           // ฟังก์ชันลบร้าน (มาจากหน้า Home)
          />
        ))}
    </div>
  );
};

// ส่งออก component เพื่อให้ใช้ที่อื่นได้
export default Restaurants;
