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

export class Position {
    constructor(url, title, requirements = null, keywords = null, discoverydate, companyid, userid = null) {
        this.userid = userid;
        this.companyid = companyid;
        this.title = title;
        this.url = url;        
        this.requirements = requirements;
        this.keywords = keywords;
        this.discoverydate = discoverydate;
        
    }

    save(userid) {
        return db("position").insert({
            url: this.url, 
            title: this.title,
            requirements: this.requirements,
            keywords: this.keywords,
            discoverydate: this.discoverydate,
            companyid: this.companyid,
            userid: userid, 
        })
    };

    static fetchAll(userid) {
        return db
        .select("position.*", "company.companyname").from("position").join("company", "position.companyid", "company.companyid").where("position.userid", userid);
    };
}
