const express = require("express");
const fs = require("fs");

const app = express();

app.get(["/","/index","/index.html"], function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/video", function (req, res) {
    // Ensure there is a range given for the video
    // const range = req.headers.range;
    // if (!range) {
    //   res.status(400).send("Requires Range header");
    // }

    // get video stats
    const videoPath = "./video/cat.mp4";
    const videoSize = fs.statSync(videoPath).size;

    // Stat the video file to determine its length.
    fs.stat(videoPath, (err, stat) => {
        if (err) {
            console.error(`File stat error for ${videoPath}.`);
            console.error(err);
            res.sendStatus(500);
            return;
        }

        // Set content-length so the browser knows
        // how much data the browser is receiving.
        res.setHeader("content-length", stat.size);

        // Parse Range
        // Example: "bytes=32324-"
        // const CHUNK_SIZE = 10 ** 6; // 1MB
        // const start = Number(range.replace(/\D/g, ""));
        // const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    
        // Create headers
        // const contentLength = end - start + 1;
        // const headers = {
        // "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        // "Accept-Ranges": "bytes",
        // "Content-Length": contentLength,
        // "Content-Type": "video/mp4",
        // };
    
        // HTTP Status 206 for Partial Content
        // res.writeHead(206, headers);
    
        // create video read stream for this particular chunk
        // const videoStream = fs.createReadStream(videoPath, { start, end });
        const videoStream = fs.createReadStream(videoPath);

        // Stream the video chunk to the client
        videoStream.pipe(res);
    });
});


// ERROR 404 HANDLING 
app.use(function(req, res, next) {
    res.status(404).send("<h1>ERROR 404</h1><h2>Page Not Found</h2>");
});

app.listen(8000, function () {
  console.log("Listening on port 8000!");
});