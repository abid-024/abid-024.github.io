const projects = [
  {
    number: "01",
    title: "Portfolio Website",
    category: "Web Development",
    type: "Web",
    status: "Live",
    year: "2026",
    image: "assets/images/f1.png",
    link: "feature-project/web-dev-project.html",
    description:
      "A responsive portfolio build with a strong hero, clean service flow, project proof, and mobile-friendly structure.",
    tags: ["HTML", "CSS", "Portfolio", "Responsive"],
  },
  {
    number: "02",
    title: "Lead Automation",
    category: "Automation",
    type: "Flow",
    status: "Ready",
    year: "2026",
    image: "assets/images/f2.png",
    link: "feature-project/automation-project.html",
    description:
      "A simple automation system for collecting requests, checking details, routing leads, and sending the right next step.",
    tags: ["Automation", "Workflow", "Lead Flow", "System"],
  },
  {
    number: "03",
    title: "Local SEO System",
    category: "GMB / SEO",
    type: "SEO",
    status: "Ready",
    year: "2026",
    image: "assets/images/f3.png",
    link: "feature-project/gmb-project.html",
    description:
      "A Google Business Profile and local visibility project focused on maps presence, trust signals, and clean business info.",
    tags: ["GMB", "Local SEO", "Maps", "Visibility"],
  },
  {
    number: "04",
    title: "Interface Design",
    category: "UI/UX Design",
    type: "UI",
    status: "Concept",
    year: "2026",
    image: "assets/images/f4.png",
    link: "feature-project/ui-ux-project.html",
    description:
      "A clean interface direction with stronger spacing, reusable components, mobile layout thinking, and clearer user flow.",
    tags: ["UI", "UX", "Mobile", "Components"],
  },
  {
    number: "05",
    title: "Other Creative Builds",
    category: "Other Project",
    type: "Mixed",
    status: "Built",
    year: "2026",
    image: "assets/images/f5.png",
    link: "feature-project/others-project.html",
    description:
      "A flexible showcase for mixed experiments, small tools, creative concepts, and design work that lives outside one service box.",
    tags: ["Creative", "Mixed", "Tools", "Concept"],
  },
  {
    number: "06",
    title: "Secret Project",
    category: "Secret Lab",
    type: "Hidden",
    status: "Locked",
    year: "2026",
    image: "assets/images/f6.png",
    link: "feature-project/secret-project.html",
    description:
      "A hidden experimental project area for surprise ideas, protected concepts, playful interactions, and mystery-style portfolio work.",
    tags: ["Secret", "Hidden", "Experiment", "Reveal"],
  },
];

const orbitMenu = document.getElementById("orbitMenu");
const projectRail = document.getElementById("projectRail");
const projectImage = document.getElementById("projectImage");
const projectScreen = document.getElementById("projectScreen");
const screenLabel = document.getElementById("screenLabel");
const projectIndex = document.getElementById("projectIndex");
const projectMeta = document.getElementById("projectMeta");
const projectTitle = document.getElementById("projectTitle");
const projectDescription = document.getElementById("projectDescription");
const projectTags = document.getElementById("projectTags");
const projectLink = document.getElementById("projectLink");
const nextProject = document.getElementById("nextProject");
const projectTotal = document.getElementById("projectTotal");
const focusBeam = document.getElementById("focusBeam");
const progressBar = document.getElementById("progressBar");
const playToggle = document.getElementById("playToggle");

const statType = document.getElementById("statType");
const statStatus = document.getElementById("statStatus");
const statYear = document.getElementById("statYear");

const mobileQuery = window.matchMedia("(max-width: 620px)");
const canTrackPointer = window.matchMedia("(pointer: fine)").matches;

let activeIndex = 0;
let autoPlay = false;
let autoTimer;

projectTotal.textContent = String(projects.length).padStart(2, "0");

function buildVault() {
  orbitMenu.innerHTML = "";
  projectRail.innerHTML = "";

  projects.forEach((project, index) => {
    const angle = (360 / projects.length) * index;

    const node = document.createElement("button");
    node.className = "vault-node";
    node.style.setProperty("--angle", `${angle}deg`);
    node.innerHTML = `
          <b>${project.number}</b>
          <span>${project.category}</span>
        `;

    node.addEventListener("click", () => {
      pauseAuto();
      selectProject(index);
    });

    orbitMenu.appendChild(node);

    const rail = document.createElement("button");
    rail.className = "rail-item";
    rail.innerHTML = `
          <strong>${project.title}</strong>
          <span>${project.category}</span>
        `;

    rail.addEventListener("click", () => {
      pauseAuto();
      selectProject(index);
    });

    projectRail.appendChild(rail);
  });
}

function selectProject(index) {
  activeIndex = index;
  const project = projects[index];

  const angle = (360 / projects.length) * index;
  focusBeam.style.setProperty("--beam-angle", `${angle}deg`);

  projectScreen.classList.add("active-change");

  setTimeout(() => {
    projectImage.src = project.image;
    projectImage.alt = project.title;

    screenLabel.textContent = project.category;
    projectIndex.textContent = project.number;
    projectMeta.textContent = project.category;
    projectTitle.textContent = project.title;
    projectDescription.textContent = project.description;
    projectLink.href = project.link;
    projectLink.title = `Open ${project.title}`;
    projectLink.setAttribute("aria-label", `Open ${project.title} detail page`);

    statType.textContent = project.type;
    statStatus.textContent = project.status;
    statYear.textContent = project.year;

    projectTags.innerHTML = project.tags
      .map((tag) => `<span>${tag}</span>`)
      .join("");

    document.querySelectorAll(".vault-node").forEach((node, nodeIndex) => {
      node.classList.toggle("active", nodeIndex === index);
    });

    document.querySelectorAll(".rail-item").forEach((item, itemIndex) => {
      item.classList.toggle("active", itemIndex === index);
    });

    projectScreen.classList.remove("active-change");
  }, 180);

  restartProgress();
}

function nextFile() {
  const nextIndex = (activeIndex + 1) % projects.length;
  selectProject(nextIndex);
}

function startAuto() {
  autoPlay = true;
  playToggle.textContent = "Pause Auto";
  progressBar.classList.add("playing");

  clearInterval(autoTimer);
  autoTimer = setInterval(nextFile, 6000);
}

function pauseAuto() {
  autoPlay = false;
  playToggle.textContent = "Play Auto";
  progressBar.classList.remove("playing");

  clearInterval(autoTimer);
}

function restartProgress() {
  progressBar.classList.remove("playing");
  void progressBar.offsetWidth;

  if (autoPlay) {
    progressBar.classList.add("playing");
  }
}

function syncMotionMode() {
  if (mobileQuery.matches) {
    pauseAuto();
    playToggle.textContent = "Play Auto";
  }
}

nextProject.addEventListener("click", () => {
  pauseAuto();
  nextFile();
});

playToggle.addEventListener("click", () => {
  if (autoPlay) {
    pauseAuto();
  } else {
    startAuto();
  }
});

if (canTrackPointer) {
  document.addEventListener(
    "mousemove",
    (event) => {
      document.body.style.setProperty("--mx", `${event.clientX}px`);
      document.body.style.setProperty("--my", `${event.clientY}px`);
    },
    { passive: true },
  );
}

mobileQuery.addEventListener?.("change", syncMotionMode);

buildVault();
selectProject(0);
pauseAuto();

(() => {
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
    button.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" }),
    );
    sync();
    window.addEventListener("scroll", sync, { passive: true });
  }
  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", setupBackTop);
  else setupBackTop();
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
