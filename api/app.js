import express from "express";
import cors from "cors";
import {
  getAllCelulares,
  createCelular,
  deleteCelular,
  updateCelular,
} from "./controller/celularController.js";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.get("/celulares", getAllCelulares);
app.post("/celulares", createCelular);
app.delete("/celulares/:id", deleteCelular);
app.put("/celulares/:id", updateCelular);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
