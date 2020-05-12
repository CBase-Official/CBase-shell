module.exports = {
    command: 'repl',
    desc: 'launch interactive Node.js shell with NEAR connection available to use',
    builder: (yargs) => yargs,
    handler: async (argv) => {
        const repl = require('repl');
        const context = repl.start('> ').context;
        context.nearlib = require('near-api-js');
        context.cbase = await require('../utils/connect')(argv);
        if (argv.accountId) {
            context.account = await context.cbase.account(argv.accountId);
        }
    }
};