const tableName = 'Follower';

const getFollowedUsers = connection => (user = {}) => {
    const { userID } = user;
    let query = `select * from ${tableName}`;
    const clause = [];
    if (userID) {
        clause.push(`followerID='${userID}'`);
    }
    query += clause.length > 0 ? ` where ${clause.join(' and ')}` : '';
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

module.exports = {
    getFollowedUsers,
};