const fs = require("fs");
const { Transform } = require("stream");

const readStream = fs.createReadStream("./access.log", "utf8");
const writeStream89 = fs.createWriteStream("./89.123.1.41_request.log",  {
    flags: "a",
    encoding: "utf8"
});
const writeStream34 = fs.createWriteStream("./34.48.240.111_request.log",  {
    flags: "a",
    encoding: "utf8"
});

const transformStream = new Transform ({
    transform (chunk, encoding, callback) {
            const transformChunk = chunk.toString().split('\n').filter(function (v) {
                return v.indexOf('89.123.1.41') > -1;
            }).join('\n');
            callback(null, transformChunk);
    }
});
const transformStream5 = new Transform ({
    transform (chunk, encoding, callback) {
        const transformChunk = chunk.toString().split('\n').filter(function (v) {
            return v.indexOf('34.48.240.111') > -1;
        }).join('\n');
        callback(null, transformChunk);
    }
});
readStream.pipe(transformStream).pipe(writeStream89);
readStream.pipe(transformStream5).pipe(writeStream34);

console.log('strangely, it works');