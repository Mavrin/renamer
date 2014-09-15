var fs = require('fs');
var path = require('path');
var clap = require('clap');
var rc =  require('recursive-readdir');
var command = require('./command');


//
// main function
//
function renamer(options) {
    var target = options.target;
    var origin = path.normalize(options.original);
    console.log('start search in', origin);
    var postfix = '-' + options.postfix;
    var files = rc(origin,function(err,files){
        var filesWithPostfix = files.reduce(function (filesWithPostfix, name) {
            var extname = path.extname(name);
            var nameWithoutExt = path.basename(name, extname);
            if (nameWithoutExt.lastIndexOf(postfix) !== -1) {
                console.log("find", nameWithoutExt.replace(postfix, '') + extname);
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
    });

}

exports.renamer = renamer;