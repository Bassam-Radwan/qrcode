// import inquirer from "inquirer";
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import qr from "qr-image";
import fs from "fs";
import bodyParser from "body-parser";

const port = 3000;
const app = express();
app.use(express.static('public'))

const _dirname = dirname(fileURLToPath(import.meta.url));
app.use(bodyParser.urlencoded({ extended: true }));

const date = new Date("14 July 2025");
let urlList = []
app.get("/", (req, res) => {
    res.render('index.ejs')
});
app.post("/gen", (req, res) => {
    if (req.body.url == '') {
        res.render('index.ejs')
    } else {
        setTimeout(() => {
            res.render("index.ejs", {
                urlList : true
            })
            const url = req.body.url
            const fileName = `qrCode.png`;
            let qr_svg = qr.image(url, { type: 'png' });
            const filePath = `${_dirname}/public/${fileName}`;
            qr_svg.pipe(fs.createWriteStream(filePath))
            
        },3000)
    }
})



app.listen(port, () => {
    console.log(`Running on port  ${port}`);
});
