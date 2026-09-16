import { PartialLoader } from "./classes/PartialLoader.js";
import { Navigation } from "./classes/Navigation.js";
import { QuickExit } from "./classes/QuickExit.js";
import { RevealOnScroll } from "./classes/RevealOnScroll.js";
import { Accordion } from "./classes/Accordion.js";
import { Tabs } from "./classes/Tabs.js";
import { SafetyChecklist } from "./classes/SafetyChecklist.js";
import { CounterGroup } from "./classes/CounterGroup.js";
import { ScrollSpy } from "./classes/ScrollSpy.js";
import { BackToTop } from "./classes/BackToTop.js";
import { ContactForm } from "./classes/ContactForm.js";

/**
 * App
 * Page components start immediately so content never waits on the network;
 * header and footer behaviour is wired up once their partials have loaded.
 */
class App {
  async start() {
    new QuickExit().init();
    this.#initPageComponents();

    await new PartialLoader([
      { selector: "#site-header", url: "partials/header.html" },
      { selector: "#site-footer", url: "partials/footer.html" },
    ]).loadAll();

    new Navigation(document).init();
    new BackToTop(document.querySelector("[data-back-to-top]")).init();
    this.#setCurrentYear();
  }

  #initPageComponents() {
    new RevealOnScroll(document).init();
    new CounterGroup(document).init();

    document.querySelectorAll("[data-accordion]").forEach((el) => new Accordion(el).init());
    document.querySelectorAll("[data-tabs]").forEach((el) => new Tabs(el).init());
    document.querySelectorAll("[data-safety-check]").forEach((el) => new SafetyChecklist(el).init());
    document.querySelectorAll("[data-scrollspy]").forEach((el) => new ScrollSpy(el).init());
    document.querySelectorAll("[data-contact-form]").forEach((el) => new ContactForm(el).init());
  }

  #setCurrentYear() {
    document.querySelectorAll("[data-current-year]").forEach((el) => {
      el.textContent = String(new Date().getFullYear());
    });
  }
}

new App().start();
