const express = require("express");
const app = express();
const cors = require("cors");


//MiddleWare

app.use(express.json());
app.use(cors());

//Routes
app.use("/auth", require("./routes/jwtAuth"));

app.use("/dashboard",require("./routes/dashboard")); 

app.listen(5000, () => 
{
    console.log("Server live");
}
);