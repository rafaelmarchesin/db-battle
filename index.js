/* Application created to compare differences between SQL and NoSQL databases */


function menu () {
    console.log('\n============== MENU ==============\n')
    console.log('1 - popular Banco de Dados MySQL')
    console.log('2 - popular Banco de Dados MongoDB')
    console.log('3 - Ler dados do BD MySQl')
    console.log('4 - Ler dados do BD MongoDB\n')
    console.log('============== MENU ==============')
    console.log('\n')
}

menu()

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
        const mysql = require('mysql')
        const conn = mysql.createConnection({
            host: 'localhost:3306',
            user: 'root',
            password: 'root',
            database: 'battle'
        })
        
        conn.connect(() => {  })

        const timerBegin = new Date()

        const numRegistros = 100000
        for ( let i = 0; i <= numRegistros; i++ ) {
            conn.query('INSERT INTO `clientes` (`idCliente`,`nomeCliente`) VALUES (\'\',"Cliente' + i + '");')
            console.log(`Cliente ${ i }`)
        }

        /*
         * ==== Iniciar laço FOR
         * 
         *      >>> Alimentação do BD <<<
         * 
         * ==== Finalizar laço FOR
         */
        const timerEnd = new Date()
        const tempoFinal = (timerEnd - timerBegin) / 1000
        console.log(`Tempo de execussão: ${ (tempoFinal) / 1000 }sec`)
        console.log(`${ numRegistros / tempoFinal } registros/sec`)
        
         conn.end(() => {  })

        
      break;
    /* Encerra comando "Popular Banco de Dados MySQL" */


    case '2':
        console.log('Opção 2')
        break

    case '3':
        console.log('Opção 3')
        break
    
    case '4':
        console.log('Opção 4')
        break
    
    case 'menu':
        menu()
        break

    case 'ajuda':
        console.log('\n============== AJUDA ==============\n')
        console.log('ajuda      -->    Exibe ajuda')
        console.log('menu       -->    Exibe o menu')
        console.log('Ctrl+ C    -->    Encerra a aplicação')
        console.log('\n============== AJUDA ==============')
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