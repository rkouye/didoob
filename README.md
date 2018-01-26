This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## About
It is all in french.
[Homepage](https://semako-kouye.github.io/didoob)

## To-do
    - License
    - Save last used network provider
    - Fix a lot of typo :/
    - Close contract
    - Add english translations

## Note

The truffle/ folder contains Contract managed with truffle. There is no build script or any integration between create-react-app and this.
Maybe in the future. 

Actually contracts are only stored there so I could easily import truffle-contract-json schema compiled with truffle into the web app.
Anyway it appeared that we could not import file from outside the src directory in create-react-app. A solution could have been using symlink, but this is not portable I guess (I dunno), also I am on Windows and don't know how to do this with Windows. So far after every truffle compile I copy paste the build file. I will see later what to do about it.

Contracts compilation, migration and testing has to be done manually. 
The ethereum client is also not managed, you should start it yourself. [See](http://truffleframework.com/docs/getting_started/client)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.