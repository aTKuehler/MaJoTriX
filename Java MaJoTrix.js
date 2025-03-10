//Tristan mit kuehlerschule anmelden
let klasse = ""
let sternis = 0

document.getElementById('sternis').innerText = "Sternis:" + sternis


// HIER SCHEITERTS AN DER IF FUNKTION!!!
    if (klasse === "1./2._klasse") {
        console.log("Aufgaben")
        neue_aufgaben_12()}
    if (klasse === "3./4._klasse"){
        console.log("Aufgaben 3/4")
        neue_aufgaben_34()}

}

function neue_aufgaben_12() {
    let aufgaben = document.getElementById("aufgaben")
    console.log("Aufgaben")
    aufgaben.innerHTML = "hallo"


    for (let i = 0; i < 3; i++) {
        let zahl1 = Math.floor(Math.random() * 10) + 1; // Zufallszahl zwischen 1 und 10
        let zahl2 = Math.floor(Math.random() * zahl1) + 1; // Zufallszahl zwischen 1 und zahl1, Somit ist zahl2 kleiner als zahl1

        aufgaben.innerHTML += "<p>${zahl1} + ${zahl2}<p>"


    }



}

function neue_aufgaben_34() {
    for (let i = 0; i < 5; i++) {
        let zahl1 = Math.floor(Math.random() * 50) + 1; // Zufallszahl zwischen 1 und 50
        let zahl2 = Math.floor(Math.random() * 50) + 1; // Zufallszahl zwischen 1 und 50
        let operator = Math.random() > 0.5 ? '+' : '-'; // Zufälliger Operator (+ oder -)
        let richtige_antwort = (operator === '+') ? zahl1 + zahl2 : zahl1 - zahl2;
    }
}

function antwort_prufen(){


}







klassen_auswahl()