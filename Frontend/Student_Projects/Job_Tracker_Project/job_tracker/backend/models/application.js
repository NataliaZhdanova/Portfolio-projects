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

export class Application {
    constructor(status, senddate, positionid, userid = null) {
        this.userid = userid;
        this.positionid = positionid;
        this.status = status;       
        this.senddate = senddate;        
    }

    save(userid) {
        return db("application").insert({
            status: this.status,   
            senddate: this.senddate,                       
            positionid: this.positionid,
            userid: userid,
        })
    };

    static fetchAll(userid) {
        return db
        .select("application.*", "company.companyname", "position.title", "position.url", "position.discoverydate").from("application").join("position", "application.positionid", "position.positionid").join("company", "position.companyid", "company.companyid").where("application.userid", userid);
    };
}