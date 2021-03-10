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

// 0 Variabili

var facile = document.getElementById('easy');
var media = document.getElementById('medium');
var difficile = document.getElementById('hard');
var impostaDifficolta = document.getElementById('impostadifficolta'); // variabile tasto difficoltà
var verificaNumero = document.getElementById('verificanumero'); // variabile tasto verifica numero
var numeroUtente = document.getElementById('numeroutente'); // variabile input numero utente
verificaNumero.disabled = true;
numeroUtente.disabled = true;
var totNumeri = 0; // variabile range numeri da poter inserire
var numeriComputer = []; // array numeri 'bomba'
var numeriUtente = []; // array numeri inseriti dall'utente
var y = 0; // variabile punteggio
var risultato = document.getElementById('risultato');
var numeriInseriti = document.getElementById('numeriinseriti');

// 1. Scelta difficoltà

impostaDifficolta.addEventListener('click',
function () {
  impostaDifficolta.disabled = true; // disabilita pulsante difficoltà
  facile.disabled = true, media.disabled = true, difficile.disabled = true; // disabilità i radio buttons delle difficoltà
  verificaNumero.disabled = false, numeroUtente.disabled = false; // abilita il tasto verifica numero e l'input text
  impostadifficolta.classList.add('btn_no-drop');
  if ( !(facile.checked) && !(media.checked) && !(difficile.checked) ) { // controllo che sia stata effettuata una scelta
    alert("Seleziona un opzione.");
    impostadifficolta.classList.remove('btn_no-drop');
    impostaDifficolta.disabled = false; // riabilita il tasto difficoltà
    facile.disabled = false, media.disabled = false, difficile.disabled = false; // riabilita i radio buttons delle difficoltà
    verificaNumero.disabled = true, numeroUtente.disabled = true; // disabilita il tasto verifica numero e l'input text
  } else if ( facile.checked ){
    totNumeri = parseInt(facile.value); // imposta la difficoltà su facile
  } else if ( media.checked ) {
    totNumeri = parseInt(media.value); // imposta la difficoltà su media
  } else if ( difficile.checked ) {
    totNumeri = parseInt(difficile.value); // imposta la difficoltà su difficile
  }

  if ( totNumeri != 0 ) {
    document.getElementById('totalenumeri').innerHTML = "Adesso inserisci un numero tra 1 e " + totNumeri + ".";
    var x;
    while ( numeriComputer.length < 16 ) { // riempio l'array di numeri bomba senza doppioni
      x = numeroRandom(1, totNumeri);
      if ( !(inArray(numeriComputer, x)) ) {
        numeriComputer.push(x);
      }
    }
  }
  console.log(totNumeri);
  console.log(numeriComputer);
  if ( (verificaNumero.disabled == false) && (numeroUtente.disabled == false) ) {
    verificaNumero.classList.remove('btn_no-drop');
    numeroUtente.classList.remove('btn_no-drop');
  }
}
);
console.log(numeriComputer);

// 3. Verifica numero inserimento

verificaNumero.addEventListener('click',
function () {
  numUtente = parseInt(numeroUtente.value);  // trasformo il valore dell'input text in numero
  if ( !isNaN(numUtente)) { // controllo che l'utente abbia inserito un numero
    console.log(numUtente);
    numeroUtente.value = ""; // pulisco l'input text
    if ( numUtente <= totNumeri && numUtente >= 1){ // controllo che il numero inserito rientri nel range prestabilito
      if ( inArray(numeriComputer, numUtente )) { // controllo se il numero inserito è un numero bomba
        risultato.innerHTML = "Hai perso!" // stampo messaggio di sconfitta
        risultato.className = " visible red" // parte animazione sconfitta
        verificaNumero.classList.remove('btn_no-drop');
        numeroUtente.classList.remove('btn_no-drop');
        verificaNumero.disabled = true; // disabilito il tasto verifica numero
        numeroUtente.disabled = true; // disabilito input text
      } else if ( inArray(numeriUtente, numUtente)) { // controllo se il numero inserito dall'utente è gia stato inserito precedentemente
        alert("Numero già inserito.");
      } else {
        y++; // aggiorno variabile punteggio
        numeriUtente.push(numUtente); // aggiungo numero nell'array dei numeri inseriti dall'utente
        numeriInseriti.innerHTML += "<li>" + numUtente + "</li>";
      }

    } else {
    alert("Inserisci un numero compreso tra 1 e " + totNumeri); // messaggio di inserimento numero non rispettante il range
    }
  } else {
  alert("Inserisci un numero valido."); // messaggio numero non valido
}
if ( y == (totNumeri - 16 )) { // controllo se l'utente ha vinto
  risultato.innerHTML = "Hai vinto!" // stampo messaggio vittoria
  risultato.className = " visible green" // parte animazione vittoria
}
document.getElementById('punteggio').innerHTML = y; // stampo punteggio
}
);
