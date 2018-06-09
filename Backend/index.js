"use strict";

let express = require("express");
let app = express();

let cache = true;

app.use(function(req, res, next) {
    console.log("==== Work with headers ====");
    res.header("Access-Control-Allow-Origin", "*");
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


app.get('/*', (request, response) => {
    console.log("----------------------------------------");
    console.log("GET");
    console.log("Url: " + request.url);
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

