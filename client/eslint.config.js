/*
 * ไฟล์ eslint.config.js นี้เป็นการกำหนดค่า (configuration) สำหรับ ESLint
 * ซึ่งเป็นเครื่องมือสำหรับ "Linting" โค้ด JavaScript และ JSX (ใน React)
 * เป้าหมายหลักของ ESLint คือการ:
 * 1. ตรวจหาข้อผิดพลาดที่อาจเกิดขึ้นในโค้ด (เช่น การใช้ตัวแปรที่ไม่ได้ประกาศ)
 * 2. บังคับใช้รูปแบบการเขียนโค้ดที่สอดคล้องกัน (coding style)
 * 3. ช่วยให้โค้ดมีคุณภาพดีขึ้น และลดโอกาสเกิดบั๊ก
 *
 * ไฟล์นี้ใช้ระบบการกำหนดค่าแบบใหม่ของ ESLint ที่เรียกว่า "Flat Config" (เป็น Array ของ Configuration Objects)
 * ซึ่งมาแทนที่ระบบเก่า (.eslintrc.* files) ในอนาคต
 */

// นำเข้ากฎและค่าแนะนำพื้นฐานของ JavaScript จาก ESLint
// js.configs.recommended จะมีกฎพื้นฐานที่ควรใช้กับ JavaScript ทั่วไป
import js from '@eslint/js';

// นำเข้าอ็อบเจกต์ 'globals' ซึ่งช่วยในการกำหนด Global Variables (ตัวแปรส่วนกลาง)
// เช่น 'browser' ที่จะบอก ESLint ว่าโค้ดนี้รันในสภาพแวดล้อมของเบราว์เซอร์
import globals from 'globals';

// นำเข้า Plugin สำหรับ React Hooks
// eslint-plugin-react-hooks จะมีกฎเฉพาะที่ช่วยให้คุณใช้ React Hooks ได้ถูกต้องตามข้อกำหนด (Rules of Hooks)
import reactHooks from 'eslint-plugin-react-hooks';

// นำเข้า Plugin สำหรับ React Refresh
// eslint-plugin-react-refresh เป็น Plugin ที่ใช้ร่วมกับ Vite หรือ Webpack dev server
// เพื่อช่วยในการตรวจสอบว่า Component ของ React สามารถทำ Fast Refresh ได้ถูกต้องหรือไม่
// (ป้องกันปัญหาเมื่อมีการแก้ไขโค้ดแล้วหน้าเว็บไม่ Update หรือมี Error)
import reactRefresh from 'eslint-plugin-react-refresh';

