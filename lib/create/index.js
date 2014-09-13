var fs = require('fs');
var path = require('path');
var clap = require('clap');
var command = require('./command');


//
// main function
//
function renamer(options) {
    var target = options.target;
    var origin = options.original;
    var postfix = '-' + options.postfix;
    var files = fs.readdirSync(origin);
    var filesWithPostfix = files.reduce(function (filesWithPostfix, name) {
        var extname = path.extname(name);
        var nameWithoutExt = path.basename(name, extname);
        if (nameWithoutExt.lastIndexOf(postfix) !== -1) {
            filesWithPostfix.push(nameWithoutExt.replace(postfix, '') + extname);
        }
        return filesWithPostfix;
    }, []);
    filesWithPostfix.forEach(function (name) {
        var targetPathToFile = path.normalize(target + '/' + name);
        if (fs.existsSync(targetPathToFile)) {
            var extname = path.extname(name);
            var nameWithoutExt = path.basename(name, extname);
            var newName = nameWithoutExt + postfix + extname;
            var newPath =  path.normalize(target + '/' + newName);
            if(!fs.existsSync(newPath) ){
                fs.renameSync(targetPathToFile, newPath);
            }
        }
    });
}

exports.renamer = renamer;