"use strict";

let express = require("express");
let app = express();

app.use(function(req, res, next) {
    console.log("==== Application Use Block ====");
    // allow all clients
    res.header("Access-Control-Allow-Origin", "*");
    // allow headers
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

function setCacheHeaders(res, cache) {
    if(cache === false) {
        res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    } else {
        res.header("Cache-Control", "max-age=120");
    }
}


let port = process.env.PORT || 5001;
app.listen(port);
console.log("   ");
console.log("   ");
console.log("Server works on port " + port);
console.log("   ");
console.log("   ");

app.post('/*', (request, response) => {
    console.log("----------------------------------------");
    console.log("POST");
    console.log("Url: " + request.url);

    let bigString = "";
    request.on('data', (data) => {
        bigString += data;
    }).on('end', () => {
        console.log("Body: " + bigString);

        const operation = request.url.toString().split("/")[1];
        console.log("Operation: " + operation);

        if(operation === "postsumma") {
            const dataObj = JSON.parse(bigString);
            const a = parseInt(dataObj.a);
            const b = parseInt(dataObj.b);
            const summa = a + b;
            console.log("Summa (post): " + summa);
            response.status(200);
            response.end(summa.toString());
            return;
        }

        if(operation === "postraznost") {
            const dataObj = JSON.parse(bigString);
            const a = parseInt(dataObj.a);
            const b = parseInt(dataObj.b);
            const raznost = a - b;
            console.log("Raznost (post): " + raznost);
            response.status(200);
            response.end(raznost.toString());
            return;
        }

        response.status(200);
        response.end("OPERATION_NOT_FOUND");
    });
});

app.get('/*', (request, response) => {
    console.log("----------------------------------------");
    console.log("GET");
    console.log("Url: " + request.url);

    const operation = request.url.toString().split("/")[1];
    console.log("Operation: " + operation);

    if(operation === "getstylefile") {
        console.log("Send CSS file");
        response.status(200);
        response.sendfile("myfile.css");
        return;
    }

    if(operation === "numbersumma") {
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
        return;
    }

    response.status(200);
    response.end("OPERATION_NOT_FOUND");
});
