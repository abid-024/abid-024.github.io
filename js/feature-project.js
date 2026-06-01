(() => {
  const root = document.documentElement;
  const body = document.body;
  const toggle = document.querySelector("#themeToggle, [data-theme-toggle]");
  const key = "feature-project-theme";

  function setTheme(theme) {
    const dark = theme === "dark";
    root.setAttribute("data-theme", dark ? "dark" : "light");
    body.classList.toggle("dark", dark);
    body.classList.toggle("light", !dark && body.classList.contains("light"));
    toggle?.setAttribute("aria-pressed", String(dark));
    try {
      localStorage.setItem(key, dark ? "dark" : "light");
    } catch (error) {}
  }

  let saved = body.classList.contains("dark") ? "dark" : "light";
  try {
    saved = localStorage.getItem(key) || saved;
  } catch (error) {}
  setTheme(saved);

  if (toggle && toggle.dataset.featureThemeReady !== "true") {
    toggle.dataset.featureThemeReady = "true";
    toggle.addEventListener("click", () =>
      setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark"),
    );
  }
})();

