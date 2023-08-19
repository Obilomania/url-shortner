const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const urlRoute = require("./routes/urlRoute");
const errorHandler = require("./MiddleWares/errorMiddleware");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);
app.use("/api/url", urlRoute);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running in port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
