require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000; // ถ้าไฟล์ .env ไม่ใส่ค่า port ให้ใช้ port 3000

app.get("/", (req, res) => {
  res.send("hello world ");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
