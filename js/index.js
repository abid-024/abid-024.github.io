/* =========================================================
   INDEX ONLY JS - FRESH NO-MAIN VERSION
   Use with css/index.css.
   Theme system: only light/dark using html[data-theme].
========================================================= */

/* =========================================================
   INDEX-ONLY JS
   Safe for index.html only
   Dynamic galaxy + normal portfolio interactions
   ========================================================= */

const returnAnchorKey = "portfolioReturnAnchor";

/* ---------- small copy data ---------- */

const skillCopy = {
  networking: {
    title: "Networking",
    text: "Building secure, reliable systems that keep data and connections stable.",
  },
  "web-dev": {
    title: "Web Dev",
    text: "Creating fast, responsive websites that feel clean and work without friction.",
  },
  automation: {
    title: "Automation",
    text: "Systems that handle repetitive work in the background and keep things running smoothly.",
  },
  "local-seo": {
    title: "Local SEO",
    text: "Helping websites get found, ranked, and seen by the right people.",
  },
  languages: {
    title: "Languages",
    text: "",
  },
  more: {
    title: "More",
    text: "Use this as the clickable space for future skills, case studies, or deeper details.",
  },
};

const softwareCopy = {
  design:
    "Design slot selected. Add your design app logo here and connect the click to a custom page later.",
  code: "Code slot selected. This can point to your editor, framework, or development stack.",
  automation:
    "Automation slot selected. Add the tool/logo you use for workflow systems.",
  analytics:
    "Analytics slot selected. Add dashboard, SEO, or reporting tools here.",
  network:
    "Network slot selected. Add router, cloud, or networking software context here.",
};

const serviceCopy = {
  automation:
    "Automation service selected. Add a detail page or modal link here later.",
  "web-dev":
    "Web development service selected. Add examples, pricing, or a project brief here.",
  "local-seo":
    "GMB optimization selected. Add Google Business Profile, maps, ranking, and local SEO details here.",
  networking:
    "Networking service selected. Add setup, support, and troubleshooting info here.",
};

const featureCopy = {
  vault:
    "Resource Vault selected. This will hold useful links, tools, templates, checklists, study notes, and saved resources.",
  projects:
    "Project case file selected. Add proof, snapshots, links, and build notes here.",
};

const nameLanguages = [
  "আবিদ হাসান",
  "阿比德 哈桑",
  "アビド ハサン",
  "Abid Hasan",
];

/* ---------- safe helpers ---------- */

function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

function qsa(selector, parent = document) {
  return Array.from(parent.querySelectorAll(selector));
}

function showSiteToast(message) {
  return;
}

/* ---------- theme toggle ---------- */

function setupThemeToggle() {
  const root = document.documentElement;
  const toggles = qsa("[data-theme-toggle]");
  const storageKey = "site-theme";

  if (!toggles.length) return;

  try {
    const saved =
      localStorage.getItem(storageKey) ||
      localStorage.getItem("siteTheme") ||
      localStorage.getItem("theme");

    if (saved === "light" || saved === "dark") {
      root.dataset.theme = saved;
    } else {
      root.dataset.theme = root.dataset.theme === "dark" ? "dark" : "light";
    }
  } catch (error) {
    root.dataset.theme = root.dataset.theme === "dark" ? "dark" : "light";
  }

  function syncTheme() {
    const theme = root.dataset.theme || "light";

    toggles.forEach((toggle) => {
      toggle.setAttribute("aria-pressed", String(theme === "dark"));

      const text = qs(".theme-toggle-text", toggle);
      if (text) text.textContent = theme === "dark" ? "Dark" : "Light";
    });
  }

  toggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const next = root.dataset.theme === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      syncTheme();

      try {
        localStorage.setItem(storageKey, next);
        localStorage.setItem("siteTheme", next);
        localStorage.setItem("theme", next);
      } catch (error) {
        // ignore storage error
      }
    });
  });

  syncTheme();
}

/* ---------- external links safety ---------- */

