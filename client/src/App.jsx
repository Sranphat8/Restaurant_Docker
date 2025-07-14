/*
 * ไฟล์ App.js (Component หลักของแอปพลิเคชัน)
 *
 * ไฟล์นี้เป็นหัวใจสำคัญของแอปพลิเคชัน React ของเรา
 * มันทำหน้าที่หลักๆ คือ:
 * 1. นำเข้า Component ย่อยๆ อื่นๆ (เช่น Navbar, Restaurants) มาประกอบรวมกัน
 * 2. จัดการสถานะ (State) ของข้อมูลในแอปพลิเคชัน เช่น ข้อมูลร้านอาหารที่ดึงมาจาก API
 * 3. ดึงข้อมูลร้านอาหารจากเซิร์ฟเวอร์ (API) เมื่อแอปพลิเคชันโหลดขึ้นมาครั้งแรก
 * 4. แสดงผลโครงสร้างหลักของหน้าเว็บ รวมถึงแถบนำทาง (Navbar), หัวข้อ, ช่องค้นหา (จำลอง) และรายการร้านอาหาร
 *
 * พูดง่ายๆ คือ ไฟล์นี้คือ 'ตัวจัดการหลัก' ที่คอยประสานงานและแสดงผลข้อมูลสำคัญของแอปพลิเคชันทั้งหมด
 */

// นำเข้า React และ Hooks ที่จำเป็น:
// useEffect: ใช้สำหรับจัดการผลข้างเคียง (side effects) เช่น การเรียก API
// useState: ใช้สำหรับจัดการสถานะ (state) หรือข้อมูลที่เปลี่ยนแปลงได้ใน Component
import React, { useEffect, useState } from 'react';

// นำเข้า Navbar Component จากไฟล์ './components/Navbar'
// Navbar คือส่วนแถบนำทางด้านบนของหน้าเว็บ
import Navbar from './components/Navbar';

// นำเข้า Restaurants Component จากไฟล์ './components/Restaurants'
// Restaurants คือส่วนที่จะแสดงรายการร้านอาหารทั้งหมด
import Restaurants from './components/Restaurants';

// กำหนด App Component ซึ่งเป็น Function Component หลักของแอปพลิเคชัน
const App = () => {
  // กำหนด state 'data' ด้วย useState Hook
  // 'data' จะใช้เก็บข้อมูลร้านอาหารที่ดึงมาจาก API โดยมีค่าเริ่มต้นเป็น array ว่างเปล่า
  // setData เป็นฟังก์ชันสำหรับอัปเดตค่า 'data'
  const [data, setData] = useState([]);

  // useEffect Hook จะถูกเรียกเมื่อ Component ถูก render ครั้งแรก (และเมื่อ dependencies เปลี่ยนแปลง)
  // ในที่นี้ dependencies array [] ว่างเปล่า หมายความว่าโค้ดนี้จะถูกเรียกเพียงครั้งเดียวหลังจาก render ครั้งแรก
  useEffect(() => {
    // ใช้ fetch API เพื่อดึงข้อมูลร้านอาหารจาก URL ที่ระบุ
    // 'http://localhost:3000/restaurants' คือที่อยู่ของ API ที่ส่งข้อมูลร้านอาหารมา
    fetch('http://localhost:3000/restaurants')
      // เมื่อได้รับ response กลับมา ให้แปลง response นั้นเป็น JSON
      .then((res) => res.json())
      // เมื่อแปลงเป็น JSON เรียบร้อยแล้ว ให้นำข้อมูลที่ได้ (data) ไปเก็บไว้ใน state 'data' โดยใช้ setData
      .then((data) => setData(data))
      // หากเกิดข้อผิดพลาดในการ fetch ข้อมูล (เช่น ไม่สามารถเชื่อมต่อ API ได้)
      // ให้จับ error นั้นและแสดงข้อความ error ใน console
      .catch((err) => console.error(err));
  }, []); // [] หมายความว่า useEffect จะทำงานแค่ครั้งเดียวเมื่อ Component mount

  // ส่วนนี้คือ JSX ที่จะถูก render ออกมาเป็น HTML บนหน้าเว็บ
  return (
    // <>...</> คือ React Fragment ใช้สำหรับรวม Component หลายๆ ตัวเข้าด้วยกันโดยไม่ต้องมี div ครอบ
    // ทำให้ไม่สร้าง element HTML เพิ่มเติมโดยไม่จำเป็น
    <>
      {/* แสดงผล Navbar Component */}
      <Navbar />

      {/* แสดงผลหัวข้อ "Grab Restaurant" ตรงกลางหน้าจอ */}
      <div className="text-center text-2xl font-bold my-6">Grab Restaurant</div>

      {/*
        ส่วนของช่องค้นหาและปุ่มค้นหา
        การออกแบบนี้จำลองมาเพื่อให้ตรงกับรูปภาพ แต่ยังไม่มีฟังก์ชันการค้นหาจริง
        หากต้องการเพิ่มฟังก์ชันค้นหา จะต้อง:
        1. เพิ่ม state สำหรับเก็บค่าใน input (เช่น const [searchTerm, setSearchTerm] = useState('');)
        2. เพิ่ม onChange handler ใน input เพื่ออัปเดต searchTerm
        3. เพิ่ม onClick handler ใน button เพื่อเรียกฟังก์ชันค้นหา
        4. กรองข้อมูล 'data' ตาม 'searchTerm' ก่อนส่งไปให้ Restaurants Component
      */}
      <div className="flex justify-center mb-8 px-4">
        <input
          type="text"
          placeholder="ค้นหาร้านอาหาร..."
          className="input input-bordered input-md w-full max-w-md"
        />
        <button className="btn btn-primary ml-2">ค้นหา</button>
      </div>

      {/*
        แสดงผล Restaurants Component
        และส่งข้อมูลร้านอาหารที่ดึงมาจาก API (ใน state 'data') ผ่าน prop ชื่อ 'restaurants'
        เพื่อให้ Restaurants Component สามารถนำไปแสดงผลได้
      */}
      <Restaurants restaurants={data} />
    </>
  );
};

// ส่งออก App Component เพื่อให้ไฟล์อื่นสามารถนำไปใช้งานได้
export default App;
