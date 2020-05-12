const exitOnError = require('../utils/exit-on-error');
const connect = require('../utils/connect');
const validatorsInfo = require('../utils/validators-info');

module.exports = {
    command: 'validators <epoch>',
    desc: 'lookup validators for given epoch (or current / next)',
    builder: (yargs) => yargs
        .option('epoch', {
            desc: 'epoch defined by block number or current / next',
            type: 'string',
            required: true
        }),
    handler: exitOnError(async (argv) => {
        const cbase = await connect(argv);

        switch (argv.epoch) {
        case 'current':
            await validatorsInfo.showValidatorsTable(cbase, null);
            break;
        case 'next':
            await validatorsInfo.showNextValidatorsTable(cbase);
            break;
        default:
            await validatorsInfo.showValidatorsTable(cbase, argv.epoch);
            break;
        }
    })
};