function hardenExternalLinks() {
  qsa('a[target="_blank"]').forEach((link) => {
    const rel = new Set(
      (link.getAttribute("rel") || "")
        .split(/\s+/)
        .map((item) => item.trim())
        .filter(Boolean),
    );

    rel.add("noopener");
    rel.add("noreferrer");

    link.setAttribute("rel", Array.from(rel).join(" "));
  });
}

/* ---------- sticky nav ---------- */

function setupStickyNav() {
  const nav = qs("[data-nav]");
  if (!nav) return;

  function updateNav() {
    nav.classList.toggle("is-visible", window.scrollY > 90);
  }

  updateNav();
  window.addEventListener("scroll", updateNav, { passive: true });
}

/* ---------- active nav radar ---------- */

function setupActiveNav() {
  const nav = qs("[data-nav]");
  const radar = qs("[data-nav-radar]");
  if (!nav || !radar) return;

  const links = qsa('nav a[href^="#"]', nav);
  const sections = links
    .map((link) => {
      const target = qs(link.getAttribute("href"));
      return target ? { link, target } : null;
    })
    .filter(Boolean);

  if (!sections.length) return;

  function updateActive() {
    let active = sections[0];

    sections.forEach((item) => {
      const rect = item.target.getBoundingClientRect();
      if (rect.top <= 180) active = item;
    });

    links.forEach((link) => {
      link.classList.toggle("is-active", link === active.link);
    });

    const linkRect = active.link.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();
    const center = linkRect.left + linkRect.width / 2 - navRect.left;
    nav.style.setProperty("--nav-radar-x", `${center}px`);
  }

  updateActive();
  window.addEventListener("scroll", updateActive, { passive: true });
  window.addEventListener("resize", updateActive);
}

/* ---------- return anchor ---------- */

function getCurrentHomeAnchor() {
  const sections = ["#home", "#about", "#services", "#blog", "#contact"];
  let current = "#home";

  sections.forEach((selector) => {
    const section = qs(selector);
    if (!section) return;

    const rect = section.getBoundingClientRect();
    if (rect.top <= 180) current = selector;
  });

  return current;
}

function getLinkReturnAnchor(link) {
  const href = link?.getAttribute("href") || "";

  if (href.includes("automation/") || href.includes("automation.html")) return "#services";
  if (href.includes("web-dev/") || href.includes("web-dev.html")) return "#services";
  if (href.includes("local-seo/") || href.includes("local-seo.html")) return "#services";
  if (href.includes("ui-ux/") || href.includes("ui-ux.html")) return "#services";
  if (href.includes("networking/") || href.includes("networking.html")) return "#services";
  if (href.includes("feature-project/") || href.includes("featured-project.html")) return "#blog";
  if (href.includes("blog/") || href.includes("blog.html")) return "#blog";
  if (href.includes("contact/") || href.includes("contact.html")) return "#contact";

  return getCurrentHomeAnchor();
}

function saveReturnAnchor(anchor = getCurrentHomeAnchor()) {
  try {
    sessionStorage.setItem(returnAnchorKey, anchor || "#home");
  } catch (error) {
    // ignore storage error
  }
}

function takeReturnAnchor() {
  try {
    const anchor = sessionStorage.getItem(returnAnchorKey);
    if (!anchor) return "";
    sessionStorage.removeItem(returnAnchorKey);
    return anchor;
  } catch (error) {
    return "";
  }
}

function restoreHomeAnchorIfNeeded() {
  if (!qs("[data-landing]")) return;

  const anchor = takeReturnAnchor();
  if (!anchor || anchor === "#home") return;

  const target = qs(anchor);
  if (!target) return;

  window.setTimeout(() => {
    target.scrollIntoView({ block: "start", behavior: "auto" });
  }, 80);
}

function setupReturnLinks() {
  qsa('a[href$=".html"], a[href*=".html#"], a[href$="/"], a[href*="/#"]').forEach((link) => {
    link.addEventListener("click", () => {
      saveReturnAnchor(getLinkReturnAnchor(link));
    });
  });
}

