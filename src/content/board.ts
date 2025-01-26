import commaNumber from "comma-number";
import he from "he";
import { html } from "lit-html";
import { tabs } from "./page.js";
import { PostData } from "./post-data.js";
import { render } from "./render.js";

function createPostElement(data: PostData | null) {
  if (data === null) return null;
  return html`
    <a class="tab" href="${tabs.find((e) => e.text === data.tab)?.url ?? ""}">
      ${data.tab}
    </a>
    <a class="title" href="${data.url}">
      <span class="post-badge">${data.postBadge}</span>
      <span class="title-text">${he.decode(data.title)}</span>
      <span class="comment-count">[${commaNumber(data.commentCount)}]</span>
    </a>
    <div class="author ${data.authorIsIp ? "ip" : ""}">
      <span class="author-name"> ${data.authorName}</span>
      <span class="author-id">(${data.authorId})</span>
      ${data.authorBadge
        ? html`<a
            class="author-badge"
            href="${`https://m.dcinside.com/gallog/${data.authorId}`}"
            >${data.authorBadge}</a
          >`
        : ""}
    </div>
    <div class="date">${data.date}</div>
    <div class="view-count">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <title>eye_2_line</title>
        <g id="eye_2_line" fill="none" fill-rule="evenodd">
          <path
            d="M24 0v24H0V0zM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01z"
          />
          <path
            fill="currentColor"
            d="M4 12.001zc.003-.016.017-.104.095-.277.086-.191.225-.431.424-.708.398-.553.993-1.192 1.745-1.798C7.777 7.996 9.812 7 12 7c2.188 0 4.223.996 5.736 2.216.752.606 1.347 1.245 1.745 1.798.2.277.338.517.424.708.078.173.092.261.095.277V12c-.003.016-.017.104-.095.277a4.251 4.251 0 0 1-.424.708c-.398.553-.993 1.192-1.745 1.798C16.224 16.004 14.189 17 12 17c-2.188 0-4.223-.996-5.736-2.216-.752-.606-1.347-1.245-1.745-1.798a4.226 4.226 0 0 1-.424-.708A1.115 1.115 0 0 1 4 12.001M12 5C9.217 5 6.752 6.254 5.009 7.659c-.877.706-1.6 1.474-2.113 2.187a6.157 6.157 0 0 0-.625 1.055C2.123 11.23 2 11.611 2 12c0 .388.123.771.27 1.099.155.342.37.7.626 1.055.513.713 1.236 1.48 2.113 2.187C6.752 17.746 9.217 19 12 19c2.783 0 5.248-1.254 6.991-2.659.877-.706 1.6-1.474 2.113-2.187.257-.356.471-.713.625-1.055.148-.328.271-.71.271-1.099 0-.388-.123-.771-.27-1.099a6.197 6.197 0 0 0-.626-1.055c-.513-.713-1.236-1.48-2.113-2.187C17.248 6.254 14.783 5 12 5m-1 7a1 1 0 1 1 2 0 1 1 0 0 1-2 0m1-3a3 3 0 1 0 0 6 3 3 0 0 0 0-6"
          />
        </g>
      </svg>
      ${commaNumber(data.viewCount)}
    </div>
    <div class="recommend-count ${data.recommendCount > 0 ? "positive" : ""}">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <title>thumb_up_2_line</title>
        <g id="thumb_up_2_line" fill="none" fill-rule="evenodd">
          <path
            d="M24 0v24H0V0zM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01z"
          />
          <path
            fill="currentColor"
            d="M9.821 3.212c.296-.69 1.06-1.316 2.024-1.13 1.474.283 3.039 1.401 3.149 3.214L15 5.5V8h2.405a4 4 0 0 1 3.966 4.522l-.03.194-.91 5a4 4 0 0 1-3.736 3.28l-.199.004H6a3 3 0 0 1-2.995-2.824L3 18v-6a3 3 0 0 1 2.824-2.995L6 9h1.34zM7 11H6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h1zm4.625-6.92-2.544 5.937a1 1 0 0 0-.072.259L9 10.41V19h7.496a2 2 0 0 0 1.933-1.486l.035-.156.91-5a2 2 0 0 0-1.82-2.353L17.405 10H15a2 2 0 0 1-1.995-1.85L13 8V5.5c0-.553-.434-1.116-1.205-1.37z"
          />
        </g>
      </svg>
      ${commaNumber(data.recommendCount)}
    </div>
  `;
}
export function renderNewBoard(posts: PostData[]) {
  return render(
    html`<div class="optimize-dc">
      <div class="board">
        ${posts.map(createPostElement).filter((x) => x !== null)}
      </div>
    </div>`
  );
}
