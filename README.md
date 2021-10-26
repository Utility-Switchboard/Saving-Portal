# Savings Portal

The application is based on react, using firebase services for the management and creation of the database as well as authentication.

Its functions are declared, imported and exported inside the file "firebase.js"

We use the ".env" file to store secret keys and sensitive information.

During its construction we integrate different libraries that are specified in the file "package.json"

In the "src" folder, you will find all the components, pages and files necessary for its operation.

We use react router dom for the management and protection of the routes, where we only have two routes that render the two main pages, which are "LoginPage" and "HomePage".

In the component "HomePage" we render all the other components depending on their states.

Each component has its own states propagated and connected to the component “HomePage”.

We use hooks like the "useAddress" to get and render the addresses coming from the Address API in the "FormAddress" component.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
