// Tristan mit kuehlerschule anmelden
let klasse = ""
let losungen = []

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

    if (klasse === "1./ 2. Klasse") {
        console.log("Aufgaben 1/2")
        neue_aufgaben_12()}

    else if (klasse === "3./ 4. Klasse") {
        console.log("Aufgaben 3/4")
        neue_aufgaben_34()}
}

function neue_aufgaben_12() {
    let aufgaben = document.getElementById("aufgaben");
    aufgaben.innerHTML = ""; // Aufgabenfeld zurücksetzen
    losungen = []; // Lösungen zurücksetzen

    for (let i = 0; i < 5; i++) {
        let zahl1 = 0
        let zahl2 = 0
        let operatoren = ["+", "-"]
        let operator = operatoren[Math.floor(Math.random() * 2)]
        let losung = 0

        if (operator === "+") {
            zahl1 = Math.floor(Math.random() * 11) // 0-10
            zahl2 = Math.floor(Math.random() * 11)
            losung = zahl1 + zahl2

        } else if (operator === "-") {
            zahl1 = Math.floor(Math.random() * 10) + 1 // 1-10
            zahl2 = Math.floor(Math.random() * zahl1) // 0 - zahl1
            losung = zahl1 - zahl2
        }

        losungen.push(losung) // Lösung speichern

        aufgaben.innerHTML += "<p>" + zahl1 + " " + operator + " " + zahl2 +
            " = <input type='number' id='antwort" + i + "' /></p>"
    }
}

function neue_aufgaben_34() {
    let aufgaben = document.getElementById("aufgaben");
    aufgaben.innerHTML = "" // Aufgabenfeld zurücksetzen
    losungen = [] // Lösungen zurücksetzen

    for (let i = 0; i < 5; i++) {
        let zahl1 = 0
        let zahl2 = 0

        let operatoren = ["+", "-", "·", "÷"]
        let operator = operatoren[Math.floor(Math.random() * 4)]
        let losung = 0

        if (operator === "+") {
            zahl1 = Math.floor(Math.random() * 100) + 1 // 1-100
            zahl2 = Math.floor(Math.random() * (100-zahl1)) // damit es nicht über 100 geht
            losung = zahl1 + zahl2
        }
        else if (operator === "-") {
            zahl1 = Math.floor(Math.random() * 100) + 1
            zahl2 = Math.floor(Math.random() * zahl1) // 0-zahl1
            losung = zahl1 - zahl2
        }
        else if (operator === "·") {
            zahl1 = Math.floor(Math.random() * 10) + 1 // 1-10
            zahl2 = Math.floor(Math.random() * 10) + 1
            losung = zahl1 * zahl2
        }
        else if (operator === "÷") {
            zahl2 = Math.floor(Math.random() * 10) + 1; // 1-10
            losung = Math.floor(Math.random() * 10) + 1; // Ganze Zahl als Lösung
            zahl1 = losung * zahl2 // damit ganze zahl
        }

        losungen.push(losung) // Lösung in liste

        aufgaben.innerHTML += "<p>" + zahl1 + " " + operator + " " + zahl2 +
            " = <input type='number' id='antwort" + i + "' /></p>";
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
