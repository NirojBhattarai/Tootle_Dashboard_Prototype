const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

//Deifining Routes for Endpoints

app.use("/api/adduser", require("./routes/adduser"));
app.use("/api/updateuser", require("./routes/updateuser"));
app.use("/api/deleteuser", require("./routes/deleteuser"));
app.use("/api/viewuser", require("./routes/viewuser"));

app.listen(5000, () => {
  console.log("Server is starting on port 5000");
});
