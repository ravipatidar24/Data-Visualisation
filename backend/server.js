import express from "express";
import { Data1 } from "./controllers/test.js";
import cors from "cors";
import mongoose from "mongoose";
import { Data } from "./models/data.js";

const app = express();
const router = express.Router();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// MongoDB connection URL and database name
const url = "mongodb://localhost:27017";
const dbName = "json_data";

const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
// mongoose
//     .connect(`${url}/${dbName}`, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     })
//     .then(() => {
//         console.log("Connected to MongoDB");
//         app.listen(port, () => {
//             console.log(`Server listening on port ${port}`);
//         });
//     })
//     .catch((err) => {
//         console.error("Failed to connect to MongoDB:", err);
//     });

// router.get("/api", (req, res) => {
//     res.json({
//         message: "This is home page of API",
//     });
// });
router.get("/api/data_save", async(req, res) => {
    await Data.deleteMany({});
    Promise.all(
            Data1.map((data) => {
                const newData = new Data(data);
                return newData.save();
            })
        )
        .then(() => {
            res.status(201).json({ message: "Data saved successfully" });
        })
        .catch((err) => {
            console.error("Failed to save data:", err);
            res.status(500).json({ error: "Failed to save data" });
        });
});
router.post("/api/load_data", (req, res) => {
    const jsonData = req.body;
    const newData = new Data(jsonData);
    newData
        .save()
        .then(() => {
            res.status(201).json({ message: "Data saved successfully" });
        })
        .catch((err) => {
            console.error("Failed to save data:", err);
            res.status(500).json({ error: "Failed to save data" });
        });
});

router.get("/api/getdata", (req, res) => {
    res.status(200).json(Data1);
    // Data.find()
    //     .then((data) => {
    //         res.status(200).json(data);
    //     })
    //     .catch((err) => {
    //         console.error("Failed to fetch data:", err);
    //         res.status(500).json({ error: "Failed to fetch data" });
    //     });
});

app.use("/", router);