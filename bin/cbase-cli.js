const yargs = require('yargs');
const main = require('../');
const exitOnError = require('../utils/exit-on-error');
const chalk = require('chalk');

// For account:

const login = {
    command: 'login',
    desc: 'logging in through CBaseChain wallet',
    builder: (yargs) => yargs
        .option('walletUrl', {
            desc: 'URL of wallet to use',
            type: 'string',
            required: false
        }),
    handler: exitOnError(main.login)
};

const viewAccount = {
    command: 'state <accountId>',
    desc: 'view account state',
    builder: (yargs) => yargs
        .option('accountId', {
            desc: 'Account to view',
            type: 'string',
            required: true
        }),
    handler: exitOnError(main.viewAccount)
};

const deleteAccount = {
    command: 'delete <accountId> <beneficiaryId>',
    desc: 'delete an account and transfer funds to beneficiary account.',
    builder: (yargs) => yargs
        .option('accountId', {
            desc: 'Account to view',
            type: 'string',
            required: true
        })
        .option('beneficiaryId', {
            desc: 'Account to transfer funds to',
            type: 'string',
            required: true
        }),
    handler: exitOnError(main.deleteAccount)
};

const keys = {
    command: 'keys <accountId>',
    desc: 'view account public keys',
    builder: (yargs) => yargs
        .option('accountId', {
            desc: 'Account to view',
            type: 'string',
            required: true
        }),
    handler: exitOnError(main.keys)
};

const sendMoney = {
    command: 'send <sender> <receiver> <amount>',
    desc: 'send tokens to given receiver',
    builder: (yargs) => yargs
        .option('amount', {
            desc: 'Amount of CBase tokens to send',
            type: 'string',
        }),
    handler: exitOnError(main.sendMoney)
};

const stake = {
    command: 'stake [accountId] [stakingKey] [amount]',
    desc: 'create staking transaction',
    builder: (yargs) => yargs
        .option('accountId', {
            desc: 'Account to stake on',
            type: 'string',
            required: true,
        })
        .option('stakingKey', {
            desc: 'Public key to stake with (base58 encoded)',
            type: 'string',
            required: true,
        })
        .option('amount', {
            desc: 'Amount to stake',
            type: 'string',
            required: true,
        }),
    handler: exitOnError(main.stake)
};

// For contract:
const deploy = {
    command: 'deploy',
    desc: 'deploy your smart contract',
    builder: (yargs) => yargs
        .option('wasmFile', {
            desc: 'Path to wasm file to deploy',
            type: 'string',
            default: './out/main.wasm'
        })
        .alias({
            'accountId': ['account_id', 'contractName', 'contract_name'],
        }),
    handler: exitOnError(main.deploy)
};

const callViewFunction = {
    command: 'view <contractName> <methodName> [args]',
    desc: 'make smart contract call which can view state',
    builder: (yargs) => yargs,
    handler: exitOnError(main.callViewFunction)
};


const build = {
    command: 'build',
    desc: 'build your smart contract',
    handler: exitOnError(main.build)
};

const clean = {
    command: 'clean',
    desc: 'clean the build environment',
    builder: (yargs) => yargs
        .option('outDir', {
            desc: 'build directory',
            type: 'string',
            default: './out'
        }),
    handler: exitOnError(main.clean)
};

let config = require('../get-config')();
yargs // eslint-disable-line
    .strict()
    .middleware(require('../utils/check-version'))
    .scriptName('cbase')
    .option('nodeUrl', {
        desc: 'CBase node URL',
        type: 'string',
        default: 'http://localhost:3030'
    })
    .option('networkId', {
        desc: 'CBase network ID, allows using different keys based on network',
        type: 'string',
        default: 'default'
    })
    .option('helperUrl', {
        desc: 'CBase contract helper URL',
        type: 'string',
    })
    .option('keyPath', {
        desc: 'Path to master account key',
        type: 'string',
    })
    .option('accountId', {
        desc: 'Unique identifier for the account',
        type: 'string',
    })

    .option('walletUrl', {
        desc: 'Website for CBase Wallet',
        type: 'string',
        hidden: true
    })
    .option('contractName', {
        desc: 'Account name of contract',
        type: 'string',
        hidden: true
    })
    .option('masterAccount', {
        desc: 'Master account used when creating new accounts',
        type: 'string',
        hidden: true
    })
    .middleware(require('../middleware/initial-balance'))
    .middleware(require('../middleware/print-options'))
    .middleware(require('../middleware/key-store'))
    .command(require('../commands/create-account'))
    .command(viewAccount)
    .command(deleteAccount)
    .command(keys)
    .command(require('../commands/tx-status'))
    .command(build)
    .command(deploy)
    .command(require('../commands/dev-deploy'))
    .command(require('../commands/call'))
    .command(callViewFunction)
    .command(sendMoney)
    .command(clean)
    .command(stake)
    .command(login)
    .command(require('../commands/repl'))
    .command(require('../commands/generate-key'))
    .command(require('../commands/validators'))
    .command(require('../commands/proposals'))
    .config(config)
    .alias({
        'accountId': ['account_id'],
        'nodeUrl': 'node_url',
        'networkId': ['network_id'],
        'wasmFile': 'wasm_file',
        'projectDir': 'project_dir',
        'outDir': 'out_dir'
    })
    .showHelpOnFail(true)
    .recommendCommands()
    .demandCommand(1, chalk`Pass {bold --help} to see all available commands and options.`)
    .usage(chalk`Usage: {bold $0 <command> [options]}`)
    .epilogue(chalk`Check out our epic whiteboard series`)
    .wrap(null)
    .argv;
