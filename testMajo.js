document.getElementById('spiell').style.display = 'none'; // Spielbereich ausblenden

function spielenn() {
    document.getElementById('hauptmenuu').style.display = 'block'; // Hauptmenü ausblenden
    document.getElementById('spiell').style.display = 'block'; // Spielbereich einblenden
    starteSpiel();
}

function starteSpiel() {
    let spielDiv = document.getElementById('spiell');

// Hole das Canvas und den Zeichenkontext
    const canvas = document.getElementById('gameCanvass');
    const ctx = canvas.getContext('2d');

// Variablen
    let score = 0; // Zählt die gefangenen Äpfel
    const basket = {
        width: 80,
        height: 20,
        x: canvas.width / 2 - 60,  // Startposition in der Mitte
        y: canvas.height - 30,
        speed: 7
    };

    let apple = null;     // Aktuell fallender Apfel
    let gameOver = false; // Status des Spiels

// Variablen zur Steuerung (Pfeiltasten)
    let leftPressed = false
    let rightPressed = false;   //damit nicht direkt bewegt wird ohne zu tippen

// Event-Listener für Tastatureingaben
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    function keyDownHandler(e) {
        if (e.key === "ArrowLeft") {
            leftPressed = true;
        } else if (e.key === "ArrowRight") {
            rightPressed = true;
        }
    }

    function keyUpHandler(e) {
        if (e.key === "ArrowLeft") {
            leftPressed = false;
        } else if (e.key === "ArrowRight") {
            rightPressed = false;
        }
    }

// Erzeugt einen neuen Apfel mit zufälliger Position und Geschwindigkeit
    function spawnApple() {
        const radius = 15;
        const x = Math.random() * (canvas.width - 2 * radius) + radius;
        const y = -radius; // Start oberhalb des Canvas
        const speed = 2 + Math.random() * 3; // Geschwindigkeit zwischen 2 und 5
        apple = { x, y, radius, speed };
    }

// Prüft, ob der Apfel den Korb berührt (einfache Kollisionserkennung)
    function checkCollision(apple, basket) {
        if (
            apple.y + apple.radius >= basket.y &&                       // Apfel erreicht den Korb von oben
            apple.y - apple.radius <= basket.y + basket.height &&         // Apfel befindet sich nicht unter dem Korb
            apple.x + apple.radius >= basket.x &&                         // Apfel berührt die linke Seite des Korbs
            apple.x - apple.radius <= basket.x + basket.width             // Apfel berührt die rechte Seite des Korbs
        ) {
            return true;
        }
        return false;
    }

// Aktualisiert die Positionen der Objekte und prüft auf Kollisionen
    function update() {
        if (gameOver) return; // Stoppt das Update, falls das Spiel vorbei ist

        // Bewege den Korb entsprechend der gedrückten Pfeiltasten
        if (leftPressed) {
            basket.x -= basket.speed;
            if (basket.x < 0) basket.x = 0; // Nicht über den linken Rand hinaus
        }
        if (rightPressed) {
            basket.x += basket.speed;
            if (basket.x + basket.width > canvas.width) {
                basket.x = canvas.width - basket.width; // Nicht über den rechten Rand hinaus
            }
        }

        // Falls ein Apfel existiert, aktualisiere seine Position
        if (apple) {
            apple.y += apple.speed; // Apfel fällt nach unten

            // Prüfe, ob der Apfel gefangen wird
            if (checkCollision(apple, basket)) {
                score++; // Erhöhe den Score um 1
                apple = null;
                // Erzeuge nach einer kurzen, zufälligen Verzögerung einen neuen Apfel
                setTimeout(spawnApple, 500 + Math.random() * 1000);
            }
            // Falls der Apfel den unteren Rand erreicht, ohne gefangen zu werden, ist das Spiel vorbei
            else if (apple.y - apple.radius > canvas.height) {
                gameOver = true;
            }
        }
    }

// Zeichnet alle Elemente neu
    function draw() {
        // Leert das Canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Zeichnet den Korb als braunes Rechteck
        ctx.fillStyle = "brown";
        ctx.fillRect(basket.x, basket.y, basket.width, basket.height);

        // Zeichnet den Apfel als roten Kreis (falls vorhanden)
        if (apple) {
            ctx.beginPath();
            ctx.fillStyle = "red";
            ctx.arc(apple.x, apple.y, apple.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
        }

        // Zeichnet den Score oben links
        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.fillText("Score: " + score, 10, 25);

        // Falls das Spiel vorbei ist, zeige "Game Over"
        if (gameOver) {
            ctx.fillStyle = "black";
            ctx.font = "30px Arial";
            ctx.fillText("Leider ist das Spiel vorbei :(", canvas.width / 4 - 70, canvas.height / 2);
            ctx.fillText("Tippe Enter", canvas.width / 3 - 12, canvas.height / 1.5)
        }
    }

// Hauptspielschleife, die ständig aktualisiert und neu zeichnet
    function gameLoop() {
        update();  // Aktualisiere Positionen und prüfe auf Kollisionen
        draw();    // Zeichne alle Elemente neu
        if (!gameOver) {
            requestAnimationFrame(gameLoop); // Wiederhole die Schleife, solange das Spiel läuft
        }
    }

// Spielstart: Erzeuge den ersten Apfel und starte die Schleife
    spawnApple();
    gameLoop();

}
