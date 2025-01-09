import express from "express";
import dotenv from "dotenv";
import bookroute from "./route/bookroute.js";
import userrout from "./route/userroute.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4002;

app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Use book routes
app.use("/book", bookroute);
app.use("/user",userrout);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
