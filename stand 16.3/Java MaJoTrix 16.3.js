// Tristan mit kuehlerschule anmelden
let klasse = ""

let sternis = localStorage.getItem("sternis") ? parseInt(localStorage.getItem("sternis")) : 10 //sternis werden lokal gespeichert, falls man soäter weiterspielen will
document.getElementById("sternis").innerText = "Sternis: " + sternis + " ⭐"



let losungen = []

function sternis_zurücksetzen(){
    document.getElementById("sternis_zurücksetzen").disabled = true

    sternis = 0
    localStorage.setItem("sternis", sternis) // speichern
    document.getElementById("sternis").innerText = "Sternis: " + sternis + " ⭐"//aktualisieren
}

function klassen_auswahl() {
    document.getElementById("klassen_auswahl").style.display = "block"
    document.getElementById("hauptmenu").style.display = "none"
    document.getElementById("einstellungen").style.display = "none"
    document.getElementById("lernen").style.display = "none"
    document.getElementById('spiel').style.display = 'none'
}

function klasse_speichern() {
    klasse = document.getElementById("wahleklasse").value // Wert speichern
    document.getElementById("klasse").innerText = "Ausgewählte Klasse: " + klasse
    console.log(klasse)
}

function zum_hauptmenu() {
    klasse = document.getElementById("wahleklasse").value // Sicherstellen, dass der Wert gespeichert ist
    document.getElementById("klassen_auswahl").style.display = "none"
    document.getElementById("hauptmenu").style.display = "block"
    document.getElementById("einstellungen").style.display = "none"
    document.getElementById("lernen").style.display = "none"
    document.getElementById('spiel').style.display = 'none'

    document.getElementById("sternis_zurücksetzen").disabled = false

    document.getElementById("sternis").innerText = "Sternis: " + sternis + " ⭐" //
    document.getElementById("klasse").innerText = "Deine Klasse: " + klasse

    if (sternis === 0){document.getElementById("keine_sterne").innerText ="Du hast keine Sternis ⭐ mehr! 😟"}
}

function zu_einstellungen(){
    document.getElementById("klassen_auswahl").style.display = "none"
    document.getElementById("hauptmenu").style.display = "none"
    document.getElementById("einstellungen").style.display = "block"
    document.getElementById("lernen").style.display = "none"
    document.getElementById('spiel').style.display = 'none'
}

function zu_lernen(){
    document.getElementById("klassen_auswahl").style.display = "none"
    document.getElementById("hauptmenu").style.display = "none"
    document.getElementById("einstellungen").style.display = "none"
    document.getElementById("lernen").style.display = "block"

    document.getElementById("ruckmeldung").innerHTML = 'Wenn du fertig bist, drücke auf "Antwort prüfen 🔎"!'
    document.getElementById("prufen_button").disabled = false
    document.getElementById("neue_aufgaben").disabled = true

    if (klasse === "1./ 2. Klasse") {
        console.log("Aufgaben 1/2")
        neue_aufgaben_12()}

    else if (klasse === "3./ 4. Klasse") {
        console.log("Aufgaben 3/4")
        neue_aufgaben_34()}
}

function neue_aufgaben_12() {
    let aufgaben = document.getElementById("aufgaben")
    aufgaben.innerHTML = "" // Aufgabenfeld zurücksetzen
    losungen = [] // Lösungen zurücksetzen

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
    let aufgaben = document.getElementById("aufgaben")
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
            zahl2 = Math.floor(Math.random() * 10) + 1 // 1-10
            losung = Math.floor(Math.random() * 10) + 1 // Ganze Zahl als Lösung
            zahl1 = losung * zahl2 // damit ganze zahl
        }

        losungen.push(losung) // Lösung in liste

        aufgaben.innerHTML += "<p>" + zahl1 + " " + operator + " " + zahl2 +
            " = <input type='number' id='antwort" + i + "' /></p>"
    }
}

function antwort_prufen() {
    let ruckmeldung = document.getElementById("ruckmeldung");
    ruckmeldung.innerHTML = ""

    let richtigeAntworten = 0

    for (let i = 0; i < losungen.length; i++) {
        let eingabefeld = document.getElementById("antwort" + i)
        let antwort = eingabefeld.value
        let losung = losungen[i]

        if (antwort == losungen[i]) { //== wegen unterschiedlichen datentypen string gegen int
            eingabefeld.style.backgroundColor = "lightgreen"
            richtigeAntworten += 1}
        else {
            eingabefeld.style.backgroundColor = "lightcoral"

            let losungText = document.createElement("span") //Text-Element das dann in der selben zeile wie die aufgabe bleibt
            losungText.innerText = " → Lösung: " + losung
            losungText.style.color = "green"
            eingabefeld.parentNode.appendChild(losungText)} //parentNode nimmt große Element also aufgabe&eingabefeld //appendchild hängt an das große element ein neues Element (losungText)

        eingabefeld.readOnly = true // eingabefeld sperren

    }

    if (richtigeAntworten === losungen.length) {
        ruckmeldung.innerHTML += "Super! 🎉 Du hast alle Aufgaben richtig und bekommst einen Sterni ⭐"
        sternis += 1
        localStorage.setItem("sternis", sternis)}

    else{ruckmeldung.innerHTML += "Du hast " + richtigeAntworten + " von " + losungen.length + " Aufgaben richtig!"}

    document.getElementById("sternis").innerText = "Sternis: " + sternis
    document.getElementById("prufen_button").disabled = true

    document.getElementById("neue_aufgaben").disabled = false
}

