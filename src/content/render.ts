import { html, render as renderInto } from "lit-html";

export function render(e: ReturnType<typeof html>) {
  const temp = document.createElement("div");
  renderInto(e, temp);
  return temp.firstElementChild;
}
