# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

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

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

<!-- Design Decisions -->

<!-- Application Structure -->

## React with TypeScript:
 Chosen for its robust typing system, enhancing code quality and predictability.

## Suspense for Data Fetching:
Utilized React's Suspense for handling the loading state of artwork data, improving user experience by providing a fallback UI during data fetching.

## React Hook Form:
Implemented for form handling in the comments section to leverage its performance and minimal re-rendering.
State Management

## Local State Management:
Used React's useState and useEffect hooks for managing state and side effects. This choice was made due to the application's moderate complexity and the need for a simple, straightforward state management solution.

<!-- Styling -->
## Tailwind CSS:
Selected for its utility-first approach, enabling rapid UI development with responsiveness and customizability in mind.
Pagination and Filtering.

## Client-Side Pagination and Filtering:
Implemented to reduce the load on the server and provide a quicker, more responsive experience for the user. React Paginate was used for handling pagination UI and logic.

<!-- Artwork Details -->
## Lazy Loading Component:
Artwork details are loaded in a separate page to keep the initial page load lightweight and ensure details are only fetched when needed.

<!-- Comments Form -->
## React Hook Form for Validation:
Provides an efficient and easy way to implement form validation, improving user experience by ensuring all comment form inputs are correctly filled.

<!-- COMMENTS -->
1. API calls for filter the categories and title are not working as expected, so i did a client side filter functionality.
2. While searching for categories the result is empty for most of the categories because of client side filtering and it is done only on 10 records per page. You will get the data when you switch for different paginations.

    <!-- THANK YOU... -->