/* ---------- creative title elastic ---------- */

function setupCreativeTitleElastic() {
  const title = qs("[data-elastic-title]");
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (!title || title.dataset.elasticReady === "true" || reducedMotion) return;

  const titleText = title.textContent.trim().replace(/\s+/g, " ");
  const letters = [];
  const wrapper = document.createElement("span");

  wrapper.className = "creative-title-text";
  wrapper.setAttribute("aria-hidden", "true");

  title.dataset.elasticReady = "true";
  title.setAttribute("aria-label", titleText);
  title.textContent = "";

  titleText.split(" ").forEach((word) => {
    const wordWrap = document.createElement("span");
    wordWrap.className = "creative-title-word";

    Array.from(word).forEach((char, index) => {
      const letter = document.createElement("span");
      letter.className = "creative-title-letter";
      letter.style.setProperty("--i", index);
      letter.textContent = char;

      wordWrap.appendChild(letter);
      letters.push(letter);
    });

    wrapper.appendChild(wordWrap);
  });

  title.appendChild(wrapper);

  function resetLetters() {
    qsa(".creative-title-word", title).forEach((word) => {
      word.classList.remove("is-elastic-active");
    });

    letters.forEach((letter) => {
      letter.style.setProperty("--elastic-y", "0");
      letter.style.setProperty("--elastic-rotate", "0");
    });
  }

  function updateLetters(event) {
    const activeWord = event.target.closest(".creative-title-word");

    if (!activeWord || !title.contains(activeWord)) {
      resetLetters();
      return;
    }

    const activeLetters = qsa(".creative-title-letter", activeWord);
    const rect = activeWord.getBoundingClientRect();

    const xProgress = Math.min(
      1,
      Math.max(0, (event.clientX - rect.left) / rect.width),
    );

    const yProgress = Math.min(
      1,
      Math.max(0, (event.clientY - rect.top) / rect.height),
    );

    const activeIndex = xProgress * Math.max(1, activeLetters.length - 1);
    const direction = yProgress < 0.5 ? -1 : 1;

    qsa(".creative-title-word", title).forEach((word) => {
      word.classList.toggle("is-elastic-active", word === activeWord);
    });

    letters.forEach((letter) => {
      if (!activeWord.contains(letter)) {
        letter.style.setProperty("--elastic-y", "0");
        letter.style.setProperty("--elastic-rotate", "0");
        return;
      }

      const wordLetterIndex = activeLetters.indexOf(letter);
      const distance = wordLetterIndex - activeIndex;
      const pull = Math.exp(-(distance * distance) / 28);
      const ripple = Math.sin(distance * 0.82) * 4;
      const y = direction * (18 * pull + ripple);
      const rotate = direction * distance * pull * 0.65;

      letter.style.setProperty("--elastic-y", y.toFixed(2));
      letter.style.setProperty("--elastic-rotate", rotate.toFixed(2));
    });
  }

  title.addEventListener("pointerenter", updateLetters);
  title.addEventListener("pointermove", updateLetters);
  title.addEventListener("pointerleave", resetLetters);
  title.addEventListener("blur", resetLetters);
}

/* ---------- portfolio tabs ---------- */

function setupPortfolioTabs() {
  const tabs = qsa("[data-tab]");
  const panels = qsa("[data-panel]");

  if (!tabs.length || !panels.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.tab;

      tabs.forEach((item) => {
        const isActive = item === tab;
        item.classList.toggle("is-active", isActive);
        item.setAttribute("aria-selected", String(isActive));
      });

      panels.forEach((panel) => {
        panel.classList.toggle("is-active", panel.dataset.panel === target);
      });
    });
  });
}

/* ---------- intro image hover changer ---------- */

