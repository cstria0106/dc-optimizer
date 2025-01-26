export function styleInject(
  css: string,
  ref?: { insertAt?: "top" | "bottom" }
) {
  if (ref === undefined) ref = {};
  var insertAt = ref.insertAt;

  if (typeof document === "undefined") {
    return;
  }

  var head = document.head || document.getElementsByTagName("head")[0];
  var style = document.createElement("style");
  style.setAttribute("type", "text/css");

  if (insertAt === "top") {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (
    "styleSheet" in style &&
    typeof style.styleSheet === "object" &&
    "cssText" in style.styleSheet
  ) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}
