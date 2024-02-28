const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
require("./passport-setup");
dotenv.config();

const { Server } = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);

const userRoute = require("./routes/userRoute");

const database = require("./config/database");
const cors = require("cors");
//db connect
database.connect();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(express.json());

//-----------------------------------------socket.io------------------------

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(`user connected ${socket.id} `);

  socket.on("send_message", (data) => {
    console.log("data" , data)
  });
});

// --------------------------------google AUTh ----------------------
app.use(passport.initialize());

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/" }),
  (req, res) => {
    console.log("req.user", req.user);
    const token = req.user;
    res.redirect(`http://localhost:3000/dashboard?token=${token}`);
    // return res.status(200).json({
    //   success: true,
    //   data:token
    // })
  }
);

app.use("/api/v1/auth", userRoute);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
