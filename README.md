# Crypto Pass

This project runs entirely on the user's phone, designed this way to enable the creation of secure passwords with the highest level of privacy possible.

This is a [React Native](https://reactnative.dev/) mobile app that uses [Expo](https://expo.dev/) tools.

<p align="center">
  <a href="https://nextjs.org/" target="blank"><img src="https://www.svgrepo.com/show/374032/reactjs.svg" width="200" alt="React Native Logo" /></a>
  <a href="https://nextjs.org/" target="blank"><img src="https://www.svgrepo.com/show/341805/expo.svg" width="200" alt="Expo Logo" /></a>
</p>

## Development Installation

First of all install [NVM + Node](https://fabiojanio.medium.com/nvm-gerencie-m%C3%BAltiplas-instala%C3%A7%C3%B5es-do-node-js-6fcd0f13aaf7) and run the command below

```bash
# install project dependencies
$ npm install
```

## Running the app

The app uses native crypto ([react-native-quick-crypto](https://github.com/margelo/react-native-quick-crypto)), so it does not run in Expo Go. Build and install a development client once (and again whenever native dependencies change):

```bash
$ eas build --profile development --platform android
```

Then start the dev server and open the project from the installed development client:

```bash
# ubuntu
$ npx expo start

# wsl
$ npx expo start --tunnel
```

## Building the app

To build the app check this docs here: [Creating your first build](https://docs.expo.dev/build/setup/)
