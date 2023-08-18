# E-Commerce-Full-Stack-Web-Application
Developed by Fraron Balsara

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
Ensure MySQL is running on default port 3306. Run the above command in MySQL to create a local database for our application. Spring Boot Models will later setup the tables for us on running the application.

### `spring.datasource.password=root`
Replace `root` in the above line with your database password for the root user in `C:\Users\bfrar\OneDrive\Desktop\E-Commerce Full Stack Web Application\backend-spring-boot-application\src\main\resources\application.properties`.

### `mvn spring-boot:run`
Navigate to `E-Commerce Full Stack Web Application\backend-spring-boot-application` and run the above command to start Spring Boot application at [http://localhost:8080]  
Swagger Documentation for database schema, table layouts and all API calls is available at [http://localhost:8080/swagger-ui/index.html] after running the SpringBoot application.  
Default users and products are automatically added to the database on running the Spring Boot application.  
`Customer Credentials`  
Email: default.customer@email.com  
Password: DefaultPassword@1  
`Seller Credentials`  
Email: default.seller@email.com  
Password: DefaultSeller@1  
`Admin Credentials`  
Email: default.admin@email.com  
Password: DefaultAdmin@1  

### `npm start`
Navigate to `E-Commerce Full Stack Web Application\frontend-react-application` and run the above command to start the react app in development mode at [http://localhost:3000]. If it does not launch automatically in a new browser window, you can open a new browser window and access it at [http://localhost:3000].

### `npm test`
Navigate to `E-Commerce Full Stack Web Application\frontend-react-application` and run the above command to launch the test runner in the interactive watch mode. Check out the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`
Navigate to `E-Commerce Full Stack Web Application\frontend-react-application` and run the above command to build the app for production to the `build` folder. It will correctly bundle the React app in production mode and optimize the build for the best performance.
