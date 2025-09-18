const questions = [
  `Cosa sono gli SDGs? Quanti sono?`,
  `Secondo te, una tematica può appartenere a più SDGs? Fai un esempio`,
  `Secondo te l’età media della popolazione senese è in aumento negli ultimi anni?`,
  `Secondo te cos’è il tasso di natalità? E pensi che sia in crescita negli ultimi anni?`,
  `Secondo te la percentuale di giovani che non studiano e non lavorano è al di sopra o al di sotto della media toscana?`,
  `Secondo te, l’età media alla laurea è maggiore o minore rispetto alla media toscana?`,
  `Le medie senesi, per il punteggio degli esami universitari e per il voto di laurea sono maggiori rispetto alla media nazionale?`,
  `Secondo te il tasso di occupazione giovanile femminile è stabile negli anni? Ed è maggiore o minore rispetto a quello maschile?`,
  `Secondo te c’è differenza di genere nella retribuzione dei lavoratori?`,
  `Sai spiegare cos’è la differenza di genere?`,
  `Secondo te, la provincia di Siena produce energia da fonti rinnovabili? Se sì, più o meno rispetto alla media toscana?`,
  `Secondo te, la provincia di Siena è ad alto o a basso rischio climatico?`,
  `Cosa si intende con demografia?`
];

const colors = ["#4CAF50", "#81C784"];
const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
let rotation = 0;

// Imposta canvas responsive
function resizeCanvas() {
  const container = document.getElementById("wheelContainer");
  canvas.width = container.clientWidth;
  canvas.height = container.clientWidth; // quadrato perfetto
  drawWheel(rotation);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Disegna la ruota
function drawWheel(rot) {
  const radius = canvas.width / 2;
  const sectorAngle = (2 * Math.PI) / questions.length;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < questions.length; i++) {
    const startAngle = i * sectorAngle + rot;
    const endAngle = startAngle + sectorAngle;

    // Evidenzia spicchio selezionato centrato sotto la freccia
    const selectedIndex = getSelectedIndex(rotation);
    ctx.fillStyle = i === selectedIndex ? "#88e2f8ff" : colors[i % colors.length];
    

    ctx.beginPath();
    ctx.moveTo(radius, radius);
    ctx.arc(radius, radius, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Numero su ogni spicchio
    const textAngle = startAngle + sectorAngle / 2;
    const textRadius = radius * 0.7;
    ctx.save();
    ctx.translate(radius, radius);
    ctx.rotate(textAngle);
    ctx.textAlign = "center";
    ctx.fillStyle = "#000";
    ctx.font = `${Math.floor(radius * 0.12)}px Arial`;
    ctx.fillText(i + 1, textRadius, 0);
    ctx.restore();
  }
}

// Ottieni indice spicchio selezionato dalla freccia
// Restituisce l'indice dello spicchio sotto la freccia
function getSelectedIndex(rotation) {
  const sectorAngle = (2 * Math.PI) / questions.length;
  let adjustedRotation = rotation % (2 * Math.PI);
  // Lo spicchio vincente è quello in alto (0 rad) senza freccia
  return Math.floor((questions.length - adjustedRotation / sectorAngle) % questions.length);
}


// Gestione pulsante
document.getElementById("spinButton").addEventListener("click", () => {
  const randomDegree = Math.random() * 360 + 720; // almeno 2 giri
  const randomRadian = (randomDegree * Math.PI) / 180;
  const duration = 5000;
  const startRotation = rotation;
  let startTime = null;

  function animate(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    rotation = startRotation + randomRadian * easeOutCubic(progress);
    drawWheel(rotation);
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      const selected = getSelectedIndex(rotation);
      document.getElementById("selectedQuestion").textContent =
        `Domanda selezionata: ${questions[selected]}`;
    }
  }

  requestAnimationFrame(animate);
});

// Funzione easing per decelerazione naturale
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}
