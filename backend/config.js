module.exports = {
    sql_host: "54.241.138.21",
    sql_port: "3306",
    sql_user: "user",
    sql_password: "root",
    sql_database: "twitter",
    sql_connectionLimit: 10,

    mongo_host: 'ec2-54-183-64-236.us-west-1.compute.amazonaws.com',
    mongo_port: "27017",
    mongo_user: 'admin',
    mongo_password: 'admin',
    mongo_database: 'twitter',
    mongo_connectionLimit: 10,

    initDb: process.env.INITDB === "true",
    encrAlgorithm: "aes256",
    encrSecret: "1hmmp2sk8owpg8mtxxe8a",
    jwtsecret: "knuvv76u188zd2xu8c4xa",
};
