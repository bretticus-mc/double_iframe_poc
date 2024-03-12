const express = require('express');
const cookie = require('cookie');
const cookieParser = require('cookie-parser');
const path = require('path');
const HTTPS = require("https");
const FS = require("fs");
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

HTTPS.createServer({
    key: FS.readFileSync("connect-workspace.com+1-key.pem"),
    cert: FS.readFileSync("connect-workspace.com+1.pem")
}, app).listen(443, () => {
    console.log("Listening https at :443...");
});


app.get('/ping', (req, res) => {
    res.send('welcome to a simple HTTP cookie server');
});

// Partitioned Cookie with HTTP Only attribute
app.get('/setunpartitionedcookie', (req, res) => {
    console.log("/setunpartitionedcookie called");
    res.setHeader('Set-Cookie', cookie.serialize('unpartitioned-no-http-cookie', 'auth_info_here', {
        httpOnly: false,
        sameSite: 'none',
        secure: true,
        partitioned: false,
    }));
    res.send('Cookie have been saved successfully');
});

// Unpartitioned Cookie without httpOnly
app.get('/setunpartitionedhttpcookie', (req, res) => {
    console.log("/setunpartitionedhttpcookie called");
    res.setHeader('Set-Cookie', cookie.serialize('unpartitioned-http-cookie', 'auth_info_here', {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        partitioned: false,
    }));
    res.send('Cookie have been saved successfully');
});

// Partitioned Cookie without HTTP Only attribute
app.get('/setpartitioncookie', (req, res) => {
    console.log("/setpartitioncookie called");
    res.setHeader('Set-Cookie', cookie.serialize('partitioned-no-http-cookie', 'auth_info_here', {
        httpOnly: false,
        sameSite: 'none',
        secure: true,
        partitioned: true,
    }));
    res.send('Cookie have been saved successfully');
});

app.get('/setpartitionedhttpcookie', (req, res) => {
    console.log("/setpartitionedhttpcookie called");

    res.setHeader('Set-Cookie', cookie.serialize('partitioned-cookie', 'auth_info_here', {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        partitioned: true,
    }));

    res.send('Cookie have been saved successfully');
});

// Clear all cookies
app.get('/logout', (req, res) => {
    res.clearCookie('partitioned-no-http-cookie');
    res.clearCookie('unpartitioned-no-http-cookie');
    res.clearCookie('unpartitioned-http-cookie');
    res.clearCookie('partitioned-cookie');
    res.send('Cookie have been saved successfully');
});

app.post("/auth", (req, res) => {
    console.log("/auth called");
    const cookies = req.cookies;

    if (cookies && Object.keys(cookies).length) {
        res.json({ message: 'Cookies received', cookies });
    } else {
        res.sendStatus(400);
    }
    ;

})


app.get('/', cors(), function (req, res) {
    res.sendFile('index.html');
});

app.listen(8001, () => console.log('The server is running http port 8001...'));
