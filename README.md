# cbase Shell command line interface


CBase Shell is a Node.js application that  to generate secure keys, connect to the cbase platform and send transactions to the network on your behalf.

> note that **Node.js version 10+** is required to run CBase Shell

## Installation

```bash
npm install -g cbase-shell
```

## Usage

In command line, from directory with your project:

```bash
cbase <command>
```

### Commands

#### For account:
```bash
  cbase login                                       # logging in through cbase protocol wallet
  cbase create_account <accountId>                  # create a developer account with --masterAccount(required), publicKey and initialBalance
  cbase state <accountId>                           # view account state
  cbase keys <accountId>                            # view account public keys
  cbase send <sender> <receiver> <amount>           # send tokens to given receiver
  cbase stake <accountId> <stakingKey> <amount>     # create staking transaction (stakingKey is base58 encoded)
  cbase delete <accountId> <beneficiaryId>          # delete an account and transfer funds to beneficiary account
```

#### For smart contract:
```bash
  cbase build                                       # build your smart contract
  cbase deploy                                      # deploy your smart contract
  cbase call <contractName> <methodName> [args]     # schedule smart contract call which can modify state
  cbase view <contractName> <methodName> [args]     # make smart contract call which can view state
  cbase clean                                       # clean the smart contract build locally (remove ./out )
```

#### For transactions:
```bash
  cbase tx-status <hash>                            # lookup transaction status by hash
```

#### Misc:

```bash
  cbase repl                                        # launch interactive Node.js shell with cbase connection available to use
  cbase generate-key <account-id>                   # generate key
```

### Options

| Option                    | Description                                   | Type      | Default               |
| --------------------------|:----------------------------------------------| :---------|:----------------------|
| --help                    | Show help                                     | [boolean] |                       |
| --version                 | Show version number                           | [boolean] |                       |
| --nodeUrl                 | cbase node URL                                 | [string]  |"http://localhost:3030"|
| --networkId               | cbase network ID for different keys by network | [string]  |"default"              |
| --helperUrl               | cbase contract helper URL                      | [string]  |                       |
| --keyPath                 | Path to master account key                    | [string]  |                       |
| --accountId               | Unique identifier for the account             | [string]  [required]|             |
| --masterAccount           | Account used to create requested account.     | [string]  [required]|             |
| --publicKey               | Public key to initialize the account with     | [string]  [required]|             |
| --initialBalance          | Number of tokens to transfer to newly account | [string]  [required]|             |

## License
This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
See [LICENSE](LICENSE) and [LICENSE-APACHE](LICENSE-APACHE) for details.
