/* Application created to compare differences between SQL and NoSQL databases */

const numRegistros = 100000

/* === BEGIN MENU === */
function menu () {
    console.log('\n============== MENU ==============\n')
    console.log('1 - Popular Banco de Dados MySQL')
    console.log('2 - Popular Banco de Dados MongoDB')
    console.log('3 - Ler dados do BD MySQl')
    console.log('4 - Ler dados do BD MongoDB')
    console.log('5 - Exibe Vencedor')
    console.log('6 - ...\n')
    console.log('============== MENU ==============')
    console.log('\n')
}
/* === END MENU === */

menu()

/* === BEGIN EXTRA MENU === */
function menuMais () {
    console.log('\n============== ... ==============\n')
    console.log('"menu" - Acessa o menu')
    console.log('"ajuda" - Acessa a ajuda ...\n')
    console.log('============== ... ==============')
    console.log('\n')
}
/* === END EXTRA MENU === */

let registrosPorSegundoMySQL = 0

/* === BEGIN MYSQL CONNECTION FUNCTION === */
function registrosMySQL (param) {
    const mysql = require('mysql')
        const conn = mysql.createConnection({
            host: 'localhost:3306',
            user: 'root',
            password: 'root',
            database: 'battle'
        })
        
        conn.connect(() => { })

        const timerBegin = new Date()

        if( param == '1' || param == '1 -h' ) {
            for ( let i = 0; i <= numRegistros; i++ ) {
                conn.query(`INSERT INTO clientes (idCliente, nomeCliente) VALUES ("${ i }","Cliente${ i }")`)
                
                if ( param == '1 -h' ) {
                    console.log(`Cliente ${ i }`)
                }
            }
        }
        
        if ( param == '3' || param == '3 -h' ) {
            /* ==================================== */
            conn.query("SELECT idCliente FROM clientes;", function (err, result, fields) {
                if (err) throw err
                console.log(result)
            })
            /* ==================================== */
        }

        

        const timerEnd = new Date()
        const tempoFinal = (timerEnd - timerBegin) / 1000

        registrosPorSegundoMongoDB = numRegistros / tempoFinal

        console.log(`Tempo de execussão: ${ (tempoFinal) / 1000 }sec`)
        console.log(`${ registrosPorSegundoMongoDB } registros/sec`)


        

        
        
        conn.end(() => {  })
}
/* === END MYSQL CONNECTION FUNCTION === */

let registrosPorSegundoMongoDB = 0

/* === BEGIN MONGODB CONNECTION FUNCTION */
function registrosMongoDB (param) {
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

    const timerBegin = new Date()

    if ( param == '2' || param == '2 -h' ){
        for ( let i = 0; i <= numRegistros; i++ ) {
            
    
            var nomeCliente = new Cliente({ name: `Cliente${ i }` });
            
            if ( param == '2 -h' ){
                console.log(nomeCliente.name)
            }
        }
    }

    if ( param == '4' || param == '4 -h' ) {
        
        for ( let i = 0; i <= numRegistros; i++ ) {
            let teste = Cliente.find({ name: `Cliente${ i }` })
            
            if ( param == '4 -h' ) {
                console.log(teste._conditions.name)
            }
        }
    }

    const timerEnd = new Date()
    const tempoFinal = (timerEnd - timerBegin) / 1000

    registrosPorSegundoMongoDB = numRegistros / tempoFinal

    console.log(`Tempo de execussão: ${ (tempoFinal) / 1000 }sec`)
    console.log(`${ registrosPorSegundoMongoDB } registros/sec`)

}
/* === END MONGODB CONNECTION FUNCTION */

/* === BEGIN COMAND LINE === */

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> '
});

rl.prompt();

rl.on('line', (line) => {
  switch (line.trim()) {

    /* Inicia comando "Popular Banco de Dados MySQL" */
    case '1':
        registrosMySQL('1')
        break;
    /* Encerra comando "Popular Banco de Dados MySQL" */

    case '1 -h':
        registrosMySQL('1 -h')
        break

    case '2':
        
        registrosMongoDB('2')

        break

    case '2 -h':
    
        registrosMongoDB('2 -h')
        break

    case '3':
        registrosMySQL('3')
        break

    case '3 -h':
        registrosMySQL('3 -h')
        break
    
    case '4':
        registrosMongoDB('4')
        break
    
    case '4 -h':
        registrosMongoDB('4 -h')
        break

    case '5':
        if ( registrosPorSegundoMySQL < registrosPorSegundoMongoDB ) {
            console.log('\n========== VENCEDOR ==========')
            console.log('=                            =')
            console.log('=          MongoDB           =')
            console.log('=                            =')
            console.log('========== VENCEDOR ==========\n')
            break
        } else {
            console.log('\n========== VENCEDOR ==========')
            console.log('=                            =')
            console.log('=           MySQL            =')
            console.log('=                            =')
            console.log('========== VENCEDOR ==========\n')
            break
        }
        

    case '6':
        menuMais()
        break
    
    case 'menu':
        menu()
        break

    case 'ajuda':
        console.log('\n================ AJUDA ================\n')
        console.log('    ajuda    -->    Exibe ajuda')
        console.log('     menu    -->    Exibe o menu\n')
        console.log('       -h    -->    Imprime registros\n')
        console.log('  Ctrl+ C    -->    Encerra a aplicação')
        console.log('\n================ AJUDA ================')
        break

    default:
      console.log(`'${line.trim()}' não é uma opção válida.`);
      break;
  }
  rl.prompt();
}).on('close', () => {
  console.log('Tchau');
  process.exit(0);
});

/* === END COMAND LINE === */