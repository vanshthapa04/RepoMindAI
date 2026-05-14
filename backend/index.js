const express = require('express');
const cors = require('cors');


require("dotenv").config();
const repoRoutes = require('./routes/repoRoute');
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api",repoRoutes);

app.get("/", (req,res) => {
    res.send("Backend running successfully");
});
const PORT = process.env.PORT || 8008;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
