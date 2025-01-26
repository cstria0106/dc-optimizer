import { match, P } from "ts-pattern";

export const page = getPage();
export const tabs = getTabs();

export function getPage(href: string = window.location.href) {
  const url = new URL(href);
  const split = url.pathname.split("/").slice(1);
  const csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    ?.getAttribute("content");

  return {
    ...match(split)
      .with(["board", P.string], ([_, galleryId]) => {
        return {
          type: "board",
          galleryId,
          page: url.searchParams.get("page") ?? "1",
          recommend: url.searchParams.get("recommend") ?? "0",
          headid: url.searchParams.get("headid") ?? "0",
          notice: url.searchParams.get("notice") ?? "0",
        } as const;
      })
      .with(["board", P.string, P.string], ([_, galleryId, postId]) => {
        return {
          type: "post",
          galleryId,
          postId: parseInt(postId),
        } as const;
      })
      .otherwise(
        () =>
          ({
            type: "unknown",
          } as const)
      ),
    csrfToken,
  };
}

function getTabs() {
  const tabs = document.querySelectorAll(".mal-lst a");
  return [...tabs].slice(1).map((x) => ({
    text: x.textContent.trim(),
    url: x.getAttribute("href"),
  }));
}
