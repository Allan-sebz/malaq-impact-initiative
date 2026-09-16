/**
 * ContactForm
 * Submits a Formspree-backed form via fetch (AJAX) so the visitor stays
 * on the page, with basic client-side validation and an aria-live status
 * region. Spam protection is Formspree's built-in honeypot: a hidden
 * "_gotcha" field that, if filled by a bot, causes Formspree to silently
 * discard the submission.
 *
 * NOTE: the form's `action` attribute currently points to a placeholder
 * Formspree endpoint. See README.md for how to swap in the real one.
 */
export class ContactForm {
  constructor(form) {
    this.form = form;
    this.statusEl = form.querySelector("[data-form-status]");
    this.submitBtn = form.querySelector('button[type="submit"]');
  }

  init() {
    if (!this.form) return;
    this.form.addEventListener("submit", (event) => this.#handleSubmit(event));
  }

  async #handleSubmit(event) {
    event.preventDefault();

    if (!this.#validate()) return;

    const endpoint = this.form.getAttribute("action") || "";
    if (endpoint.includes("YOUR_FORM_ID")) {
      this.#setStatus(
        "error",
        "This form isn't connected yet — add your Formspree endpoint in contact.html (see README.md)."
      );
      return;
    }

    this.#setLoading(true);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(this.form),
      });

      if (response.ok) {
        this.#setStatus("success", "Thank you — your message has been sent. We'll respond as soon as we can.");
        this.form.reset();
      } else {
        this.#setStatus("error", "Something went wrong sending your message. Please try again in a moment.");
      }
    } catch {
      this.#setStatus("error", "Network error — please check your connection and try again.");
    } finally {
      this.#setLoading(false);
    }
  }

  #validate() {
    const requiredFields = this.form.querySelectorAll("[required]");
    for (const field of requiredFields) {
      if (!field.value.trim()) {
        this.#setStatus("error", "Please fill in all required fields before sending.");
        field.focus();
        return false;
      }
    }

    const emailField = this.form.querySelector('input[type="email"]');
    if (emailField && !this.#isValidEmail(emailField.value)) {
      this.#setStatus("error", "Please enter a valid email address.");
      emailField.focus();
      return false;
    }

    return true;
  }

  #isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  #setStatus(state, message) {
    if (!this.statusEl) return;
    this.statusEl.setAttribute("data-state", state);
    this.statusEl.textContent = message;
  }

  #setLoading(isLoading) {
    if (!this.submitBtn) return;
    this.submitBtn.disabled = isLoading;
    this.submitBtn.textContent = isLoading ? "Sending…" : this.submitBtn.dataset.defaultLabel || "Send message";
  }
}
