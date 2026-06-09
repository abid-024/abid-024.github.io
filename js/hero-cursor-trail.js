const heroTrailArea = document.querySelector("main#home .landing");

if (heroTrailArea) {
  const trailColors = ["#5cf28b", "#c89cff", "#e06112", "#c2c730", "#f4f4ef"];
  const trailSymbols = ["", "+", ">", "=", "/", "."];

  let lastTrailTime = 0;

  function createHeroCursorTrail(x, y) {
    const block = document.createElement("span");

    block.className = "hero-cursor-trail-block";
    block.textContent =
      trailSymbols[Math.floor(Math.random() * trailSymbols.length)];

    block.style.left = `${x}px`;
    block.style.top = `${y}px`;
    block.style.background =
      trailColors[Math.floor(Math.random() * trailColors.length)];

    document.body.appendChild(block);

    setTimeout(() => {
      block.remove();
    }, 700);
  }

  heroTrailArea.addEventListener("pointermove", (event) => {
    if (window.innerWidth <= 768) return;

    const now = Date.now();

    if (now - lastTrailTime < 45) return;
    lastTrailTime = now;

    createHeroCursorTrail(event.clientX, event.clientY);
  });
}