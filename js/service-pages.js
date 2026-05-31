/* SERVICE PAGES JS
   Only handles service page Web3Forms AJAX submit.
   Theme/back-to-top is handled by js/theme.js.
*/

(() => {
  const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

  function isServiceForm(form) {
    return (
      form instanceof HTMLFormElement &&
      (form.matches("[data-service-form]") ||
        form.classList.contains("service-contact-form"))
    );
  }

  function syncHiddenPageFields(form) {
    const pageUrlInput = form.querySelector('input[name="page_url"]');
    const pageTitleInput = form.querySelector('input[name="page_title"]');

    if (pageUrlInput) pageUrlInput.value = window.location.href;
    if (pageTitleInput) pageTitleInput.value = document.title;
  }

  async function submitServiceForm(event) {
    const form = event.target;

    if (!isServiceForm(form)) return;

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    if (!form.checkValidity()) {
      form.reportValidity();
      return false;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    const defaultButtonText =
      submitButton?.dataset.defaultText ||
      submitButton?.textContent.trim() ||
      "Send Message";

    if (submitButton) {
      submitButton.dataset.defaultText = defaultButtonText;
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }

    syncHiddenPageFields(form);

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
      syncHiddenPageFields(form);

      if (submitButton) {
        submitButton.textContent = "Message sent";

        window.setTimeout(() => {
          submitButton.textContent = defaultButtonText;
          submitButton.disabled = false;
        }, 2200);
      }
    } catch (error) {
      console.error("Service form failed:", error);

      if (submitButton) {
        submitButton.textContent = "Try again";
        submitButton.disabled = false;
      }
    }

    return false;
  }

  document.addEventListener("submit", submitServiceForm, true);

  function initServiceForms() {
    document
      .querySelectorAll("form[data-service-form], form.service-contact-form")
      .forEach((form) => {
        form.removeAttribute("action");
        form.removeAttribute("method");
        syncHiddenPageFields(form);
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initServiceForms);
  } else {
    initServiceForms();
  }
})();
