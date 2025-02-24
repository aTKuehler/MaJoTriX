// Spielbereich zunächst ausblenden
document.getElementById('spiel').style.display = 'none';

function spielen() {
    // Hauptmenü ausblenden und Spielbereich einblenden
    document.getElementById('hauptmenu').style.display = 'none';
    document.getElementById('spiel').style.display = 'block';
    startGame();
}

function startGame() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    let score = 0;
    let gameOver = false;

    // Flag, ob das blaue Objekt aktuell aktiv (also kollisionsrelevant) ist
    let badItemActive = true;
    // Flag, damit beim Respawn des blauen Objekts nicht mehrfach der setTimeout gestartet wird
    let badItemRespawning = false;

    // Korb-Objekt mit Position, Größe und Geschwindigkeit
    const basket = {
        width: 80,
        height: 20,
        x: canvas.width / 2 - 40,
        y: canvas.height - 30,
        speed: 7
    };

    // Apfel-Objekt (das man einsammeln darf) – sieht jetzt mehr wie ein Apfel aus
    let apple = {
        x: Math.random() * (canvas.width - 30) + 15,
        y: -15,
        radius: 15,
        speed: 2 + Math.random() * 3
    };

    // Neues Objekt, das man nicht einsammeln darf (wird in blau dargestellt)
    let badItem = {
        x: Math.random() * (canvas.width - 30) + 15,
        y: -15,
        radius: 15,
        speed: 2 + Math.random() * 3
    };

    // Steuerung per Pfeiltasten
    let leftPressed = false;
    let rightPressed = false;

    // Event-Listener für Tastatureingaben
    document.addEventListener("keydown", keyDown);
    document.addEventListener("keyup", keyUp);

    function keyDown(e) {
        // Neustart mit Leertaste, wenn das Spiel vorbei ist
        if (gameOver && e.key === " ") {
            document.removeEventListener("keydown", keyDown);
            startGame();
            return;
        }
        if (e.key === "ArrowLeft") leftPressed = true;
        if (e.key === "ArrowRight") rightPressed = true;
    }

    function keyUp(e) {
        if (e.key === "ArrowLeft") leftPressed = false;
        if (e.key === "ArrowRight") rightPressed = false;
    }

    // Aktualisiere Positionen und prüfe Kollisionen
    function update() {
        // Korb bewegen
        if (leftPressed) {
            basket.x -= basket.speed;
            if (basket.x < 0) basket.x = 0;
        }
        if (rightPressed) {
            basket.x += basket.speed;
            if (basket.x + basket.width > canvas.width)
                basket.x = canvas.width - basket.width;
        }

        // Apfel fällt
        apple.y += apple.speed;

        // Kollision: Apfel berührt den Korb?
        if (
            apple.y + apple.radius >= basket.y &&
            apple.x + apple.radius >= basket.x &&
            apple.x - apple.radius <= basket.x + basket.width
        ) {
            score++;
            // Setze den Apfel zurück an den Anfang
            apple.x = Math.random() * (canvas.width - 30) + 15;
            apple.y = -15;
            apple.speed = 5 + Math.random() * 2;
        }
        // Apfel verfehlt den Korb: Spielende
        else if (apple.y - apple.radius > canvas.height) {
            gameOver = true;
        }

        // badItem fällt
        badItem.y += badItem.speed;

        // Kollision: badItem berührt den Korb? (nur prüfen, wenn aktiv)
        if (badItemActive &&
            badItem.y + badItem.radius >= basket.y &&
            badItem.x + badItem.radius >= basket.x &&
            badItem.x - badItem.radius <= basket.x + basket.width
        ) {
            gameOver = true;
        }
        // badItem verfehlt den Korb: Neu spawnen (nur einmal pro Zyklus)
        else if (badItem.y - badItem.radius > canvas.height && !badItemRespawning) {
            badItemRespawning = true;
            badItemActive = false; // Deaktiviere Kollisionsprüfung während der Wartezeit
            setTimeout(() => {
                let newX;
                do {
                    newX = Math.random() * (canvas.width - 30) + 15;
                } while (Math.abs(newX - apple.x) < 50); // Mindestabstand von 50px zum Apfel

                badItem.x = newX;
                badItem.y = -15;
                badItem.speed = 2 + Math.random() * 3;
                badItemActive = true;  // Reaktiviere Kollisionsprüfung
                badItemRespawning = false;
            }, 2000);
        }
    }

    // Zeichnet den Korb mit zwei Seitenlinien, die höher gezeichnet werden
    function drawBasket() {
        // Hauptteil des Korbs
        ctx.fillStyle = "brown";
        ctx.fillRect(basket.x, basket.y, basket.width, basket.height);

        // Seitenlinien
        ctx.strokeStyle = "black";
        ctx.lineWidth = 4;

        // Linke Linie: beginnt 20 Pixel über dem Korb
        ctx.beginPath();
        ctx.moveTo(basket.x, basket.y - 20);
        ctx.lineTo(basket.x, basket.y + basket.height);
        ctx.stroke();

        // Rechte Linie: beginnt 20 Pixel über dem Korb
        ctx.beginPath();
        ctx.moveTo(basket.x + basket.width, basket.y - 20);
        ctx.lineTo(basket.x + basket.width, basket.y + basket.height);
        ctx.stroke();
    }

    // Zeichnet den Apfel mit zusätzlichem Stil (Stiel und Blatt)
    function drawApple() {
        // Apfelkörper
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(apple.x, apple.y, apple.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();

        // Apfelstiel
        ctx.strokeStyle = "brown";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(apple.x, apple.y - apple.radius);
        ctx.lineTo(apple.x, apple.y - apple.radius - 10);
        ctx.stroke();
        ctx.closePath();

        // Apfelblatt
        ctx.fillStyle = "green";
        ctx.beginPath();
        if (ctx.ellipse) {
            ctx.ellipse(apple.x + 5, apple.y - apple.radius - 10, 4, 6, Math.PI / 4, 0, 2 * Math.PI);
        } else {
            ctx.arc(apple.x + 5, apple.y - apple.radius - 10, 4, 0, 2 * Math.PI);
        }
        ctx.fill();
        ctx.closePath();
    }

    // Zeichnet das schlechte Objekt (badItem) in einer anderen Farbe (blau)
    function drawBadItem() {
        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.arc(badItem.x, badItem.y, badItem.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }

    // Zeichnet alle Elemente (Korb, Apfel, badItem, Score, Game Over)
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBasket();
        drawApple();
        drawBadItem();

        // Score anzeigen
        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.fillText("Score: " + score, 10, 25);

        // Bei Spielende "Game Over" anzeigen
        if (gameOver) {
            ctx.font = "30px Arial";
            ctx.fillText("Game Over", canvas.width / 2 - 80, canvas.height / 2);
            ctx.font = "20px Arial";
            ctx.fillText("Drücke Leertaste zum Neustarten", canvas.width / 2 - 140, canvas.height / 2 + 40);
        }
    }

    // Hauptspielschleife
    function gameLoop() {
        if (!gameOver) {
            update();
            draw();
            requestAnimationFrame(gameLoop);
        } else {
            draw();
        }
    }

    gameLoop();
}
