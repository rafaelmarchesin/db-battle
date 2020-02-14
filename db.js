/* Estabelecendo a conexão */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/battle', {useNewUrlParser: true, useUnifiedTopology: true});


/* Retorna se a conexão foi estabelecida com sucesso ou não */
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
});

/* Criando o esquema de dados gravados */
var esquemaCliente = new mongoose.Schema({
    name: String
  })

var Cliente = mongoose.model('Cliente', esquemaCliente);

var nomeCliente = new Cliente({ name: 'Artur' });
console.log(nomeCliente.name); // 'Artur