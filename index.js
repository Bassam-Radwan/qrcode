// import inquirer from "inquirer";
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import qr from "qr-image";
import fs from "fs";
import bodyParser from "body-parser";

const port = 3000;
const app = express();
app.set("view engine", "ejs")
app.use(express.static('public'))

const _dirname = dirname(fileURLToPath(import.meta.url));
app.use(bodyParser.urlencoded({ extended: true }));


let urlList = []
app.get("/start", (req, res) => {
    res.render('index')
});
app.post("/gen", (req, res) => {
    console.log(req.body.url);
    if (req.body.url == '') {
        console.log('Please fill in the form');
        res.render('index')
    } else {
        res.render("index.ejs", {
            urlList: true
        })
        const url = req.body.url
        const fileName = `qrCode.png`;
        let qr_svg = qr.image(url, { type: 'png' });
        const filePath = `${_dirname}/public/${fileName}`;
        qr_svg.pipe(fs.createWriteStream(filePath))
    }
})



app.listen(port, () => {
    console.log(`Running on port  ${port}`);
});
