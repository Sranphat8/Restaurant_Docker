import React, { useState } from 'react';
import Swal from 'sweetalert2'; // สำหรับแสดงข้อความแจ้งเตือน

// กำหนด URL ของ Backend API สำหรับการเข้าสู่ระบบ
const API_LOGIN_URL = 'http://localhost:5000/api/v1/auth/login'; // ตรวจสอบให้แน่ใจว่าตรงกับ Backend ของคุณ

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // ตรวจสอบข้อมูลไม่ให้ว่างเปล่า
        if (!formData.username || !formData.password) {
            Swal.fire({
                icon: 'error',
                title: 'ข้อมูลไม่ครบถ้วน',
                text: 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน',
                customClass: { popup: "rounded-xl" },
            });
            return;
        }

        try {
            const response = await fetch(API_LOGIN_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            // สมมติว่า Backend ส่ง token มาใน field ชื่อ 'token'
            const token = result.token; 

            if (token) {
                localStorage.setItem('jwtToken', token); // เก็บ JWT ไว้ใน localStorage
                Swal.fire({
                    icon: 'success',
                    title: 'เข้าสู่ระบบสำเร็จ!',
                    text: 'ยินดีต้อนรับ',
                    showConfirmButton: false,
                    timer: 2000,
                    customClass: { popup: "rounded-xl" },
                }).then(() => {
                    window.location.href = '/'; // นำทางกลับหน้าหลัก
                });
            } else {
                throw new Error('ไม่ได้รับ Token จากเซิร์ฟเวอร์');
            }

        } catch (error) {
            console.error('Error during login:', error);
            Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด!',
                text: `ไม่สามารถเข้าสู่ระบบได้: ${error.message}`,
                customClass: { popup: "rounded-xl" },
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
                <h2 className="text-3xl font-bold text-center text-gray-800">เข้าสู่ระบบ</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">ชื่อผู้ใช้</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">รหัสผ่าน</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        เข้าสู่ระบบ
                    </button>
                </form>
                <p className="text-center text-sm text-gray-600">
                    ยังไม่มีบัญชี?{' '}
                    <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                        สมัครสมาชิกที่นี่
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
