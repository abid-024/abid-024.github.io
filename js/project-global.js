(() => {
  function ready(fn) {
    if (document.readyState === "loading")
      document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }

  function setupBackTop() {
    let button = document.querySelector("[data-back-top], [data-back-to-top]");
    if (!button) {
      button = document.createElement("button");
      button.type = "button";
      button.className = "back-to-top back-top";
      button.dataset.backTop = "";
      button.setAttribute("aria-label", "Back to top");
      button.textContent = "Top";
      document.body.appendChild(button);
    } else {
      button.classList.add("back-to-top", "back-top");
      button.textContent = "Top";
    }
    const sync = () =>
      button.classList.toggle("is-visible", window.scrollY > 420);
    button.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" }),
    );
    sync();
    window.addEventListener("scroll", sync, { passive: true });
  }

  function flashProtected(target) {
    const item = target.closest(
      "img, [data-protected-photo], .intro-photo-frame, .portrait-frame, .quote-photo-frame, .hero-photo-card, .post-visual, .project-screen, .screen-frame",
    );
    if (!item) return false;
    item.classList.add("is-protected-blur");
    window.clearTimeout(item._protectTimer);
    item._protectTimer = window.setTimeout(
      () => item.classList.remove("is-protected-blur"),
      900,
    );
    return true;
  }

  function setupImageProtection() {
    document
      .querySelectorAll("img")
      .forEach((img) => img.setAttribute("draggable", "false"));
    document.addEventListener("contextmenu", (event) => {
      if (flashProtected(event.target)) event.preventDefault();
    });
    document.addEventListener("dragstart", (event) => {
      if (flashProtected(event.target)) event.preventDefault();
    });
    document.addEventListener("selectstart", (event) => {
      if (event.target.closest("img, [data-protected-photo]"))
        event.preventDefault();
    });
  }

  function setupCursor() {
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;
    if (document.querySelector(".fs-cursor")) return;
    const cursor = document.createElement("div");
    cursor.className = "fs-cursor";
    document.body.appendChild(cursor);
    let x = -80,
      y = -80,
      tx = -80,
      ty = -80;
    function draw() {
      x += (tx - x) * 0.25;
      y += (ty - y) * 0.25;
      cursor.style.transform = `translate3d(${x - 17}px, ${y - 17}px, 0)`;
      requestAnimationFrame(draw);
    }
    draw();
    document.addEventListener(
      "pointermove",
      (event) => {
        tx = event.clientX;
        ty = event.clientY;
        cursor.classList.add("is-visible");
      },
      { passive: true },
    );
    document.addEventListener("pointerleave", () =>
      cursor.classList.remove("is-visible"),
    );
    document.addEventListener("pointerover", (event) => {
      if (
        event.target.closest(
          'a, button, input, textarea, select, [role="button"]',
        )
      )
        cursor.classList.add("is-active");
    });
    document.addEventListener("pointerout", (event) => {
      if (
        event.target.closest(
          'a, button, input, textarea, select, [role="button"]',
        )
      )
        cursor.classList.remove("is-active");
    });
  }

  ready(() => {
    setupBackTop();
    setupImageProtection();
    setupCursor();
  });
})();

