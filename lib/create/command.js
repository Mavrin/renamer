var clap = require('clap');

var command = clap.create('rename')
    .description('Smart renamer')
    .option('-t, --target <target>', 'directory where will be rename files')
    .option('-o, --original <original>', 'directory where will be search files')
    .option('-p, --postfix <postfix>', 'postfix for searched file','@2x')
    .action(function () {
        if (this.configFile)
            console.log('Config: ' + this.configFile + '\n');
        require('./index.js').renamer.call(this, this.values);
    });


module.exports = command;
