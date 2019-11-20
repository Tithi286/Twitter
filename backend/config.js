module.exports = {
    sql_host: "",
    sql_port: "",
    sql_user: "",
    sql_password: "",
    sql_database: "",
    sql_connectionLimit: 10,

    mongo_host: '',
    mongo_port: "",
    mongo_user: '',
    mongo_password: '',
    mongo_database: '',
    mongo_connectionLimit: 10,

    initDb: process.env.INITDB === "",
    encrAlgorithm: "",
    encrSecret: "",
    jwtsecret: "",
};
