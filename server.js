require("dotenv").config({ path: './utils/.env' });
const express = require('express');
const app = express();
const connectDB = require("./utils/db");
const port = 4000;

const authRouter = require("./routes/auth-router");
const ContactRouter = require("./routes/contact-router");

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/form", ContactRouter);

app.get('/', (req, res) => {
    res.send('API started');
});

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on ${port}`);
    });
});
