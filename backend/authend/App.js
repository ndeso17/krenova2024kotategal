require("dotenv").config();
const port = process.env.PORT;
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const app = express();

const logs = require("./Middleware/logs");

app.use(
  cors({
    origin: ["https://krenova.stb", "https://api.krenova.stb"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Set-Cookie"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logs);

//! Routes
const routerAuth = require("./Routes/Auth");
app.use("/auth", routerAuth);

app.listen(port, () => {
  console.log(`Server berjalan pada port ${port}`);
});
