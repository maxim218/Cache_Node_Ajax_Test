"use strict";

let express = require("express");
let app = express();

let cache = false;

app.use(function(req, res, next) {
    console.log("==== Work with headers ====");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if(cache === false) {
        res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    } else {
        res.header("Cache-Control", "max-age=120");
    }
    next();
});


let port = process.env.PORT || 5001;
app.listen(port);
console.log("   ");
console.log("   ");
console.log("Server works on port " + port);
console.log("   ");
console.log("   ");

app.post('/*', (request, response) => {
    let bigString = "";
    request.on('data', (data) => {
        bigString += data;
    }).on('end', () => {
        const dataObj = JSON.parse(bigString);
        const a = parseInt(dataObj.a);
        const b = parseInt(dataObj.b);
        const summa = a + b;
        console.log("Summa (post): " + summa);
        response.status(200);
        response.end(summa.toString());
    });
});

app.get('/*', (request, response) => {
    console.log("----------------------------------------");
    console.log("GET");
    console.log("Url: " + request.url);

    if(request.url === "/getstylefile") {
        console.log("Send CSS file");
        response.status(200);
        response.sendfile("myfile.css");
        return;
    }

    const s = request.url.split("?")[1];
    const arr = s.split("&");
    let summa = 0;
    arr.forEach((value) => {
        const mass = value.split("=");
        summa += parseInt(mass[1]);
    });
    console.log("Summa: " + summa);
    response.status(200);
    response.end(summa.toString());
});

