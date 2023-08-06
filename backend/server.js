const express = require("express");
const notes = require("./data/notes");
const dotenv = require('dotenv');
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes.js");
const noteRoutes = require("./routes/noteRoutes.js");
const { notFound, errorHandler } = require("./middlewares/errorMiddlewares");
const cors = require('cors');
const path = require("path");

const app = express(); // main thing
dotenv.config();
connectDB();
app.use(express.json()); // to accept json data
app.use(cors());
app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);


// --------------deployment---------------


__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname,"/frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}
    
// --------------deployment---------------

app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 5000;
 
app.listen(PORT, console.log(`Server started on PORT ${PORT}`));
