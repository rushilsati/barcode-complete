import http from "http";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Server } from "socket.io";
import cors from "cors";

import Files from "./models/Files.js";
import Products from "./models/Products.js";

dotenv.config();

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log(`Server connected to database`);
  })
  .catch((error) => console.log(`${error}`));

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("scanned code", async (codeData) => {
    console.log("scanned code = ", codeData.value);

    const data = await Products.findOne(
      { barcode: codeData.value },
      { _id: 0, createOn: 0 }
    );

    socket.broadcast.emit("scanned code", {
      value: data?.barcode || codeData.value,
      type: codeData.type,
      productName: data?.productName || undefined,
      productPrice: data?.productPrice || undefined,
    });
    
  });
});

app.use(cors());
app.use(express.json());

app.post("/add-product", async (req, res) => {
  try {
    const { barcodeNumber, type, productName, productPrice } = req.body;
    if (barcodeNumber.length === 0)
      return res.status(400).json({ message: "barcode number is requried" });
    if (type.length === 0)
      return res.status(400).json({ message: "barcode type is requried" });
    if (productName.trim().length === 0)
      return res.status(400).json({ message: "Product name is requried" });
    if (!productPrice)
      return res.status(400).json({ message: "Product price is requried" });

    const barcodeExists = await Products.exists({ barcode: barcodeNumber });
    if (barcodeExists)
      return res.status(400).json({ message: "Barcode already exsist " });

    const barcode = new Products({
      barcode: barcodeNumber,
      productName,
      productPrice,
    });
    const savedCollection = await barcode.save();

    console.log(savedCollection);

    return res.status(201).json({ message: "Product Successfully Added" });
  } catch (error) {
    console.log(`${error}`);
    return res.sendStatus(500);
  }
});

app.post("/upload", async (req, res) => {
  try {
    const { name, data } = req.body;
    if (name.trim().length === 0)
      return res.status(400).json({ message: "Name is requried" });
    if (data.length === 0)
      return res.status(400).json({ message: "Data cannot be empty " });

    const nameExists = await Files.exists({ name });

    if (nameExists)
      return res.status(400).json({ message: "Name already exsist " });

    const file = new Files({
      name,
      data,
    });
    const savedCollection = await file.save();

    console.log(savedCollection);

    return res
      .status(201)
      .json({ message: "File Successfully Saved In Server" });
  } catch (error) {
    console.log(`${error}`);
    return res.sendStatus(500);
  }
});

app.get("/file", async (req, res) => {
  try {
    const files = await Files.find({}, { _id: 0, createdOn: 0 });

    if (!files) return res.status("404").json({ message: "File Not Found" });

    return res.status(200).json({
      message: files,
    });
  } catch (error) {
    console.log(`${error}`);
    return res.sendStatus(500);
  }
});

app.get("/file/:name", async (req, res) => {
  try {
    const name = req.params.name;
    if (name.trim().length === 0)
      return res.status(400).json({ message: "Name is requried" });

    const file = await Files.findOne({ name }, { _id: 0, createdOn: 0 });

    if (!file) return res.status("404").json({ message: "File Not Found" });

    return res.status(200).json({
      message: {
        name: file.name,
        data: file.data,
      },
    });
  } catch (error) {
    console.log(`${error}`);
    return res.sendStatus(500);
  }
});

const port = process.env.PORT || 5000;

server.listen(5000);
