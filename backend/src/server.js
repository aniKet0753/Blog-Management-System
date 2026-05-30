import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
console.log("PORT =", process.env.PORT);

app.get('/',(req, res) => {
  res.send("hellow from server");
  console.log("hellow from server");
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  
  console.log(`server is running on PORT ${PORT}`);
})
