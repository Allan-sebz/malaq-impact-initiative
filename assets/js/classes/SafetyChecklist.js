/**
 * SafetyChecklist
 * Interactive self-check with a progress ring. Deliberately stores nothing:
 * a saved record of this page could itself put a visitor at risk.
 */
export class SafetyChecklist {
  static MESSAGES = [
    { min: 1, text: "Excellent. Revisit this checklist every few months, or after any change in your relationships or devices." },
    { min: 0.5, text: "You are well on your way. Work through the remaining steps when you can." },
    { min: 0.01, text: "A good start. Each step makes it harder for someone to misuse your accounts or devices." },
    { min: 0, text: "Tick each step you have already taken to see where you stand." },
  ];

  constructor(root) {
    this.inputs = Array.from(root.querySelectorAll('input[type="checkbox"]'));
    this.valueEl = root.querySelector("[data-check-value]");
    this.ring = root.querySelector("[data-check-ring]");
    this.messageEl = root.querySelector("[data-check-message]");
    this.resetBtn = root.querySelector("[data-check-reset]");
  }

  init() {
    if (!this.inputs.length) return;

    if (this.ring) {
      this.circumference = 2 * Math.PI * Number(this.ring.getAttribute("r"));
      this.ring.style.strokeDasharray = String(this.circumference);
    }

    this.inputs.forEach((input) => input.addEventListener("change", () => this.#update()));

    this.resetBtn?.addEventListener("click", () => {
      this.inputs.forEach((input) => {
        input.checked = false;
      });
      this.#update();
    });

    this.#update();
  }

  #update() {
    const total = this.inputs.length;
    const done = this.inputs.filter((input) => input.checked).length;
    const ratio = done / total;

    this.inputs.forEach((input) => {
      input.closest(".check-item")?.classList.toggle("is-checked", input.checked);
    });

    if (this.valueEl) this.valueEl.textContent = `${done}/${total}`;
    if (this.ring) this.ring.style.strokeDashoffset = String(this.circumference * (1 - ratio));
    if (this.messageEl) {
      this.messageEl.textContent = SafetyChecklist.MESSAGES.find((message) => ratio >= message.min).text;
    }
  }
}
