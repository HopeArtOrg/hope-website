import mermaid from "mermaid";

export async function renderMermaid() {
  mermaid.initialize({
    startOnLoad: false,
    theme: document.documentElement.classList.contains("dark") ? "dark" : "neutral",
    fontFamily: "JetBrains Mono, monospace",
    securityLevel: "loose",
    flowchart: { useMaxWidth: false, htmlLabels: true },
    er: { useMaxWidth: false },
    sequence: { useMaxWidth: false },
  });

  const codeBlocks = document.querySelectorAll("pre > code.language-mermaid");
  for (const code of codeBlocks) {
    const pre = code.parentElement;
    if (!pre || pre.getAttribute("data-mermaid-processed")) {
      continue;
    }

    const content = code.textContent;
    const div = document.createElement("div");
    div.className = "mermaid-wrapper :uno: cursor-grab active:cursor-grabbing overflow-auto my-12 border border-border/20 rounded-xl bg-white/5 backdrop-blur-sm p-4";

    const inner = document.createElement("div");
    inner.className = "mermaid flex justify-center min-w-max scale-110 origin-center py-8";
    inner.textContent = content ?? "";

    div.appendChild(inner);
    pre.parentElement?.replaceChild(div, pre);
    pre.setAttribute("data-mermaid-processed", "true");
  }

  await mermaid.run();

  const wrappers = document.querySelectorAll(".mermaid-wrapper");
  wrappers.forEach((wrapper) => {
    let isDown = false;
    let startX: number;
    let scrollLeft: number;
    let scrollTop: number;
    let startY: number;

    wrapper.addEventListener("mousedown", (e) => {
      isDown = true;
      wrapper.classList.add("active");
      startX = (e as MouseEvent).pageX - (wrapper as HTMLElement).offsetLeft;
      startY = (e as MouseEvent).pageY - (wrapper as HTMLElement).offsetTop;
      scrollLeft = wrapper.scrollLeft;
      scrollTop = wrapper.scrollTop;
    });

    wrapper.addEventListener("mouseleave", () => {
      isDown = false;
    });

    wrapper.addEventListener("mouseup", () => {
      isDown = false;
    });

    wrapper.addEventListener("mousemove", (e) => {
      if (!isDown) {
        return;
      }
      e.preventDefault();
      const x = (e as MouseEvent).pageX - (wrapper as HTMLElement).offsetLeft;
      const y = (e as MouseEvent).pageY - (wrapper as HTMLElement).offsetTop;
      const walkX = (x - startX) * 2;
      const walkY = (y - startY) * 2;
      wrapper.scrollLeft = scrollLeft - walkX;
      wrapper.scrollTop = scrollTop - walkY;
    });

    wrapper.addEventListener("wheel", (e) => {
      if ((e as WheelEvent).ctrlKey) {
        e.preventDefault();
        const inner = wrapper.querySelector(".mermaid") as HTMLElement;
        const delta = (e as WheelEvent).deltaY > 0 ? 0.9 : 1.1;
        const currentScale = Number.parseFloat(inner.style.transform.replace("scale(", "").replace(")", "") || "1.1");
        const newScale = Math.min(Math.max(currentScale * delta, 0.5), 3);
        inner.style.transform = `scale(${newScale})`;
      }
    }, { passive: false });
  });
}

export function setupMermaid() {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "attributes" && mutation.attributeName === "class") {
        renderMermaid();
      }
    }
  });

  observer.observe(document.documentElement, { attributes: true });

  renderMermaid();
  document.addEventListener("astro:page-load", renderMermaid);
}
