const fs = window.require('fs');
const path = window.require('path');
const del = window.require('del');
const copy = window.require('copy');

module.exports = {
    openFile: function (filePath, callback) {
        fs.readFile(filePath, 'UTF-8', (error, fileContent) => {
            if (error) {
                throw new Error(`openFile: ${error}`);
            }

            if (callback) {
                callback(filePath, fileContent);
            }
        })
    },

    saveFile: function (filePath, fileContent, callback) {
        fs.writeFile(filePath, fileContent, (error) => {
            if (error) {
                throw new Error(`saveFile: ${error}`);
            }

            if (callback) {
                callback();
            }
        });
    },

    getRootPath: function () {
        return path.resolve('./');
    },

    mkdir: function (path, callback) {
        fs.mkdir(path, callback);
    },

    del: function (pattern, callback) {
        del(pattern).then((paths) => {
            if (callback) {
                callback(paths);
            }
        });
    },

    copy: function (src, dest, callback) {
        copy(src, dest, callback);
    }
}