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
    constructor(url, title, requirements = null, keywords = null, discoverydate, companyid, userid) {
        this.userid = userid;
        this.companyid = companyid;
        this.title = title;
        this.url = url;        
        this.requirements = requirements;
        this.keywords = keywords;
        this.discoverydate = discoverydate;
        
    }

    save() {
        return db("position").insert({
            url: this.url, 
            title: this.title,
            requirements: this.requirements,
            keywords: this.keywords,
            discoverydate: this.discoverydate,
            companyid: this.companyid,
            userid: this.userid, 
        })
    };

    fetch() {
        return db
        .select("position.*", "company.companyname").from("position").join("company", "position.companyid", "company.companyid").where("position.companyid", this.companyid).where("position.url", this.url).first();
    };

    isExisting() {
        return db("position").where("companyid", this.companyid).where("url", this.url).first();
    };

    static delete(positionid) {
        return db("position").where("positionid", positionid).delete();
    };

    static update(positionid, title, url, requirements, keywords) {
        return db("position").where("positionid", positionid).update({
            title: title,
            url: url,
            requirements: requirements,
            keywords: keywords
        })
    };

    static fetchById(positionid) {
        return db
        .select("*").from("position").where("positionid", positionid);
    };

    static fetchAll(userid) {
        return db
        .select("position.*", "company.companyname").from("position").join("company", "position.companyid", "company.companyid").where("position.userid", userid);
    };

    static fetchAllForCompany(companyid) {
        return db
        .select("*").from("position").where("companyid", companyid);
    };
} 
