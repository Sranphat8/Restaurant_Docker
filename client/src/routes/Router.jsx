// นำเข้า React 
import React from "react";

// นำเข้า createBrowserRouter จาก react-router (v7)
import { createBrowserRouter } from "react-router";

// นำเข้าแต่ละหน้าที่ใช้ในระบบ
import Add from "../pages/Add";         // หน้าเพิ่มข้อมูลร้านอาหาร
import Home from "../pages/Home";       // หน้าแสดงรายชื่อร้านอาหารทั้งหมด
import Update from "../pages/Update";   // หน้าแก้ไขข้อมูลร้านอาหาร

// สร้าง Router โดยกำหนดเส้นทางของแต่ละหน้า
const router = createBrowserRouter([
  {
    // เส้นทางหน้าแรกของแอป (http://localhost:5173/)
    path: "/",
    element: <Home />, // ใช้ Component Home
  },
  {
    // เส้นทางสำหรับเพิ่มร้านอาหารใหม่ (http://localhost:5173/add)
    path: "/add",
    element: <Add />, // ใช้ Component Add
  },
  {
    // เส้นทางสำหรับแก้ไขร้านอาหาร โดยต้องระบุ id ยกตัวอย่างเช่น (http://localhost:5173/update/1)
    path: "/update/:id", // :id คือ dynamic parameter สำหรับแต่ละร้าน
    element: <Update />, // ใช้ Component Update
  },
]);

// ส่งออก router เพื่อใช้ใน main.jsx หรือ App.jsx
export default router;
