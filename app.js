const express = require("express")
const app = express()
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const userRouter = require("./src/routers/user.router");
const ticketRouter = require("./src/routers/ticket.router");
const tokenRouter = require("./src/routers/token.router");
const handleError = require("./src/utils/errorHandler");
require("dotenv").config();

// API security
app.use(helmet());

// handle CORS error
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("tiny"));

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})

if (process.env.NODE_ENV !== "production") {
    const mDb = mongoose.connection;
    mDb.on("open", () => {
        console.log("MongoDB is connected")
    })
    mDb.on("error", (error) => {
        console.log(error)
    })
    // Logger
    app.use(morgan("tiny"));
}

const port = process.env.PORT || 8000

// Use Routers
app.use("/v1/user", userRouter);
app.use("/v1/ticket", ticketRouter);
app.use("/v1/tokens", tokenRouter);

// app.use("/v1/user", userRouter);
// app.use("/v1/ticket", ticketRouter);
// app.use("/v1/tokens", tokenRouter);

app.get("/", (req, res) => {
    try {
        res.json("Get Request")
    } catch (error) {
        res.json(error)
    }
})

app.use((req,res, next) => {
    const error = new Error("Resources not found");
    error.status = 404;

    next(error);
})

app.use((error, req, res, next) => {
    handleError(error, res);
});

app.listen(port, () => {
    console.log(`API is ready on http://localhost:${ port }`);
});