function setupIntroPhotoHover() {
  const frame = qs("[data-intro-photo-frame]");
  const image = qs("[data-intro-photo]");
  if (!frame || !image) return;

  const list = (frame.dataset.hoverImages || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  if (!list.length) return;

  list.forEach((src) => {
    const preload = new Image();
    preload.src = src;
  });

  let index = Math.max(0, list.indexOf(image.getAttribute("src")));
  let timer = 0;

  function nextImage() {
    index = (index + 1) % list.length;
    frame.classList.add("is-changing");
    window.setTimeout(() => {
      image.src = list[index];
    }, 80);
    window.setTimeout(() => {
      frame.classList.remove("is-changing");
    }, 220);
  }

  function startAuto() {
    window.clearInterval(timer);
    timer = window.setInterval(nextImage, 5000);
  }

  frame.addEventListener("pointerenter", nextImage);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) window.clearInterval(timer);
    else startAuto();
  });

  startAuto();
}

/* ---------- playable portrait tilt ---------- */

function setupPlayablePortrait() {
  const frame = qs("[data-play-photo]");
  if (!frame) return;

  frame.addEventListener("pointermove", (event) => {
    const rect = frame.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    frame.style.setProperty("--photo-tilt-x", `${(-y * 7).toFixed(2)}deg`);
    frame.style.setProperty("--photo-tilt-y", `${(x * 7).toFixed(2)}deg`);
    frame.style.setProperty("--photo-glow-x", `${(x + 0.5) * 100}%`);
    frame.style.setProperty("--photo-glow-y", `${(y + 0.5) * 100}%`);
    frame.classList.add("is-playing");
  });

  frame.addEventListener("pointerleave", () => {
    frame.style.removeProperty("--photo-tilt-x");
    frame.style.removeProperty("--photo-tilt-y");
    frame.style.removeProperty("--photo-glow-x");
    frame.style.removeProperty("--photo-glow-y");
    frame.classList.remove("is-playing");
  });
}

/* ---------- name hover language cycle ---------- */

function setupNameHover() {
  const name = qs("[data-name-hover]");
  if (!name) return;

  const defaultName = "Abid Hasan";
  let index = 0;
  let timer = null;

  function setName(text) {
    window.clearTimeout(timer);
    name.classList.add("is-changing");

    timer = window.setTimeout(() => {
      name.textContent = text;
      name.classList.remove("is-changing");
    }, 120);
  }

  function showNextLanguage() {
    index = (index + 1) % nameLanguages.length;

    if (nameLanguages[index] === defaultName) {
      index = (index + 1) % nameLanguages.length;
    }

    setName(nameLanguages[index]);
  }

  name.addEventListener("pointerenter", showNextLanguage);
  name.addEventListener("pointerleave", () => setName(defaultName));
}

/* ---------- buttons and cards ---------- */

function setupSkillButtons() {
  qsa("[data-skill]").forEach((button) => {
    button.addEventListener("mouseenter", () => {
      const key = button.dataset.skill;
      const copy = skillCopy[key];
      if (copy?.title) showSiteToast(`${copy.title}: ${copy.text}`);
    });
  });
}

function setupSoftwareButtons() {
  const note = qs("[data-software-note]");
  const buttons = qsa("[data-software]");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const key = button.dataset.software;
      const text = softwareCopy[key] || "Software slot selected.";

      buttons.forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");

      if (note) {
        note.textContent = text;
      }
    });
  });
}

function setupServiceCards() {
  qsa("[data-service]").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      const key = card.dataset.service;
      const text = serviceCopy[key];
      if (text) showSiteToast(text);
    });
  });
}

function setupFeatureLinks() {
  qsa("[data-feature]").forEach((link) => {
    link.addEventListener("mouseenter", () => {
      const key = link.dataset.feature;
      const text = featureCopy[key];
      if (text) showSiteToast(text);
    });
  });
}

/* ---------- simple mail forms ---------- */

function setupMailForm() {
  qsa("form").forEach((form) => {
    if (form.dataset.formReady === "true") return;
    form.dataset.formReady = "true";

    form.addEventListener("submit", (event) => {
      const action = form.getAttribute("action") || "";
      const method = form.getAttribute("method") || "";

      if (action || method.toLowerCase() === "post") return;

      event.preventDefault();
      showSiteToast("Form ready. Add your form action/API to send messages.");
    });
  });
}

