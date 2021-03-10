// Il computer deve generare 16 numeri casuali tra 1 e 100.
// I numeri non possono essere duplicati.
// In seguito deve chiedere all’utente (100 - 16) volte di inserire un numero alla volta, sempre compreso tra 1 e 100.
// L’utente non può inserire più volte lo stesso numero.
// Se il numero è presente nella lista dei numeri generati, la partita termina, altrimenti si continua chiedendo all’utente un altro numero.
// La partita termina quando il giocatore inserisce un numero “vietato” o raggiunge il numero massimo possibile di numeri consentiti.
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha inserito un numero consentito.

// BONUS:
// all’inizio il software richiede anche una difficoltà all’utente che cambia il range di numeri casuali:
// con difficoltà 0 => tra 1 e 100
// con difficoltà 1 => tra 1 e 80
// con difficoltà 2 => tra 1 e 50

// FUNZIONI
// Generatore di numeri casuali
function numeroRandom(min, max) {
  var numRandom = Math.floor(Math.random() * (max - min + 1) + min);
  return numRandom;
}

// Controllo presenza di un elemento in un array
function inArray(array, elemento) {
  var i = 0;
  while ( i < array.length ){
    if ( array[i] == elemento ) {
      return true;
    }
    i++;
  }

  return false;
}

// 0 Scelta difficoltà
var difficolta; // variabile difficolta
var totNumeri = 100; // variabile totale numeri in base alla difficolta
do {
  difficolta = prompt("Inserisci un grado di difficoltà: Facile - Media - Difficile ");
  difficolta = difficolta.toLowerCase();
} while ( difficolta != "facile" && difficolta != "media" && difficolta != "difficile" );

if ( difficolta == "media" ) {
  totNumeri = 80;
} else if ( difficolta == "difficile" ) {
  totNumeri = 50;
}

console.log("Difficoltà impostata: " + (difficolta[0].toUpperCase() + difficolta.substring(1)) + ";" + " Numeri da 1 a " + totNumeri);
// 1. Creo un array con i numeri 'bomba'
var numeriComputer = [];
var x;
while ( numeriComputer.length < 16 ) {
  x = numeroRandom(1, totNumeri);
  if ( !(inArray(numeriComputer, x)) ) {
    numeriComputer.push(x);
  }
}
console.log("Numeri bomba " + numeriComputer);

// 2. Richiesta inserimento numero all'utente
var numeriUtente = []; //array di tutti i numeri inseriti dall'utente
var numUtente = 0;
var y = 0; // variabile punteggio
var esito = true;
do {
  numUtente = parseInt(prompt("Inserisci un numero da 1 a " + totNumeri));
  if ( !isNaN(numUtente) ) {  //controllo se l'utente ha inserito un numero
    if ( numUtente <= totNumeri && numUtente >= 1 ) { // controllo se l'utente ha inserito un numero valido
      if ( inArray(numeriComputer, numUtente)){ // controllo se l'utente ha inserito un numero 'bomba'
        alert("Hai perso!");
        esito = false;
        console.log("Punteggio: " + y);
      } else if ( inArray(numeriUtente, numUtente ) ) { // controllo se l'utente ha inserito lo stesso numero più volte
        alert("Numero già inserito");
      } else {
        y++; // aggiorno punteggio utente
        numeriUtente.push(numUtente);
      }
    } else {
      alert("Inserisci un numero compreso tra 1 e " + totNumeri);
    }
  }
} while (  ( esito == true ) && ( y < ( totNumeri - 16 )) );

console.log("Numeri inseriti dall'utente: " + numeriUtente);
// 3. Controllo vittoria
if ( y == ( totNumeri - 16) ) {
  console.log("Hai vinto!! Hai totalizzato " + y + " punti!");
}
