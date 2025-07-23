import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // *** เพิ่ม: นำเข้า cors ***

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// *** เพิ่ม: ใช้ cors middleware ก่อน routes ทั้งหมด ***
app.use(cors()); // อนุญาตทุก origin (สำหรับการพัฒนา)
// ถ้าต้องการระบุ origin ที่แน่นอน:
// app.use(cors({ origin: 'http://localhost:5173' })); // ให้ตรงกับพอร์ต Frontend ของคุณ

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Restaurant Restful API");
});

// use routers
import restaurantRouter from "./routers/restaurant.router.js"; // ย้าย import มาไว้หลัง app.use(cors())
app.use("/api/v1/restaurant", restaurantRouter);

app.listen(PORT, () => {
  console.log("Listening to http://localhost:" + PORT);
});
