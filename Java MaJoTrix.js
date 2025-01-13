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
}

function lernen(){
    document.getElementById('hauptmenu').style.display = 'none';
    document.getElementById('lernen').style.display = 'block';
    neue_aufgaben();
}

function neue_aufgaben(){
    for (let i = 0; i < 5; i++) {
        let zahl1 = Math.floor(Math.random() * 10) + 1; // Zufallszahl zwischen 1 und 10
        let zahl2 = Math.floor(Math.random() * 10) + 1; // Zufallszahl zwischen 1 und 10
        let operator = Math.random() > 0.5 ? '+' : '-'; // Zufälliger Operator (+ oder -)
        let richtige_antwort = (operator === '+') ? zahl1 + zahl2 : zahl1 - zahl2;
}
}











function spielen(){}

