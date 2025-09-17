const questions = [
  `Cosa sono gli SDGs? Quanti sono? Secondo te, una tematica può appartenere a più SDGs?`,
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
const radius = canvas.width / 2;

let rotation = 0;

// Disegna la ruota
function drawWheel() {
  const sectorAngle = (2 * Math.PI) / questions.length;
  for (let i = 0; i < questions.length; i++) {
    const startAngle = i * sectorAngle;
    const endAngle = startAngle + sectorAngle;
    ctx.beginPath();
    ctx.moveTo(radius, radius);
    ctx.arc(radius, radius, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fillStyle = colors[i % colors.length];
    ctx.fill();
    ctx.stroke();
  }
}

drawWheel();

document.getElementById("spinButton").addEventListener("click", () => {
  const randomDegree = Math.random() * 360 + 720; // almeno 2 giri
  const randomRadian = (randomDegree * Math.PI) / 180;

  // Animazione semplice
  let start = null;
  const duration = 5000;
  const initialRotation = rotation;

  function animate(timestamp) {
    if (!start) start = timestamp;
    const elapsed = timestamp - start;
    const progress = Math.min(elapsed / duration, 1);
    rotation = initialRotation + randomRadian * easeOutCubic(progress);
    drawRotatedWheel(rotation);
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      const selectedIndex = Math.floor(
        ((2 * Math.PI - (rotation % (2 * Math.PI))) / ((2 * Math.PI) / questions.length)) % questions.length
      );
      document.getElementById("selectedQuestion").textContent =
        `Domanda selezionata: ${questions[selectedIndex]}`;
    }
  }

  requestAnimationFrame(animate);
});

// Disegna la ruota ruotata
function drawRotatedWheel(rot) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(radius, radius);
  ctx.rotate(rot);
  ctx.translate(-radius, -radius);
  drawWheel();
  ctx.restore();
}

// Funzione easing per decelerazione naturale
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}
