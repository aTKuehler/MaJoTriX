// Tristan mit kuehlerschule anmelden

let klasse = "";
let losungen = [];

let sternis = 0;
document.getElementById("sternis").innerText = "Sternis: " + sternis + " ⭐"

function klassen_auswahl() {
    document.getElementById("klassen_auswahl").style.display = "block"
    document.getElementById("hauptmenu").style.display = "none"
    document.getElementById("lernen").style.display = "none"
}

function klasse_speichern() {
    klasse = document.getElementById("wahleklasse").value // Wert speichern
    console.log(klasse)
    document.getElementById("klasse").innerText = "Ausgewählte Klasse: " + klasse
}

function zum_hauptmenu() {
    klasse = document.getElementById("wahleklasse").value // Sicherstellen, dass der Wert gespeichert ist
    document.getElementById("klassen_auswahl").style.display = "none"
    document.getElementById("hauptmenu").style.display = "block"
    document.getElementById("lernen").style.display = "none"
    console.log(klasse)
}

function zu_lernen() {
    document.getElementById("klassen_auswahl").style.display = "none"
    document.getElementById("hauptmenu").style.display = "none"
    document.getElementById("lernen").style.display = "block"

    if (klasse === "12klasse") {
        console.log("Aufgaben")
        neue_aufgaben_12()
    } else if (klasse === "34klasse") {
        console.log("Aufgaben 3/4")
        neue_aufgaben_34()
    }
}

function neue_aufgaben_12() {
    let aufgaben = document.getElementById("aufgaben")
    aufgaben.innerHTML = "" // aufgabenfeld wird jedes mal zurückgesetzt
    losungen = [] // losungen auch

    for (let i = 0; i < 5; i++) {
        let zahl1 = Math.floor(Math.random() * 10) + 1
        let zahl2 = Math.floor(Math.random() * 10) + 1

        let operatoren = ["+", "-"]
        let operator = operatoren[Math.floor(Math.random() * 2)]

        if (operator === "-" && zahl1 < zahl2) {
            let neu = zahl1
            zahl1 = zahl2
            zahl2 = neu}

        let losung
        if (operator === "+") {losung = zahl1 + zahl2}
        if (operator === "-") {losung = zahl1 - zahl2}

        losungen.push(losung) // lösung speichern

        aufgaben.innerHTML += "<p>" + zahl1 + " " + operator + " " + zahl2 +
            ' = <input type="number" id="antwort' + i + '" /></p>'
    }
}

function neue_aufgaben_34() {
    let aufgaben = document.getElementById("aufgaben");
    aufgaben.innerHTML = ""; // Aufgabenfeld leeren
    losungen = []; // Lösungen zurücksetzen

    for (let i = 0; i < 5; i++) {
        let zahl1 = Math.floor(Math.random() * 50) + 1; // Zahl zwischen 1 und 50
        let zahl2 = Math.floor(Math.random() * 50) + 1; // Zweite Zahl zwischen 1 und 50
        let zahl3 = Math.floor(Math.random() * 10) + 1
        let zahl4 = Math.floor(Math.random() * 10) + 1

        let operatoren = ["+", "-", "·", "÷"]
        let zufallsIndex = Math.floor(Math.random() * 2)
        let operator = operatoren[zufallsIndex]; // Zufälliger Operator
        let richtige_antwort

        if (operator === "+") {
            richtige_antwort = zahl1 + zahl2}

        if (operator === "-" && zahl1 < zahl2){
                let neu = zahl1
                zahl1 = zahl2
                zahl2 = neu
        richtige_antwort = zahl1 - zahl2}

        if (operator === "·"){
            richtige_antwort = zahl3 * zahl4
        }


        losungen.push(richtige_antwort); // Lösung speichern

        aufgaben.innerHTML += "<p>" + zahl1 + " " + operator + " " + zahl2 +
            ' = <input type="number" id="antwort' + i + '" /></p>';
    }
}

function antwort_prufen() {
    let richtigeAntworten = 0

    for (let i = 0; i < losungen.length; i++) {
        let eingabefeld = document.getElementById("antwort" + i);
        let antwort = eingabefeld.value
        let losung = losungen[i]

        if (antwort == losungen[i]) {
            eingabefeld.style.backgroundColor = "lightgreen";
            richtigeAntworten += 1}
        else {
            eingabefeld.style.backgroundColor = "lightcoral"
            }

        eingabefeld.readOnly = true; // **Eingabefeld sperren**

    }

    if (richtigeAntworten === losungen.length) {
        alert("Perfekt! Du hast alle Aufgaben richtig und bekommst einen Sterni ⭐")
        sternis += 1}
    else{alert("Du hast " + richtigeAntworten + " von " + losungen.length + " Aufgaben richtig!")}

    document.getElementById("sternis").innerText = "Sternis: " + sternis
}

function spielen() {}

klassen_auswahl()
