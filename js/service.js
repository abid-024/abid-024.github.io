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
    const cleanTheme = theme === "dark" ? "dark" : "light";
    root.setAttribute("data-theme", cleanTheme);
    root.dataset.theme = cleanTheme;

    toggles.forEach((toggle) => {
      toggle.setAttribute("aria-pressed", String(cleanTheme === "dark"));
      toggle.setAttribute(
        "title",
        cleanTheme === "dark"
          ? "Switch to light theme"
          : "Switch to dark theme",
      );
      const text = toggle.querySelector(".theme-toggle-text");
      if (text) text.textContent = cleanTheme === "dark" ? "Dark" : "Light";
    });

    try {
      localStorage.setItem(storageKey, cleanTheme);
      localStorage.setItem("site-theme", cleanTheme);
      localStorage.setItem("theme", cleanTheme);
      if (storageKey === "blogTheme")
        localStorage.setItem("blogDetailTheme", cleanTheme);
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
      const nextTheme =
        root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(nextTheme);

      const logo = document.querySelector(
        ".blog-logo, .blog-logo-link, .site-nav-brand img",
      );
      logo?.classList.remove("is-theme-pulse");
      void logo?.offsetWidth;
      logo?.classList.add("is-theme-pulse");
    });
  });

  function setupBackTop() {
    let button = document.querySelector("[data-back-top]");
    if (!button) {
      button = document.createElement("button");
      button.type = "button";
      button.className = "back-top";
      button.dataset.backTop = "";
      button.setAttribute("aria-label", "Back to top");
      button.textContent = "Top";
      document.body.appendChild(button);
    }

    function sync() {
      button.classList.toggle("is-visible", window.scrollY > 420);
    }

    button.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    sync();
    window.addEventListener("scroll", sync, { passive: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupBackTop);
  } else {
    setupBackTop();
  }
})();

/* FINAL_GLOBAL_IMAGE_PROTECTION */
(() => {
  document.addEventListener("contextmenu", (event) => {
    if (
      event.target.closest(
        "img, [data-protected-photo], .hero-photo-card, .post-visual, .project-screen, .vault-screen, .contact-visual",
      )
    ) {
      event.preventDefault();
    }
  });
  document.addEventListener("dragstart", (event) => {
    if (event.target.closest("img, [data-protected-photo]"))
      event.preventDefault();
  });
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () =>
      document
        .querySelectorAll("img")
        .forEach((img) => img.setAttribute("draggable", "false")),
    );
  } else {
    document
      .querySelectorAll("img")
      .forEach((img) => img.setAttribute("draggable", "false"));
  }
})();

