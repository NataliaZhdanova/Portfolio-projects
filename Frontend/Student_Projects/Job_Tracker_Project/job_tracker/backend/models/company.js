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
    constructor(companyname, url, startup = false, businessoverview = null, userid = null) {
        this.companyname = companyname;
        this.url = url;
        this.startup = startup;
        this.businessoverview = businessoverview;
        this.userid = userid;
    }
    
    save(userid) {
        return db("company").insert({
            userid: userid,
            companyname: this.companyname,
            url: this.url,
            startup: this.startup,
            businessoverview: this.businessoverview
        })
    };

    static fetchAll(userid) {
        return db
        .select("*").from("company").where("userid", userid)
    };
}