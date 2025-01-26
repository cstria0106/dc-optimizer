import { html } from "lit-html";
import { page } from "./page.js";
import { render } from "./render.js";

export const renderControl = () => {
  if (page.type === "unknown") return;
  return render(html`<div class="optimize-dc">
    <div class="control">
      <a class="write" href="${`https://m.dcinside.com/write/${page.galleryId}`}">글쓰기 (W)</button>
      <a class="recommend" href="${`https://m.dcinside.com/board/${page.galleryId}?recommend=1`}">개념글</button>
    </div>
  </div>`);
};

function gotoPage(delta: number) {
  const url = new URL(location.href);
  const page = url.searchParams.get("page") ?? "1";
  const nextPage = parseInt(page) + delta;
  if (nextPage < 1) return;
  url.searchParams.set("page", nextPage.toString());
  location.href = url.toString();
}

export const registerHandlers = () => {
  window.addEventListener("keydown", (e) => {
    if (e.target !== document.body) return;
    if (page.type === "unknown") return;

    if (e.key === "w") {
      e.preventDefault();
      window.location.href = `https://m.dcinside.com/write/${page.galleryId}`;
    }

    if (page.type === "board") {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        gotoPage(-1);
      }

      if (e.key === "ArrowRight") {
        e.preventDefault();
        gotoPage(1);
      }
    }
  });
};
