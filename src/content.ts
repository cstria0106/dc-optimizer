import boardStyle from "./content/styles/board.css";
import cleanupStyle from "./content/styles/cleanup.css";
import controlStyle from "./content/styles/control.css";

import { renderNewBoard } from "./content/board.js";
import { registerHandlers, renderControl } from "./content/control.js";
import { getPage, page } from "./content/page.js";
import {
  getPostDataFromElement,
  getPostDataFromJson,
  PostData,
  RawPostData,
} from "./content/post-data.js";
import { styleInject } from "./style.js";

const noticeIds: number[] = [];
let boardElement = document.querySelector(".gall-detail-lst");
main();

async function main() {
  document.body.style.display = "block";

  const enable = await chrome.storage.local
    .get("enable")
    .then((data) => data["enable"]);

  if (!enable) return;

  if (page) {
    styleInject(cleanupStyle);
    styleInject(boardStyle);
    styleInject(controlStyle);

    registerHandlers();
    const control = renderControl();
    if (control) document.body.appendChild(control);

    // 게시판 페이지인 경우
    if (page.type === "board") {
      if (page.notice !== "1") {
        initializeBoard();
        setTimeout(async () => {
          await updateNoticeIds();
          await refreshBoard();
        }, 0);
      }
    }
  }
}

// 포스트 데이터를 통해 게시판 엘레멘트를 재렌더링
function replaceBoard(posts: PostData[]) {
  const newBoard = renderNewBoard(posts);
  boardElement.replaceWith(newBoard);
  boardElement = newBoard;

  history.replaceState(null, "", location.href);
}

// 첫 로딩의 게시판 HTML을 파싱하여 재렌더링
function initializeBoard() {
  const posts = [...boardElement.querySelectorAll("&>li")]
    .map(getPostDataFromElement)
    .filter((e) => e !== null);

  replaceBoard(posts);
}

// 공지사항 게시글의 ID 목록을 업데이트
async function updateNoticeIds() {
  if (!page) return;
  if (page.type !== "board") return;
  const cacheKey = `notices/${page.galleryId}`;

  // 캐싱
  const cached = await chrome.storage.local
    .get(cacheKey)
    .then((data) => data[cacheKey]);

  if (cached) {
    // 유효기간 검사 (1시간)
    const { ids, date } = cached;
    if (Date.now() - date < 1000 * 60 * 60) {
      noticeIds.push(...ids);
      return;
    }
  }

  const html = await fetch(`/board/${page.galleryId}?notice=1`).then(
    (response) => response.text()
  );
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const elements = doc.querySelectorAll(".notice a");
  const ids = [...elements]
    .map((element) => {
      const url = element.getAttribute("href");
      const page = getPage(url);
      if (page.type !== "post") return null;
      return page.postId;
    })
    .filter((id): id is number => id !== null);

  chrome.storage.local.set({
    [cacheKey]: {
      ids,
      date: Date.now(),
    },
  });
  noticeIds.push(...ids);
}

async function listPosts() {
  if (!page) return [];
  if (page.type !== "board") return [];

  const galleryId = page.galleryId;

  // API 호출
  const formData = new FormData();
  formData.append("id", galleryId);
  formData.append("page", page.page);
  formData.append("recommend", page.recommend);
  formData.append("headid", page.headid);
  return (
    fetch("/ajax/response-list", {
      method: "POST",
      body: formData,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "X-CSRF-TOKEN": page.csrfToken,
      },
    })
      .then((response) => response.json())
      // 포스트 데이터 배열로 정제
      .then(
        (data: {
          gall_list: {
            data: RawPostData[];
          };
        }) =>
          data.gall_list.data.map((data) =>
            getPostDataFromJson(data, galleryId)
          )
      )
      // 공지사항 거르기
      .then((posts) => posts.filter((post) => !noticeIds.includes(post.id)))
  );
}

// API를 통해 게시판 새로고침
async function refreshBoard() {
  // 랜덤 시간만큼 대기
  await new Promise((resolve) =>
    setTimeout(resolve, Math.random() * 2000 + 2000)
  );

  if (!page) return;
  if (page.type !== "board") return;

  const posts = await listPosts();
  replaceBoard(posts);

  // 새로고침 반복
  setTimeout(refreshBoard, 0);
}
