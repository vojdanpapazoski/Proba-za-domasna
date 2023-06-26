const fs = require("fs");

const fileWrite = (filename, data) => {
    return new Promise((success, fail) => {
        fs.writeFile(filename, data, "utf-8", (err) => {
            if (err) return fail(err);
            return success();
        });
    });
};

const fileRead = (filename) => {
    return new Promise((success, fail) => {
        fs.readFile(filename, "utf-8", (err, data) => {
            if (err) return fail(err);
            return success(data);
        });
    });
};


const fileDelete = (filename) => {
    return new Promise((resolve, reject) => {
        fs.unlink(filename, (err) => {
            if (err) return reject(err);
            return resolve();
        });
    });
};

module.exports = { fileWrite, fileRead, fileDelete }
