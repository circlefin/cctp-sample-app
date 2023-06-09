# CCTP Sample App

A sample app used to demonstrate CCTP step by step capabilities.

![](./docs/screenshot.png)

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
