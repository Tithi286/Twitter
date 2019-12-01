const tableName = 'Users';

const getUsers = connection => (user = {}) => {
    const { userID, usersID,email, password ,search} = user;
  
    const clause = [];
    if (userID) {
        clause.push(`userID='${userID}'`);
    }
    if (usersID) {
    
        clause.push(`userID in (${usersID})`);
    }
    if (email) {
        clause.push(`email='${email}'`);
    }
    if (password) {
        clause.push(`password='${password}'`);
    }
    if (search) {
        clause.push(`firstName like '%${search.firstName}%' or lastName like '%${search.lastName}%' or userName like '%${search.userName}%'`);
    }
    let query = `select * from ${tableName}`;
    query += clause.length > 0 ? ` where ${clause.join(' and ')}` : '';
    console.log(query)
    return new Promise((resolve, reject) => {
        connection.query(query, (error, results, fields) => {
            // release DB connection
            connection.release();
            if (error) {
                reject(error);
            } else {

                resolve({ results, fields });
            }
        });
    });
};
const saveUsers = connection => (user) => {
    const { userID, email, password, firstName, lastName, isActive, DOB } = user;
    let query = `insert into ${tableName} (userID, email, password, firstName, lastName, isActive,DOB)` +
        ` VALUES ('${userID}', '${email}', '${password}', '${firstName}', '${lastName}', ${isActive},'${DOB}');`;
    return new Promise((resolve, reject) => {
        connection.query(query, (error, results, fields) => {
            // release connection 
            connection.release();
            if (error) {
                reject(error);
            } else {
                resolve({ results, fields });
            }
        });
    });
};
const editUser = connection => (user) => {
    const { userID, email, password, firstName, lastName, city, profileImage, state, zipcode, profileDesc, userName, isActive, DOB } = user;
    let query = `UPDATE ${tableName}`;
    const clause = [];

    if (email) {
        clause.push(`email='${email}'`);
    }
    if (password) {
        clause.push(`password='${password}'`);
    }
    if (firstName) {
        clause.push(`firstName='${firstName}'`);
    }
    if (lastName) {
        clause.push(`lastName='${lastName}'`);
    }
    if (profileImage) {
        clause.push(`profileImage='${profileImage}'`);
    }
    if (city) {
        clause.push(`city='${city}'`);
    }
    if (state) {
        clause.push(`state='${state}'`);
    }
    if (zipcode) {
        clause.push(`zipcode='${zipcode}'`);
    }
    if (profileDesc) {
        clause.push(`profileDesc='${profileDesc}'`);
    }
    if (userName) {
        clause.push(`userName='${userName}'`);
    }
    if (isActive) { // send boolean value true/false
        clause.push(`isActive='${isActive}'`);
    }
    if (DOB) {
        clause.push(`DOB='${DOB}'`);
    }

    query += ` SET ${clause.join(' , ')}`;
    query += ` where userID='${userID}'`;
    return new Promise((resolve, reject) => {
        connection.query(query, (error, results, fields) => {
            // release connection first!
            connection.release();

            if (error) {
                reject(error);
            } else {
                resolve({ results, fields });
            }
        });
    });
};
const deleteUser = connection => (user) => {
    const { userID } = user;
    let query = `DELETE FROM ${tableName}`;
    const clause = [];

    if (userID) {
        clause.push(`userID='${userID}'`);
    }
    query += ` where userID='${userID}'`;
    return new Promise((resolve, reject) => {
        connection.query(query, (error, results, fields) => {
            // release connection first!
            connection.release();

            if (error) {
                reject(error);
            } else {
                resolve({ results, fields });
            }
        });
    });

};
module.exports = {
    getUsers,
    saveUsers,
    editUser,
    deleteUser,
};
