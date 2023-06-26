# CCTP Sample App

A sample app used to demonstrate CCTP step by step capabilities on testnet. The app currently supports Ethereum Goerli, Avalanche Fuji C-Chain, and Arbitrum Goerli testnets.

![](./docs/screenshot.png)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Setup

## Install dependencies

Install NVM

```
# Install nvm using brew
brew install nvm
# Or install it manually
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
```

Use the correct node version (version found in .nvmrc)

```
nvm use
```

Install npm dependencies

```
yarn install
```

## Running the app

Run the sample app locally:

```
yarn start
```

The sample app will now be running on: http://localhost:3000.

## Testing

Launch the test runner in interactive watch mode

```
yarn test
```

Run tests with test converage.

```
yarn test:unit:coverage
```

### Linting/Formatting/Type Checks

We use eslint, prettier and typescript to validate our code. In combination with husky and lint-staged, we run a check on every precommit on staged changes.

You can also use `yarn check-all` or `yarn fix-all` to validate or fix all lint/format/typing issues. See [package.json](./package.json) for more details.

### Continuous Integration using Github Actions

We use Github actions to run linter and all the tests. The workflow configuration can be found in [github/workflows/ci.yml](./.github/workflows/ci.yml)

### Build and deploy

Build the app into static bundle

```
yarn build
```

To deploy, install and run `serve`

```
yarn global add serve serve -s build
```

See [deployment docs](https://facebook.github.io/create-react-app/docs/deployment) for more information.

# Instructions

## Adding a new chain

We have two config files which will be need to be updated to add a new chain support.

1. ./src/constants/chains.ts In chains.ts, we need to add some enums and details for the chain to support. Add the new chain details to `Chain`, `SupportedChainId`, `SupportedChainIdHex`, `CHAIN_TO_CHAIN_ID`, `CHAIN_TO_CHAIN_NAME`, `DestinationDomain` and `CHAIN_ID_HEXES_TO_PARAMETERS`. This will automatically populate the UI dropdown with the new chain

2. ./src/constants/addresses.ts In addresses.ts, we need to add the contract addresses for the new chain to support. For `CHAIN_IDS_TO_USDC_ADDRESSES`, `CHAIN_IDS_TO_TOKEN_MESSENGER_ADDRESSES` and `CHAIN_IDS_TO_MESSAGE_TRANSMITTER_ADDRESSES`, add the coressponding addresses for the new chain.

## Setup Typechain

We use Typechain in this sample app to easily integrate smart contract with generated Typescript bindings. If we want to add some functionality and update the abis, we can update the abis as necessary in ./src/abis/ and then run the following command to update the generated files.

```
typechain --target=ethers-v5 --out-dir src/typechain src/abis/*.json
```

This generates `typechain` folder under `src` containing contract types to be used by our hooks
