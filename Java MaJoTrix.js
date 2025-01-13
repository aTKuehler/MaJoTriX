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
    document.getElementById('klassen-auswahl').style.display = 'none'
    document.getElementById('hauptmenu').style.display = 'block'
}

function lernen(){}

function spielen(){}

