# Node.js RESTful API with MySQL

This is a simple Node.js RESTful API using Express.js framework for handling HTTP requests, MySQL for database management, and various other dependencies for different functionalities.

## Installation

1. Clone the repository:

   ```bash
   git clone https://gitlab.com/msib61/gurilaps-rest-api
   ```

2. Install dependencies:

   ```bash
   npm install axios bcryptjs body-parser cors dotenv express express-validator jsonwebtoken mysql
   ```

3. Set up connection database:

   Create a `dbConnection file in the root directory and add the following variables:

   ```plaintext
    var mysql = require('mysql');
        var conn = mysql.createConnection({
        host: 'hostname',
        user: 'user',
        password: 'pass',
        database: 'database' //

        });
        conn.connect(function(err) {
        if (err) throw err;
        console.log('Database is connected successfully !');
        });
        module.exports = conn;
   ```

4. Creata Server.js:

   ```bash
    app.use((err, req, res, next) => {
        console.log(err);
        err.statusCode = err.statusCode || 500;
        err.message = err.message || "Internal Server Error";
        res.status(err.statusCode).json({
        message: err.message,
        });
    });

    app.listen(3999,() => console.log('Server is running on port 3999'));
   ```

5. Start the server:

   ```bash
   node.server.js
   ```

## Dependencies

- [Axios](https://www.npmjs.com/package/axios): Promise based HTTP client for the browser and Node.js.
- [bcryptjs](https://www.npmjs.com/package/bcryptjs): Library to help you hash passwords.
- [body-parser](https://www.npmjs.com/package/body-parser): Node.js body parsing middleware.
- [cors](https://www.npmjs.com/package/cors): Express middleware to enable CORS (Cross-Origin Resource Sharing).
- [dotenv](https://www.npmjs.com/package/dotenv): Loads environment variables from a `.env` file into `process.env`.
- [express](https://www.npmjs.com/package/express): Fast, unopinionated, minimalist web framework for Node.js.
- [express-validator](https://www.npmjs.com/package/express-validator): An express.js middleware for validator.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): JSON Web Token implementation for node.js.
- [mysql](https://www.npmjs.com/package/mysql): A node.js driver for MySQL.

## Usage

- This API provides CRUD (Create, Read, Update, Delete) operations for managing resources.
- Modify the routes and controllers according to your application requirements.
- Ensure proper error handling and input validation for robustness.
