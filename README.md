# CCTP Sample App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup

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

Setup Typechain

```
typechain --target=ethers-v5 --out-dir src/typechain src/abis/*.json
```

This generates `typechain` folder under `src` containing contract types to be used by our hooks

## Running the app

Run the development server:

```
yarn start
```

### Testing

Launch the test runner in interactive watch mode

```
yarn test
```

Run tests with test converage.

```
yarn test:unit:coverage
```

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
