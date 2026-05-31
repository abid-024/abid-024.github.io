/* ==================================================
   CONTACT PAGE JS
   Clock + copy + AJAX Web3Forms submit
================================================== */

document.addEventListener("DOMContentLoaded", () => {
  setupContactClock();
  setupContactCopy();
  setupContactMessageForm();
  setupContactFormPlacement();
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
  } catch (error) {}

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
    } catch (error) {}
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

function setupContactMessageForm() {
  const form = document.querySelector("form[data-contact-message-form]");
  if (!form) return;

  const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

  form.removeAttribute("action");
  form.removeAttribute("method");

  const button = form.querySelector('button[type="submit"]');
  const status = form.querySelector("[data-contact-form-status]");
  const defaultText = button ? button.textContent.trim() : "Send Message";

  const pageUrlInput = form.querySelector('input[name="page_url"]');
  const pageTitleInput = form.querySelector('input[name="page_title"]');

  function syncPageFields() {
    if (pageUrlInput) pageUrlInput.value = window.location.href;
    if (pageTitleInput) pageTitleInput.value = document.title;
  }

  function setStatus(text) {
    if (status) status.textContent = text;
  }

  syncPageFields();

  form.addEventListener(
    "submit",
    async (event) => {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      if (!form.checkValidity()) {
        form.reportValidity();
        return false;
      }

      if (!button) return false;

      button.disabled = true;
      button.textContent = "Sending...";
      setStatus("");

      syncPageFields();

      try {
        const response = await fetch(WEB3FORMS_ENDPOINT, {
          method: "POST",
          body: new FormData(form),
          headers: {
            Accept: "application/json",
          },
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Web3Forms submit failed");
        }

        form.reset();
        syncPageFields();

        button.textContent = "Message sent";
        setStatus("Message sent successfully.");

        window.setTimeout(() => {
          button.textContent = defaultText;
          button.disabled = false;
          setStatus("");
        }, 2200);
      } catch (error) {
        console.error("Contact form failed:", error);
        button.textContent = "Try again";
        button.disabled = false;
        setStatus("Something went wrong. Try again.");
      }

      return false;
    },
    true,
  );
}

function setupContactFormPlacement() {
  const messageBox = document.querySelector(".contact-message-box");
  const leftCard = document.querySelector(".contact-left-card");
  const rightCard = document.querySelector(".contact-right-card");

  if (!messageBox || !leftCard || !rightCard) return;

  const phoneScreen = window.matchMedia("(max-width: 680px)");

  function placeForm() {
    if (phoneScreen.matches) {
      /* phone only: move quick message after all contact links */
      rightCard.after(messageBox);
    } else {
      /* pc + tablet: keep quick message at bottom of left card */
      leftCard.appendChild(messageBox);
    }
  }

  placeForm();

  if (phoneScreen.addEventListener) {
    phoneScreen.addEventListener("change", placeForm);
  } else {
    phoneScreen.addListener(placeForm);
  }
}