/* ---------- reveal on scroll ---------- */

function setupRevealMotion() {
  const items = qsa(
    ".intro-card, .portfolio-card, .about-layout, .service-card, .feature-links a, .carousel-section, .site-footer",
  );

  if (!items.length) return;

  items.forEach((item, index) => {
    item.classList.add("reveal-item");
    item.style.setProperty("--reveal-delay", `${Math.min(index * 45, 260)}ms`);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-revealed", entry.isIntersecting);
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -8% 0px",
    },
  );

  items.forEach((item) => observer.observe(item));
}

/* ---------- magnetic glow ---------- */

function setupMagneticHighlights() {
  const cards = qsa(
    ".intro-card, .portfolio-card, .service-card, .feature-links a, .portrait-frame",
  );

  cards.forEach((card) => {
    card.classList.add("magnetic-card");

    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;

      card.style.setProperty("--shine-x", `${x}%`);
      card.style.setProperty("--shine-y", `${y}%`);
      card.classList.add("is-magnetic");
    });

    card.addEventListener("pointerleave", () => {
      card.classList.remove("is-magnetic");
      card.style.removeProperty("--shine-x");
      card.style.removeProperty("--shine-y");
    });
  });
}

/* ---------- image fallback ---------- */

function setupImageFallbacks() {
  qsa("img").forEach((image) => {
    image.addEventListener("error", () => {
      const label = image.alt || "Add image";
      const slot = image.closest(
        ".icon-slot, .detail-media, .intro-photo-frame, .quote-photo-frame, .portrait-frame",
      );

      if (slot) {
        slot.classList.add("is-missing-image");
        slot.dataset.fallbackLabel = label;
      }

      image.hidden = true;
    });
  });
}

/* ---------- booking button ---------- */

function setupLiveCalendlyBooking() {
  const liveScheduleLink =
    "https://calendly.com/abidhasan2348/project-discussion-call";

  qsa("[data-open-booking]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      window.open(liveScheduleLink, "_blank", "noopener,noreferrer");
    });
  });

  const oldDialog = qs("[data-booking-dialog]");
  if (oldDialog) oldDialog.remove();
}

/* ---------- back to top ---------- */

function setupBackToTopButton() {
  if (qs("[data-back-to-top], [data-back-top]")) return;

  const button = document.createElement("button");
  button.className = "back-to-top";
  button.type = "button";
  button.dataset.backToTop = "";
  button.textContent = "Top";
  button.setAttribute("aria-label", "Back to top");

  document.body.appendChild(button);

  function sync() {
    button.classList.toggle("is-visible", window.scrollY > 420);
  }

  button.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  sync();
  window.addEventListener("scroll", sync, { passive: true });
}

/* ---------- landing skill magnifier ---------- */

function setupLandingSkillCardMagnifier() {
  qsa(".landing-skill-card").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;

      card.style.setProperty("--card-x", `${x}%`);
      card.style.setProperty("--card-y", `${y}%`);
      card.classList.add("is-magnified");
    });

    card.addEventListener("pointerleave", () => {
      card.classList.remove("is-magnified");
      card.style.removeProperty("--card-x");
      card.style.removeProperty("--card-y");
    });
  });
}

/* ---------- init ---------- */

window.addEventListener("pageshow", restoreHomeAnchorIfNeeded);

document.addEventListener("DOMContentLoaded", () => {
  setupThemeToggle();
  hardenExternalLinks();
  setupStickyNav();
  setupActiveNav();
  setupReturnLinks();
  setupBackToTopButton();

  setupCreativeTitleElastic();
  setupPortfolioTabs();
  setupIntroPhotoHover();
  setupPlayablePortrait();
  setupNameHover();

  setupSkillButtons();
  setupSoftwareButtons();
  setupServiceCards();
  setupFeatureLinks();
  setupMailForm();

  setupRevealMotion();
  setupMagneticHighlights();
  setupImageFallbacks();
  setupLandingSkillCardMagnifier();
  setupLiveCalendlyBooking();

  setupTimeMood();
});

