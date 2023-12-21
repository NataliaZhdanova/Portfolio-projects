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