function spielen() {

    if (sternis > 0) {
        document.getElementById("sternis").innerText = "Sternis: " + sternis + " ⭐"
        localStorage.setItem("sternis", sternis)
        sternis = sternis - 1
        localStorage.setItem("sternis", sternis)
        document.getElementById("sternis").innerText = "Sternis: " + sternis + " ⭐"
        startSpiel()}

    else {console.log("Keine Sternis")}
}

function startSpiel() {
    document.getElementById("klassen_auswahl").style.display = "none"
    document.getElementById('hauptmenu').style.display = "none"
    document.getElementById("einstellungen").style.display = "none"
    document.getElementById("lernen").style.display = "none"
    document.getElementById('spiel').style.display = 'block'


    const canvas = document.getElementById('gameCanvas')
    const ctx = canvas.getContext('2d')

    let score = 0
    let gameOver = false

    let badItemActive = true
    let badItemRespawning = false

    const basket = {
        width: 80,
        height: 20,
        x: canvas.width / 2 - 40,
        y: canvas.height - 30,
        speed: 7
    }

    let apple = {
        x: Math.random() * (canvas.width - 30) + 15,
        y: -15,
        radius: 15,
        speed: 2 + Math.random() * 3
    }

    let badItem = {
        x: Math.random() * (canvas.width - 30) + 15,
        y: -15,
        radius: 15,
        speed: 2 + Math.random() * 3
    }

    let leftPressed = false
    let rightPressed = false

    document.addEventListener("keydown", keyDown)
    document.addEventListener("keyup", keyUp)

    function keyDown(e) {
        if (e.key === "ArrowLeft") leftPressed = true
        if (e.key === "ArrowRight") rightPressed = true
    }

    function keyUp(e) {
        if (e.key === "ArrowLeft") leftPressed = false
        if (e.key === "ArrowRight") rightPressed = false
    }

    function update() {
        if (leftPressed) {
            basket.x -= basket.speed
            if (basket.x < 0) basket.x = 0
        }
        if (rightPressed) {
            basket.x += basket.speed
            if (basket.x + basket.width > canvas.width)
                basket.x = canvas.width - basket.width
        }

        apple.y += apple.speed

        if (
            apple.y + apple.radius >= basket.y &&
            apple.x + apple.radius >= basket.x &&
            apple.x - apple.radius <= basket.x + basket.width
        ) {
            score++
            apple.x = Math.random() * (canvas.width - 30) + 15
            apple.y = -15
            apple.speed = 5 + Math.random() * 2
        } else if (apple.y - apple.radius > canvas.height) {
            gameOver = true
        }

        badItem.y += badItem.speed

        if (badItemActive &&
            badItem.y + badItem.radius >= basket.y &&
            badItem.x + badItem.radius >= basket.x &&
            badItem.x - badItem.radius <= basket.x + basket.width
        ) {
            gameOver = true
        } else if (badItem.y - badItem.radius > canvas.height && !badItemRespawning) {
            badItemRespawning = true
            badItemActive = false
            setTimeout(() => {
                let newX
                do {
                    newX = Math.random() * (canvas.width - 30) + 15
                } while (Math.abs(newX - apple.x) < 50)

                badItem.x = newX
                badItem.y = -15
                badItem.speed = 2 + Math.random() * 3
                badItemActive = true
                badItemRespawning = false
            }, 2000)
        }
    }

    function zeichnen() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = "brown"
        ctx.fillRect(basket.x, basket.y, basket.width, basket.height)

        ctx.fillStyle = "red"
        ctx.beginPath()
        ctx.arc(apple.x, apple.y, apple.radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.closePath()

        ctx.fillStyle = "blue"
        ctx.beginPath()
        ctx.arc(badItem.x, badItem.y, badItem.radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.closePath()

        ctx.fillStyle = "black"
        ctx.font = "20px Arial"

        ctx.fillText("Score: " + score + " | Sternis ⭐: " + sternis, 10, 25)

        if (gameOver) {
            document.getElementById("nochmal_spielen").disabled = false
            ctx.font = "30px Arial"
            ctx.fillText("Game Over", canvas.width / 2 - 80, canvas.height / 2)
        }
        else{document.getElementById("nochmal_spielen").disabled = true}
    }

    function gameLoop() {
        if (!gameOver) {
            update();
            zeichnen();
            requestAnimationFrame(gameLoop);
        } else {
            zeichnen();
        }
    }

    gameLoop()
}

klassen_auswahl()
