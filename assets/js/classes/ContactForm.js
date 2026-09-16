/**
 * ContactForm
 * Submits a Formspree-backed form via fetch so the visitor stays on the
 * page, with inline validation and an aria-live status message. Spam is
 * filtered by Formspree's built-in "_gotcha" honeypot field.
 *
 * The form's action is a placeholder until a real Formspree endpoint is
 * added (see README.md).
 */
export class ContactForm {
  constructor(form) {
    this.form = form;
    this.statusEl = form.querySelector("[data-form-status]");
    this.submitBtn = form.querySelector('button[type="submit"]');
    this.submitLabel = form.querySelector("[data-submit-label]");
  }

  init() {
    this.form.addEventListener("submit", (event) => this.#handleSubmit(event));
    this.form.addEventListener("input", (event) => event.target.removeAttribute("aria-invalid"));
    this.form.addEventListener("change", (event) => event.target.removeAttribute("aria-invalid"));
  }

  async #handleSubmit(event) {
    event.preventDefault();
    if (!this.#validate()) return;

    const endpoint = this.form.getAttribute("action") || "";
    if (endpoint.includes("YOUR_FORM_ID")) {
      this.#setStatus("error", "This form is not connected yet. Please try again soon.");
      return;
    }

    this.#setLoading(true);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(this.form),
      });

      if (!response.ok) throw new Error(`Request failed: ${response.status}`);

      this.form.reset();
      this.#setStatus("success", "Thank you. Your message has been sent and we will respond as soon as we can.");
    } catch {
      this.#setStatus("error", "Your message could not be sent. Please check your connection and try again.");
    } finally {
      this.#setLoading(false);
    }
  }

  #validate() {
    let firstInvalid = null;

    this.form.querySelectorAll("[required]").forEach((field) => {
      const isValid = field.type === "checkbox" ? field.checked : field.value.trim() !== "";
      const isEmailValid = field.type !== "email" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());

      if (isValid && isEmailValid) return;
      field.setAttribute("aria-invalid", "true");
      firstInvalid ??= field;
    });

    if (!firstInvalid) return true;

    const message =
      firstInvalid.type === "email" && firstInvalid.value.trim()
        ? "Please enter a valid email address."
        : "Please complete the highlighted fields before sending.";
    this.#setStatus("error", message);
    firstInvalid.focus();
    return false;
  }

  #setStatus(state, message) {
    if (!this.statusEl) return;
    this.statusEl.dataset.state = state;
    this.statusEl.textContent = message;
  }

  #setLoading(isLoading) {
    if (!this.submitBtn) return;
    this.submitBtn.disabled = isLoading;
    this.submitBtn.classList.toggle("is-loading", isLoading);
    if (this.submitLabel) this.submitLabel.textContent = isLoading ? "Sending" : "Send message";
  }
}
