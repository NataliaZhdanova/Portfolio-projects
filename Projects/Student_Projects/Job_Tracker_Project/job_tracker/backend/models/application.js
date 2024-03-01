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
    constructor(status, senddate, positionid, userid) {        
        this.status = status;       
        this.senddate = senddate;
        this.positionid = positionid;
        this.userid = userid;        
    }

    save() {
        return db("application").insert({
            status: this.status,   
            senddate: this.senddate,                       
            positionid: this.positionid,
            userid: this.userid,
        })
    };

    fetch() {
        return db
        .select("application.*", "company.companyname", "position.title", "position.url")
        .from("application")
        .join("position", "application.positionid", "position.positionid")
        .join("company", "position.companyid", "company.companyid")
        .where("application.positionid", this.positionid).first();
    };

    isExisting() {
        return db("application").where("positionid", this.positionid).first();
    };

    static delete(applicationid) {
        return db("application").where("applicationid", applicationid).delete();
    };

    static update(applicationid, status) {
        return db("application").where("applicationid", applicationid).update({
            status: status
        })
    };

    static fetchAll(userid) {
        return db
        .select("application.*", "company.companyname", "position.title", "position.url")
        .from("application")
        .join("position", "application.positionid", "position.positionid")
        .join("company", "position.companyid", "company.companyid")
        .where("application.userid", userid);
    };

    static fetchById(applicationid) {
        return db
        .select("*").from("application").where("applicationid", applicationid);
    };

    static fetchAllForCompany(companyid) {
        return db
        .select("application.*", "position.title", "position.url")
        .from("application")
        .join("position", "application.positionid", "position.positionid")
        .where("position.companyid", companyid);
    };

    static fetchAllForPosition(positionid) {
        return db
        .select("application.*", "position.title", "position.url")
        .from("application")
        .join("position", "application.positionid", "position.positionid")
        .where("application.positionid", positionid);
    };
}