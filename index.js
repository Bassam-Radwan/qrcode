// import inquirer from "inquirer";
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import qr from "qr-image";
import fs from "fs";
import bodyParser from "body-parser";

const port = 3000;
const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs")

const _dirname = dirname(fileURLToPath(import.meta.url));
app.use(bodyParser.urlencoded({ extended: true }));

const date = new Date("14 July 2025");
let urlList = [];
app.get("/start", (req, res) => {
    res.render("index.ejs");
});

// checking function
function check(url) {
    try {
        let myUrl = new URL(url);
        return true;
    } catch {
        return false;
    }
}
app.post("/gen", (req, res) => {
    if (req.body.url == "") {
        res.render("index.ejs");
    } else {
        if (check(req.body.url) == true) {
            setTimeout(() => {
                res.render("index.ejs", {
                    urlList: true,
                });
                const url = req.body.url;
                const fileName = `qrCode.png`;
                let qr_svg = qr.image(url, { type: "png" });
                const filePath = `${_dirname}/public/${fileName}`;
                qr_svg.pipe(fs.createWriteStream(filePath));
            }, 3000);
        } else {
            setTimeout(() => {
                res.render("index.ejs")
            },3000)
        }
    }
});

app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`);
});
