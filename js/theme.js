(() => {
  const root = document.documentElement;
  const toggles = Array.from(
    document.querySelectorAll(
      "[data-theme-toggle], [data-blog-theme-toggle], #themeToggle",
    ),
  );
  const storageKey =
    document.body.classList.contains("blog-page") ||
    document.body.classList.contains("blog-article")
      ? "blogTheme"
      : "site-theme";

  function applyTheme(theme) {
    const clean = theme === "dark" ? "dark" : "light";
    root.setAttribute("data-theme", clean);
    root.dataset.theme = clean;
    document.body.classList.toggle("dark", clean === "dark");
    document.body.classList.toggle(
      "light",
      clean === "light" &&
        document.body.classList.contains("project-vault-page"),
    );

    toggles.forEach((toggle) => {
      toggle.setAttribute("aria-pressed", String(clean === "dark"));
      toggle.setAttribute(
        "title",
        clean === "dark" ? "Switch to light theme" : "Switch to dark theme",
      );
    });

    try {
      localStorage.setItem(storageKey, clean);
      localStorage.setItem("site-theme", clean);
      localStorage.setItem("theme", clean);
      if (storageKey === "blogTheme")
        localStorage.setItem("blogDetailTheme", clean);
    } catch (error) {}
  }

  let saved = root.getAttribute("data-theme") || "light";
  try {
    saved =
      localStorage.getItem(storageKey) ||
      localStorage.getItem("site-theme") ||
      localStorage.getItem("theme") ||
      saved;
  } catch (error) {}
  applyTheme(saved);

  toggles.forEach((toggle) => {
    if (toggle.dataset.themeReady === "true") return;
    toggle.dataset.themeReady = "true";
    toggle.addEventListener("click", () => {
      applyTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
    });
  });

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
      "img, [data-protected-photo], .intro-photo-frame, .portrait-frame, .quote-photo-frame, .hero-photo-card, .post-visual, .project-screen, .screen-frame, .vault-screen, .contact-visual",
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

