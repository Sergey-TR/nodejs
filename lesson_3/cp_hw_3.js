const fs = require("fs");
const { Transform } = require("stream");

const SOURCE_FILE_NAME = "./access.log";
const IP_LIST = [ "89.123.1.41", "34.48.240.111"];

const getOutputFileName = (ip) => `${ip}_request.log`;

const readStream = fs.createReadStream(SOURCE_FILE_NAME, "utf-8");

IP_LIST.forEach((ip) => {
    const regExp = new RegExp("^" + ip + ".*$", "gm");
    const outFileName = getOutputFileName(ip);

    const transformStream = new Transform({
        transform(chunk, _encoding, callback) {
            let transformedChunk = "";
            const searchArray = chunk.toString().match(regExp);
            if (searchArray) {
                transformedChunk = searchArray.join("\n") + "\n";
            }
            callback(null, transformedChunk);
        },
    });

    const writeStream = fs.createWriteStream(outFileName, "utf-8");
    readStream.pipe(transformStream).pipe(writeStream);
});