// ส่งออก Array ของ Configuration Objects
// แต่ละ Object ใน Array นี้คือชุดของกฎและการตั้งค่าที่ ESLint จะนำไปใช้
export default [
  // 1. Configuration Object แรก: สำหรับกำหนดไฟล์ที่จะละเว้น (ignore)
  {
    // ignores: Array ของ glob patterns สำหรับไฟล์/โฟลเดอร์ที่ ESLint จะไม่ตรวจสอบ
    // 'dist' คือโฟลเดอร์ build output ที่ ESLint ไม่จำเป็นต้องตรวจสอบ
    ignores: ['dist'],
  },
  // 2. Configuration Object ที่สอง: การตั้งค่าหลักสำหรับไฟล์ JavaScript และ JSX
  {
    // files: Array ของ glob patterns ที่ระบุว่าการตั้งค่าใน Object นี้จะถูกนำไปใช้กับไฟล์ใดบ้าง
    // '**/*.{js,jsx}' หมายถึงไฟล์ทั้งหมดที่มีนามสกุล .js หรือ .jsx ในทุกๆ Sub-directory
    files: ['**/*.{js,jsx}'],

    // languageOptions: การตั้งค่าที่เกี่ยวข้องกับ JavaScript Language
    languageOptions: {
      // ecmaVersion: กำหนดเวอร์ชันของ ECMAScript (JavaScript) ที่ ESLint ควรรองรับ
      // 2020: รองรับฟีเจอร์ของ ES2020
      // 'latest': สามารถใช้ 'latest' แทนได้ หมายถึงเวอร์ชันล่าสุดที่ ESLint รองรับ
      ecmaVersion: 2020,

      // globals: กำหนด Global Variables ที่ ESLint ควรรู้จัก เพื่อไม่ให้แจ้งเตือนว่าเป็นตัวแปรที่ไม่ได้ประกาศ
      // globals.browser: รวม Global Variables มาตรฐานที่พบในสภาพแวดล้อมของเบราว์เซอร์ (เช่น window, document, console, alert)
      globals: globals.browser,

      // parserOptions: ตัวเลือกเพิ่มเติมที่ส่งไปยัง Parser ของ JavaScript
      parserOptions: {
        // ecmaVersion: 'latest' (หรือเวอร์ชันเฉพาะ): กำหนดเวอร์ชัน ECMAScript สำหรับ Parser
        ecmaVersion: 'latest',
        // ecmaFeatures: กำหนดคุณสมบัติของภาษาเพิ่มเติมที่ Parser ควรเปิดใช้งาน
        ecmaFeatures: {
          jsx: true, // เปิดใช้งานการรองรับ JSX (สำหรับ React)
        },
        // sourceType: กำหนดประเภทของโค้ด JavaScript
        // 'module': สำหรับโค้ดที่เป็น ES Modules (ใช้ import/export)
        sourceType: 'module',
      },
    },

    // plugins: กำหนด Plugins ของ ESLint ที่จะใช้งาน
    plugins: {
      // 'react-hooks': ลงทะเบียน eslint-plugin-react-hooks ภายใต้ชื่อ 'react-hooks'
      'react-hooks': reactHooks,
      // 'react-refresh': ลงทะเบียน eslint-plugin-react-refresh ภายใต้ชื่อ 'react-refresh'
      'react-refresh': reactRefresh,
    },

    // rules: กำหนดกฎของ ESLint ที่จะใช้ และระดับความรุนแรงของกฎนั้นๆ
    rules: {
      // ...js.configs.recommended.rules: รวมกฎทั้งหมดที่แนะนำโดย ESLint สำหรับ JavaScript ทั่วไป
      // (เช่น no-undef, no-const-assign)
      ...js.configs.recommended.rules,
      // ...reactHooks.configs.recommended.rules: รวมกฎทั้งหมดที่แนะนำโดย eslint-plugin-react-hooks
      // (เช่น rules of hooks: checks useEffect dependencies, ensures hooks are called conditionally etc.)
      ...reactHooks.configs.recommended.rules,

      // 'no-unused-vars': กำหนดกฎสำหรับการใช้ตัวแปรที่ไม่ได้ใช้
      // ['error', { varsIgnorePattern: '^[A-Z_]' }]:
      // - 'error': ถ้ามีตัวแปรที่ไม่ได้ใช้ จะแจ้งเป็น Error (ทำให้ build ไม่ผ่าน)
      // - { varsIgnorePattern: '^[A-Z_]' }: ยกเว้นตัวแปรที่ขึ้นต้นด้วยตัวพิมพ์ใหญ่หรือ _ (มักใช้กับ Component หรือค่าคงที่ Global)
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],

      // 'react-refresh/only-export-components': กฎเฉพาะสำหรับ React Refresh
      // [ 'warn', { allowConstantExport: true } ]:
      // - 'warn': ถ้ามี Component ที่ไม่ถูก export ตามรูปแบบที่ React Refresh ต้องการ จะแจ้งเป็น Warning
      // - { allowConstantExport: true }: อนุญาตให้ export ค่าคงที่ (เช่น const MyComponent = () => {...}; export const MyComponent;)
      //   ซึ่งบางครั้งอาจจำเป็นสำหรับการทำ Fast Refresh
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
];
