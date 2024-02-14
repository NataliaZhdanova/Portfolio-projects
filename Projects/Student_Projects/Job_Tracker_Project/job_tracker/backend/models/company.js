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

export class Company {
    constructor(companyname, url, businessoverview = null, userid) {
        this.companyname = companyname;
        this.url = url;
        this.businessoverview = businessoverview;
        this.userid = userid;
    }
    
    save() {
        return db("company").insert({
            userid: this.userid,
            companyname: this.companyname,
            url: this.url,
            businessoverview: this.businessoverview
        })
    };

    static fetchAll(userid) {
        return db
        .select("*").from("company").where("userid", userid)
    };
}