/* FINAL_PATCH_NO_HOVER_TOAST: requested - remove cursor hover text popup */
showSiteToast = function () {
  return;
};

/* Restore section cursor follower from original index behavior. */
function setupCursorModesFinalPatch() {
  if (window.matchMedia && window.matchMedia("(hover: none)").matches) return;
  if (document.querySelector(".section-cursor")) return;

  const cursor = document.createElement("div");
  cursor.className = "section-cursor";
  document.body.appendChild(cursor);

  let raf = 0;
  let lastEvent = null;

  function update() {
    raf = 0;
    const event = lastEvent;
    if (!event) return;
    const target = document.elementFromPoint(event.clientX, event.clientY);
    const mode =
      target?.closest?.("[data-cursor-mode]")?.dataset.cursorMode || "default";
    document.body.dataset.cursorMode = mode;
    cursor.style.setProperty("--cursor-x", `${event.clientX}px`);
    cursor.style.setProperty("--cursor-y", `${event.clientY}px`);
    cursor.classList.add("is-visible");
  }

  document.addEventListener(
    "pointermove",
    (event) => {
      lastEvent = event;
      if (!raf) raf = requestAnimationFrame(update);
    },
    { passive: true },
  );

  document.addEventListener("pointerleave", () => {
    cursor.classList.remove("is-visible");
  });
}

/* Stronger image protection: no drag, no context menu, no easy select/copy. */
function setupImageProtectionFinalPatch() {
  document.addEventListener("contextmenu", (event) => {
    if (
      event.target.closest(
        "img, [data-protected-photo], .intro-photo-frame, .portrait-frame, .quote-photo-frame",
      )
    ) {
      event.preventDefault();
    }
  });
  document.addEventListener("dragstart", (event) => {
    if (event.target.closest("img, [data-protected-photo]"))
      event.preventDefault();
  });
  document.addEventListener("copy", (event) => {
    const selected = String(window.getSelection?.() || "");
    if (
      selected.length > 0 &&
      document.activeElement?.tagName !== "INPUT" &&
      document.activeElement?.tagName !== "TEXTAREA"
    ) {
      // allow text copy; block only image drag/context above
    }
  });
  document.querySelectorAll("img").forEach((img) => {
    img.setAttribute("draggable", "false");
  });
}

/* Make reveal content instant so the index does not feel slow. */
function revealEverythingFastFinalPatch() {
  document.querySelectorAll(".reveal-item").forEach((item) => {
    item.classList.add("is-revealed");
    item.style.removeProperty("--reveal-delay");
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    setupCursorModesFinalPatch();
    setupImageProtectionFinalPatch();
    revealEverythingFastFinalPatch();
  });
} else {
  setupCursorModesFinalPatch();
  setupImageProtectionFinalPatch();
  revealEverythingFastFinalPatch();
}

/* CORRECT_ZIP_PATCH: 5-sec hero image is above; blur protected images when copy/drag/right-click is attempted. */
(function correctZipImageProtection() {
  function blurProtected(target) {
    const box =
      target?.closest?.(
        ".intro-photo-frame, .portrait-frame, .quote-photo-frame, [data-protected-photo]",
      ) || target;
    if (!box?.classList) return;
    box.classList.add("is-protected-blur");
    window.setTimeout(() => box.classList.remove("is-protected-blur"), 900);
  }
  document.addEventListener("contextmenu", (event) => {
    const target = event.target.closest(
      "img, .intro-photo-frame, .portrait-frame, .quote-photo-frame, [data-protected-photo]",
    );
    if (!target) return;
    event.preventDefault();
    blurProtected(target);
  });
  document.addEventListener("dragstart", (event) => {
    const target = event.target.closest("img, [data-protected-photo]");
    if (!target) return;
    event.preventDefault();
    blurProtected(target);
  });
  document
    .querySelectorAll("img")
    .forEach((img) => img.setAttribute("draggable", "false"));
})();
