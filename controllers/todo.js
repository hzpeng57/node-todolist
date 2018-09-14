var mysql  = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    port: '3306',
    database: 'test',
});

connection.connect();

const fn_query = async (ctx, next) => {

    let temp = await new Promise ((resolve, reject) => {
        connection.query('SELECT * from todos', function (err, results) {
            if(err){
                reject(0);
            }
            resolve(JSON.parse(JSON.stringify(results)));
        });
    });
    ctx.response.body = temp;
};

const fn_insert = async (ctx, next) => {
    let con = ctx.request.body.content;
    let sql = `INSERT INTO todos (Id, content) VALUES (0, ?)`;
    let sqlParams = [con];
    let temp = await new Promise ((resolve, reject) => {
        connection.query(sql, sqlParams, function (err, results) {
            if(err){
                console.log('[INSERT ERROR] - ',err.message);
                reject(0);
            }
            resolve(1);

        });
    });
    ctx.body = temp;
};

const fn_delete = async (ctx, next) => {
    let id = ctx.request.body.id;
    let sql = `delete from todos where id = ${id}`;
    let temp = new Promise((resolve, reject) => {
        connection.query(sql, function (err, results) {
            if(err){
                console.log('[DELETE ERROR] - ',err.message);
                reject({data: 0});
            }
            resolve({data: 1});
        });
    });
    ctx.body = temp;
};

const fn_update = async (ctx, next) => {
    let id = ctx.request.body.id;
    let con = ctx.request.body.content;
    let sql = `UPDATE todos SET content = ? WHERE Id = ?`;
    let sqlParams = [con, id];

    let temp = new Promise((resolve, reject) => {
        connection.query(sql, sqlParams, function (err, results) {
            if(err){
                console.log('[UPDATE ERROR] - ',err.message);
                reject(0);
            }
            resolve(1);
        });
    });
    ctx.body = temp;

};




module.exports = {
    'GET /getTodosList': fn_query,
    'POST /insertTodos': fn_insert,
    'DELETE /deleteTodos': fn_delete,
    'POST /updateTodos': fn_update
};