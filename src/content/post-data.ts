import { getPage } from "./page.js";

export type PostData = {
  id: number;
  postBadge: Node;
  title: string;
  commentCount: number;
  authorIsIp: boolean;
  authorBadge: Node;
  authorName: string;
  authorId: string;
  tab: string;
  date: string;
  viewCount: number;
  recommendCount: number;
  url: string;
};

export function getPostDataFromElement(element: Element): PostData | null {
  if (element.classList.contains("adv-inner")) return null;

  try {
    const url = element.querySelector("a:nth-child(1)").getAttribute("href");
    const page = getPage(url);
    if (page.type !== "post") return null;

    const postBadge = element.querySelector(".sp-lst")?.cloneNode(true);
    const title = element.querySelector(".subjectin").textContent.trim();

    const commentCount = parseInt(
      element.querySelector(".gall-detail-lnktb > a:nth-child(2)").textContent
    );
    const authorIsIp = element.querySelector(".sp-nick") === null;
    const authorBadge = element.querySelector(".sp-nick")?.cloneNode(true);
    const infoElement = element.querySelector(".blockInfo");
    const authorName = infoElement.getAttribute("data-name").trim();
    const authorId = infoElement.getAttribute("data-info").trim();

    const tab = element
      .querySelector(".ginfo li:nth-child(1)")
      .textContent.trim();
    const date = element
      .querySelector(".ginfo li:nth-child(3)")
      .textContent.trim();
    const viewCount = parseInt(
      element
        .querySelector(".ginfo li:nth-child(4)")
        .textContent.replace("조회 ", "")
    );
    const recommendCount = parseInt(
      element.querySelector(".ginfo li:nth-child(5) span").textContent
    );

    return {
      id: page.postId,
      postBadge,
      title,
      commentCount,
      authorIsIp,
      authorBadge,
      authorName,
      authorId,
      tab,
      date,
      viewCount,
      recommendCount,
      url,
    };
  } catch (e) {
    return null;
  }
}

export type RawPostData = {
  no: number;
  ip: string;
  name: string;
  headtext: string;
  subject: string;
  user_id: string;
  write_time: string;
  hit: number;
  total_comment: number;
  nicktype: string;
  recommend: number;
  title_icon: string;
};

function createElementFromString(html: string): Node {
  const template = document.createElement("template");
  template.innerHTML = html;
  return template.content.firstChild;
}

function createElementFromClasses(
  tag: string,
  content: string,
  ...classes: string[]
): HTMLElement {
  const element = document.createElement(tag);
  element.classList.add(...classes);
  element.textContent = content;
  return element;
}

export function getPostDataFromJson(
  data: RawPostData,
  galleryId: string
): PostData {
  const authorIp = data.ip.trim();
  const authorIsIp = authorIp.length > 0;

  return {
    id: data.no,
    postBadge: createElementFromClasses(
      "span",
      "아이콘",
      "sp-lst",
      data.title_icon
    ),
    title: data.subject.trim(),
    commentCount: data.total_comment,
    authorIsIp,
    authorBadge: createElementFromString(data.nicktype),
    authorName: data.name.trim(),
    authorId: authorIsIp ? authorIp : data.user_id.trim(),
    tab: data.headtext.trim(),
    date: data.write_time.trim(),
    viewCount: data.hit,
    recommendCount: data.recommend,
    url: `https://m.dcinside.com/board/${galleryId}/${data.no}`,
  };
}
