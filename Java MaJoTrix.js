//Tristan mit kuehlerschule anmelden
let klasse = ""
let sternis = 0


document.getElementById('sternis').innerText = "Sternis:" + sternis

document.getElementById('hauptmenu').style.display='none'

function klasse_speichern(){
    let klasse = document.getElementById("wahleklasse").value;
    console.log(klasse)
    document.getElementById("klasse").innerText = "Ausgewählte Klasse: " + klasse
    zum_hauptmenu()

}

function zum_hauptmenu() {
    let klasse = document.getElementById('wahleklasse')
    document.getElementById('klassen-auswahl').style.display = 'none'
    document.getElementById('hauptmenu').style.display = 'block'
    console.log(klasse)
}

function zu_lernen(){
    document.getElementById('hauptmenu').style.display = 'none';
    document.getElementById('zu_lernen').style.display = 'block';

    if (klasse === "1./2._klasse") {
        neue_aufgaben_12()}
    if (klasse === "3./4._klasse"){
        neue_aufgaben_34()}

}

function neue_aufgaben_12() {
    let antwort = {}
    for (let i = 0; i < 5; i++) {
        let zahl1 = Math.floor(Math.random() * 10) + 1; // Zufallszahl zwischen 1 und 10
        let zahl2 = Math.floor(Math.random() * 10) + 1; // Zufallszahl zwischen 1 und 10
        let operator = Math.random() > 0.5 ? '+' : '-'; // Zufälliger Operator (+ oder -)

        if (operator === "+"){let losung=zahl1 + zahl2}
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






function spielen(){}

