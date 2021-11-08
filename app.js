//execute code with command node app --filename=abc
const yargs = require('yargs');
const fs = require('fs');
const path = require('path');
const os = require('os');

let filename = yargs.argv['filename'];

if (filename != undefined) {
    let fileExt = path.extname(filename);

    if (fileExt != ".txt" && fileExt == "") {
        filename = filename + ".txt";
    }

    fileExt = path.extname(filename);

    if (fileExt == ".txt") {
        fs.readFile("createdFiles.txt", function (err, data) {

            let createdFiles = data.toString();

            if (!createdFiles.includes(filename)) {

                fs.writeFile(filename, "You are awesome", { flag: 'wx' }, function (err) {

                    if (err) {
                        return console.log("Error creating file:\'" + filename + "\' " + "error=" + err);
                    } else {
                        fs.appendFile("createdFiles.txt", filename + os.EOL, function (aerr) {
                            if (aerr) {
                                return console.log("Error writing filename to createdFiles.txt; error=" + aerr);
                            }
                        });
                        return console.log("File " + filename + " created sucessfully!!")
                    }
                });
            } else {
                return console.log("File \'" + filename + "\' already exists. Try with a different filename");
            }
        });
    } else {
        return console.log("filename is incorrect. Either provide \'.txt\' extension or just the filename");
    }
}
else {
    return console.log("filename is missing; Please rerun with command -> node app --filename=<file name>")
}