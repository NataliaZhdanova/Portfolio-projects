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

    fetch() {
        return db
        .select("*").from("company").where("companyname", this.companyname).where("url", this.url).where("userid", this.userid).first();
    };

    isExisting() {
        return db("company").where("companyname", this.companyname).where("url", this.url).where("userid", this.userid).first();
    };

    static delete(companyid) {
        return db("company").where("companyid", companyid).delete();
    };

    static update(companyid, companyname, url, businessoverview) {
        return db("company").where("companyid", companyid).update({
            companyname: companyname,
            url: url,
            businessoverview: businessoverview
        })
    };

    static fetchById(companyid) {
        return db
        .select("*").from("company").where("companyid", companyid);
    };

    static fetchAll(userid) {
        return db
        .select("*").from("company").where("userid", userid);
    };
    
} 