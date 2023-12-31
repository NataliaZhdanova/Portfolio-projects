// Authentication is handled by the following files:
// /pages/Authentication.js - displays components and sends data to the server
// /components/AuthForm.js - login component, only HTML
// /components/RegForm.js - registration component, only HTML
// /backend/server.js - keeps session middleware
// /backend/routes/userRegLog.js - router
// /backend/models/user.js - (this file) - user model keeps the CRUD DB logic
// /backend/controllers/users.js - keeps the login/registration data processing logic and creates a session

import dotenv from 'dotenv';
dotenv.config();

import knex from "knex";

const db = knex({
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      port: process.env.DB_PORT
    }
  });

export class User {
    constructor(username, email, hashedPassword) {
        this.username = username;
        this.email = email;
        this.password = hashedPassword;
    }

    save() {
        return db("user").insert({
            username: this.username,
            email: this.email,
            password: this.password
        })
    };

    // static findByEmail(email) {
    //     let userid = db.select("userid")
    //     .from("user")
    //     .where("email", email);
    //     console.log(userid);
    //     return userid;
    // };
};
