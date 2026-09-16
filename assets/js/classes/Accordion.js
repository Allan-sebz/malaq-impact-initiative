/**
 * Accordion
 * Progressive-enhancement expand/collapse for grouped [data-accordion-item]
 * elements. Only one panel open at a time within a given container.
 */
export class Accordion {
  constructor(container) {
    this.container = container;
    this.items = Array.from(container.querySelectorAll(".accordion-item"));
  }

  init() {
    this.items.forEach((item) => {
      const trigger = item.querySelector(".accordion-trigger");
      const panel = item.querySelector(".accordion-panel");
      if (!trigger || !panel) return;

      trigger.addEventListener("click", () => this.#toggle(item, panel));
    });
  }

  #toggle(item, panel) {
    const isOpen = item.getAttribute("data-open") === "true";

    this.items.forEach((other) => {
      other.setAttribute("data-open", "false");
      const otherPanel = other.querySelector(".accordion-panel");
      const otherTrigger = other.querySelector(".accordion-trigger");
      if (otherPanel) otherPanel.style.maxHeight = null;
      if (otherTrigger) otherTrigger.setAttribute("aria-expanded", "false");
    });

    if (!isOpen) {
      item.setAttribute("data-open", "true");
      panel.style.maxHeight = `${panel.scrollHeight}px`;
      item.querySelector(".accordion-trigger").setAttribute("aria-expanded", "true");
    }
  }
}
