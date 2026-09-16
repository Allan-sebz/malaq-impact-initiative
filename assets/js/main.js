import { PartialLoader } from "./classes/PartialLoader.js";
import { Navigation } from "./classes/Navigation.js";
import { QuickExit } from "./classes/QuickExit.js";
import { RevealOnScroll } from "./classes/RevealOnScroll.js";
import { Accordion } from "./classes/Accordion.js";
import { ContactForm } from "./classes/ContactForm.js";

/**
 * App
 * Entry point: loads shared partials, then wires up every component
 * that exists on the current page. Each feature class only activates
 * if its DOM hook is present, so one script safely serves every page.
 */
class App {
  async start() {
    await new PartialLoader([
      { selector: "#site-header", url: "partials/header.html" },
      { selector: "#site-footer", url: "partials/footer.html" },
    ]).loadAll();

    new Navigation(document).init();
    new QuickExit(document).init();
    new RevealOnScroll(document).init();

    document.querySelectorAll("[data-accordion]").forEach((container) => {
      new Accordion(container).init();
    });

    const contactForm = document.querySelector("[data-contact-form]");
    if (contactForm) new ContactForm(contactForm).init();

    this.#setCopyrightYear();
  }

  #setCopyrightYear() {
    const yearEl = document.querySelector("[data-current-year]");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new App().start();
});
