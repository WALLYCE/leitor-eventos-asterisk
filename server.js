const express = require('express')
const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
const cors = require('cors');
const asteriskManager = require('asterisk-manager');

/*
    Use's express
*/
app.use(cors());

/* 
    Nova conexao com o asterisk 
*/
const ami = new asteriskManager(5038, server, 'cobranca', senha, true);
ami.keepConnected(); // Esta opcao tenta reconectar caso perca a conexao com o Asterisk

// Evento de quando a chamada entra na fila

// Evento de quando a chamada sai da fila (quando e atendida ou abandonada)


// Evento de quando a chamada e abandonada

  
//Evento de quando o membro da fila (agente) muda de status
ami.on('queuememberstatus', evt => {
    console.log("### Emitindo no canal "+evt.queue+" a mensagem: \r\n "+JSON.stringify(evt)+" \r\n \r\n \r\n");
    io.emit('status', evt);
});

ami.on('newstate', evt => {
    console.log("### Emitindo no canal "+evt.queue+" a mensagem: \r\n "+JSON.stringify(evt)+" \r\n \r\n \r\n");
    io.emit('status', evt);
});

// Evento de quando a chamada é atendida

// Evento de membros de uma fila (que so aparece quando voce da um queue show na fila)


// Evento de parametros de uma fila (que so aparece quando voce da um queue show na fila)



/*
    Criar a nossa rota
*/
app.get('/stats', function(req, res) {
    let queue = req.query.queue;

    if(queue != ""){
        ami.action({
            'action': 'QueueStatus',
            'queue': queue,
        }, function(err, res2){
            if(err){
                console.log("#### ERRO: "+JSON.stringify(err));
            }
    
            if(res2){
              res.statusCode = 200;
              res.send(res2);
            }
        });
    }
});



/* 
    Init do webserver
*/
http.listen(3000, () => {
    console.log("Backend is online in port 3000");
})
