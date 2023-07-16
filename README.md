# E-Commerce-Full-Stack-Web-Application

# Version Information

MySQL 8.0
JDK 17.0.7
Spring 3.1.1
Apache Maven 3.9.2
Openapi 2.0.2
Node 18.16.0
React 18.2.0
react-router-dom 6.14.1

# Launch/Run Instructions

### `create database emart_database;`
Run the following command in MySQL to create a local database for our application. SpringBoot Models will later setup the tables for us on running it.

### `mvn spring-boot:run`
Runs Spring Boot at [http://localhost:8080]
Swagger Documentation for database schema, table layouts and all API calls is available at [http://localhost:8080/swagger-ui/index.html] after running the SpringBoot application.

### `npm start`
Runs the react app in development mode at [http://localhost:3000]. If it does not launch automatically in a new browser window, you can open a new browser window and access it at [http://localhost:3000].

### `npm test`
Launches the test runner in the interactive watch mode. Check out the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`
Builds the app for production to the `build` folder. It will correctly bundle the React app in production mode and optimize the build for the best performance.