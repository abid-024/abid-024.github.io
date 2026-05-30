/* ==================================================
   CONTACT PAGE JS
   Fixes clock + theme toggle + basic copy behavior
================================================== */

document.addEventListener("DOMContentLoaded", () => {
  setupContactClock();
  setupContactCopy();
});

function setupContactClock() {
  const timeCard = document.querySelector("[data-contact-time-card]");
  const ampmTime = document.querySelector("[data-contact-ampm-time]");
  const time24 = document.querySelector("[data-contact-time-24]");

  if (!timeCard || !ampmTime || !time24) return;

  const modes = ["ampm", "24"];

  try {
    const savedMode = localStorage.getItem("contactClockMode");
    if (modes.includes(savedMode)) {
      timeCard.dataset.contactClockMode = savedMode;
    }
  } catch (error) {
    // clock still works without storage
  }

  function updateLocalTime() {
    const now = new Date();

    ampmTime.textContent = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Dhaka",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(now);

    time24.textContent = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Dhaka",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(now);
  }

  updateLocalTime();
  setInterval(updateLocalTime, 1000);

  timeCard.addEventListener("click", () => {
    const current = timeCard.dataset.contactClockMode || "ampm";
    const next = current === "ampm" ? "24" : "ampm";

    timeCard.dataset.contactClockMode = next;

    try {
      localStorage.setItem("contactClockMode", next);
    } catch (error) {
      // ignore storage error
    }
  });
}

function setupContactCopy() {
  document.querySelectorAll("[data-contact-copy]").forEach((item) => {
    item.addEventListener("click", async (event) => {
      event.preventDefault();

      const value = item.dataset.contactCopy || "";
      const small = item.querySelector("small");
      const oldText = small ? small.textContent : "";

      try {
        await navigator.clipboard.writeText(value);
        if (small) small.textContent = "Copied";
      } catch (error) {
        if (small) small.textContent = "Copy failed";
      }

      window.setTimeout(() => {
        if (small) small.textContent = oldText;
      }, 1200);
    });
  });
}