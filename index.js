var jetpack = require('fs-jetpack');
var path = require('path');
var fs = require('fs');
var archiver = require('archiver');
var zip = require('./zip-folder');

function zipFolder(dir, to, zipName) {
    var output = fs.createWriteStream(path.join(to, zipName + '.zip'));
    var archive = archiver('zip');

    output.on('close', function () {
        console.log(archive.pointer() + ' total bytes');
        console.log('archiver has been finalized and the output file descriptor has closed.');
    });

    archive.on('error', function (err) {
        throw err;
    });

    archive.pipe(output);

    jetpack.list(dir).forEach(function(file){
        archive
         .append(fs.createReadStream(path.join(dir, file)), { name: file });
    });
    archive.finalize();
}

function backupFolder(folder, to) {
    jetpack.dir(to);
    var backupName = path.basename(to) + '-' + Date.now();

    zipFolder(folder, to, backupName);
}

module.exports =  {backupFolder: backupFolder};