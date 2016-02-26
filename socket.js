module.exports = function (io, twit)  
{
    /**
    * Retorna tweets a partir do track fornecido
    **/
    function createStream (keyword) {
        var stream = twit.stream('statuses/filter', {track : keyword}); 
        stream.on('tweet', function (tweet)
        {
            io.sockets.emit('twitter-stream', tweet);
        });
        return stream; 
    }

    var stream          = null, // Variável Global para stream
        searchWord      = null, // Variável Global para palavra procurada
        activeSocket    = false; // Determina o status do Socket (true = procurar tweets; false = parar de procurar)

    /*
    *   Abre uma nova Conexão através do socket
    */
    io.sockets.on('connection', function (socket) 
    {    
        activeSocket = true; //definindo true para realizar a stream
        console.log('Socket Connected');        

        /*
        *   Client envia um pedido para parar stream
        */
        socket.on('streaming-stop', function (setFalse)
        {
            var activeSocket = setFalse;

            if (stream !== null && activeSocket === false)
            {   
                stream.stop(); // Para a stream
                stream = null; // Seta a variavel que guarda o stream para o estado inicial
                console.log('Stopped from searching tweets!');
            }
        });

        /*
        *   Client envia um pedido de busca pela palavra keyword   
        */
        socket.on('keyword-change', function (keyword){   
            if (stream !== null){   // se já houver uma stream ativa, ele a finaliza
                stream.stop();
            }
            searchWord = keyword;
            stream = createStream(searchWord); // Cria uma nova stream com a palavra passada por parametro
            console.log('Searching tweets with keyword: ' + searchWord);
        });
    });    

}
