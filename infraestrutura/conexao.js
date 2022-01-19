const mysql = require('mysql');
const conexao = mysql.createConnection(
    {
        host:  '177.66.255.98',
        port: 3306,
        user: 'root',
        password: '@@#123mudar',
        database:   'clientes_a_cobrar'


    }
);

module.exports = conexao;