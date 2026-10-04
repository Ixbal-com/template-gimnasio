// Interruptor mensual / anual de las membresías. Cada texto que cambia lleva
// data-monthly y data-yearly; sin JavaScript se ve el precio mensual.
export function initPricingToggle() {
  const buttons = [...document.querySelectorAll("[data-billing]")];
  if (!buttons.length) return;

  const group = buttons[0].closest("[data-billing-group]");
  if (group) group.hidden = false;

  const apply = (period) => {
    for (const button of buttons) button.setAttribute("aria-pressed", String(button.dataset.billing === period));
    for (const element of document.querySelectorAll("[data-monthly][data-yearly]")) {
      element.textContent = period === "yearly" ? element.dataset.yearly : element.dataset.monthly;
    }
  };

  for (const button of buttons) button.addEventListener("click", () => apply(button.dataset.billing));
}
