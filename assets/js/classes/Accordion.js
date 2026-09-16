/**
 * Accordion
 * Expand/collapse for .accordion__item elements. Items open independently.
 * Without JS every panel stays open (the collapsed styles are scoped to .js).
 */
export class Accordion {
  static #uid = 0;

  constructor(container) {
    this.items = Array.from(container.querySelectorAll(".accordion__item"));
  }

  init() {
    this.items.forEach((item) => {
      const trigger = item.querySelector(".accordion__trigger");
      const panel = item.querySelector(".accordion__panel");
      if (!trigger || !panel) return;

      Accordion.#uid += 1;
      panel.id ||= `accordion-panel-${Accordion.#uid}`;
      trigger.setAttribute("aria-controls", panel.id);
      this.#setOpen(item, trigger, false);

      trigger.addEventListener("click", () => {
        this.#setOpen(item, trigger, item.dataset.open !== "true");
      });
    });
  }

  #setOpen(item, trigger, open) {
    item.dataset.open = String(open);
    trigger.setAttribute("aria-expanded", String(open));
  }
}
