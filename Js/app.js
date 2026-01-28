import { files } from "./data/data.js";

/* =======================
   DOM
======================= */
const elFileList = document.getElementById("fileList");
const elTabsBar = document.getElementById("tabsBar");
const elEditorEmpty = document.getElementById("editorEmpty");
const elEditorPane = document.getElementById("editorPane");
const elCodeView = document.getElementById("codeView");
const elLineNums = document.getElementById("lineNums");
const elBreadcrumb = document.getElementById("breadcrumb");

const elStatusFile = document.getElementById("statusFile");
const elStatusLang = document.getElementById("statusLang");
const elStatusPos = document.getElementById("statusPos");

/* =======================
   State
======================= */
const state = {
  openTabs: [],
  activeId: null,
  folderOpen: true
};

const storageKey = "portfolioVscodeState";

/* =======================
   SVG Icons
======================= */
const svg = {
  explorer: `<svg viewBox="0 0 24 24" class="svgIcon" aria-hidden="true"><path fill="currentColor" d="M4 4h16v16H4V4zm2 2v12h12V6H6z"/></svg>`,
  search: `<svg viewBox="0 0 24 24" class="svgIcon" aria-hidden="true"><path fill="currentColor" d="M10 2a8 8 0 105.3 14.1l4.3 4.3 1.4-1.4-4.3-4.3A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z"/></svg>`,
  git: `<svg viewBox="0 0 24 24" class="svgIcon" aria-hidden="true"><path fill="currentColor" d="M12 2l10 10-3 3-2-2v-3l-3-3H11L9 4l3-2zm-1 7h3l3 3v3l-6-6zM2 12l7-7 2 2-5 5 5 5-2 2-7-7z"/></svg>`,
  run: `<svg viewBox="0 0 24 24" class="svgIcon" aria-hidden="true"><path fill="currentColor" d="M8 5v14l11-7L8 5z"/></svg>`,
  gear: `<svg viewBox="0 0 24 24" class="svgIcon" aria-hidden="true"><path fill="currentColor" d="M19.4 13a7.7 7.7 0 000-2l2-1.6-2-3.4-2.3.7a8 8 0 00-1.7-1l-.3-2.4H11l-.3 2.4a8 8 0 00-1.7 1L6.7 6 4.7 9.4 6.7 11a7.7 7.7 0 000 2l-2 1.6 2 3.4 2.3-.7a8 8 0 001.7 1l.3 2.4h4l.3-2.4a8 8 0 001.7-1l2.3.7 2-3.4-2-1.6zM12 15.5A3.5 3.5 0 1112 8a3.5 3.5 0 010 7.5z"/></svg>`,

  // file icons
  readme: `<svg viewBox="0 0 24 24" class="svgIcon" aria-hidden="true"><path fill="currentColor" d="M6 2h9l3 3v17H6V2zm9 1.5V6h2.5L15 3.5zM8 10h8v2H8v-2zm0 4h8v2H8v-2zm0 4h6v2H8v-2z"/></svg>`,
  js: `<svg viewBox="0 0 24 24" class="svgIcon" aria-hidden="true"><path fill="currentColor" d="M3 3h18v18H3V3zm10 14c0 1.1-.7 2-2.2 2-1.2 0-1.9-.6-2.3-1.3l1.2-.7c.2.4.5.7 1.1.7.6 0 .9-.2.9-.9V10h1.3v7zm6 0c0 1.3-.8 2-2.2 2-1.1 0-1.8-.5-2.2-1.2l1.2-.7c.2.4.5.7 1 .7.5 0 .8-.2.8-.7 0-.5-.4-.7-1.1-1l-.4-.2c-1-.4-1.7-.9-1.7-2.1 0-1 .8-1.8 2-1.8.9 0 1.5.3 2 1l-1.1.7c-.2-.4-.5-.6-.9-.6-.4 0-.7.3-.7.6 0 .4.3.6.9.9l.4.2c1.2.5 1.9 1 1.9 2.2z"/></svg>`,
  user: `<svg viewBox="0 0 24 24" class="svgIcon" aria-hidden="true"><path fill="currentColor" d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-4.4 0-8 2.2-8 5v1h16v-1c0-2.8-3.6-5-8-5z"/></svg>`,
  folder: `<svg viewBox="0 0 24 24" class="svgIcon" aria-hidden="true"><path fill="currentColor" d="M10 4l2 2h8a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2h6z"/></svg>`,
  bolt: `<svg viewBox="0 0 24 24" class="svgIcon" aria-hidden="true"><path fill="currentColor" d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" class="svgIcon" aria-hidden="true"><path fill="currentColor" d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5L4 8V6l8 5 8-5v2z"/></svg>`,
  close: `<svg viewBox="0 0 24 24" class="svgIcon svgIconSmall" aria-hidden="true"><path fill="currentColor" d="M18.3 5.7L12 12l6.3 6.3-1.4 1.4L10.6 13.4 4.3 19.7 2.9 18.3 9.2 12 2.9 5.7 4.3 4.3l6.3 6.3 6.3-6.3 1.4 1.4z"/></svg>`
};

function iconFor(file) {
  return svg[file.iconKey] ?? svg.readme;
}

/* =======================
   Storage
======================= */
function saveState() {
  localStorage.setItem(storageKey, JSON.stringify({
    openTabs: state.openTabs,
    activeId: state.activeId,
    folderOpen: state.folderOpen
  }));
}

function loadState() {
  const raw = localStorage.getItem(storageKey);
  if (!raw) return;
  try {
    const saved = JSON.parse(raw);
    if (Array.isArray(saved.openTabs)) state.openTabs = saved.openTabs.filter(id => getFileById(id));
    if (typeof saved.activeId === "string" && getFileById(saved.activeId)) state.activeId = saved.activeId;
    if (typeof saved.folderOpen === "boolean") state.folderOpen = saved.folderOpen;
  } catch {
    // ignore
  }
}

/* =======================
   Utils
======================= */
function escapeHtml(str) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isHttpUrl(url) {
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

function linkify(safeHtml) {
  // safeHtml ya viene escapado
  // Detecta: https://... y mailto:...
  const urlRegex = /\bhttps?:\/\/[^\s<]+[^\s<\.)]/g;
  const mailtoRegex = /\bmailto:[^\s<]+/g;

  let out = safeHtml.replace(urlRegex, (m) => {
    const href = m;
    return `<a class="codeLink" href="${href}" target="_blank" rel="noopener noreferrer">${m}</a>`;
  });

  out = out.replace(mailtoRegex, (m) => {
    return `<a class="codeLink" href="${m}">${m}</a>`;
  });

  return out;
}

/* highlight básico (no rompe HTML) */
function highlightEscaped(safeHtml, language) {
  if (language === "javascript") {
    return safeHtml
      // comentarios
      .replace(/(^|\s)(\/\/.*)$/gm, (m) => m.replace(/(\/\/.*)$/g, `<span>$1</span>`))
      // keywords
      .replace(/\b(const|let|var|export|import|from|return|function|class|new|if|else|for|while|try|catch|throw)\b/g,
        `<span class="tokKeyword">$1</span>`)
      // tipos-ish
      .replace(/\b(String|Number|Boolean|Object|Array|Promise)\b/g, `<span class="tokType">$1</span>`)
      // números
      .replace(/\b(\d+(\.\d+)?)\b/g, `<span class="tokNumber">$1</span>`);
  }

  if (language === "markdown") {
    return safeHtml
      .replace(/^# (.*)$/gm, `<span class="tokAccent"># $1</span>`)
      .replace(/^## (.*)$/gm, `<span class="tokAccent">## $1</span>`)
      .replace(/^---$/gm, `<span class="tokComment">---</span>`);
  }

  return safeHtml;
}

function getFileById(id) {
  return files.find(f => f.id === id) ?? null;
}

/* =======================
   Render
======================= */
function renderExplorer() {
  elFileList.innerHTML = "";

  if (!state.folderOpen) {
    elFileList.style.display = "none";
    return;
  }

  elFileList.style.display = "flex";

  for (const f of files) {
    const row = document.createElement("div");
    row.className = "fileRow";
    row.setAttribute("role", "listitem");
    row.dataset.fileId = f.id;

    if (f.id === state.activeId) row.classList.add("isActive");

    row.innerHTML = `
      <span class="fileIcon">${iconFor(f)}</span>
      <span class="fileName">${escapeHtml(f.label)}</span>
    `;

    row.addEventListener("click", () => openFile(f.id));
    elFileList.appendChild(row);
  }
}

function renderTabs() {
  elTabsBar.innerHTML = "";

  for (const id of state.openTabs) {
    const f = getFileById(id);
    if (!f) continue;

    const tab = document.createElement("div");
    tab.className = "tab";
    tab.dataset.tabId = id;
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-selected", String(id === state.activeId));

    if (id === state.activeId) tab.classList.add("isActive");

    tab.innerHTML = `
      <span class="tabIcon">${iconFor(f)}</span>
      <span class="tabLabel">${escapeHtml(f.label)}</span>
      <button class="tabClose" title="Cerrar" aria-label="Cerrar tab">${svg.close}</button>
    `;

    tab.addEventListener("click", (e) => {
      const isClose = e.target?.closest?.(".tabClose");
      if (isClose) return;
      openFile(id);
    });

    tab.querySelector(".tabClose").addEventListener("click", (e) => {
      e.stopPropagation();
      closeTab(id);
    });

    elTabsBar.appendChild(tab);
  }
}

function renderEditor() {
  const f = getFileById(state.activeId);

  if (!f) {
    elEditorEmpty.style.display = "grid";
    elEditorPane.classList.add("isHidden");
    elStatusFile.textContent = "Sin archivo";
    elStatusLang.textContent = "—";
    elStatusPos.textContent = "Ln 1, Col 1";
    return;
  }

  elEditorEmpty.style.display = "none";
  elEditorPane.classList.remove("isHidden");

  elBreadcrumb.textContent = `PORTFOLIO > ${f.label}`;
  elStatusFile.textContent = f.label;

  const langLabel =
    f.language === "javascript" ? "JavaScript" :
      f.language === "markdown" ? "Markdown" :
        (f.language ?? "Text");

  elStatusLang.textContent = langLabel;

  // orden importante:
  // 1) escapar 2) highlight (sobre texto escapado) 3) linkify (sobre html ya con spans)
  const escaped = escapeHtml(f.content);
  const highlighted = highlightEscaped(escaped, f.language);
  const withLinks = linkify(highlighted);

  elCodeView.innerHTML = withLinks;

  const lines = f.content.split("\n").length;
  elLineNums.textContent = Array.from({ length: lines }, (_, i) => String(i + 1)).join("\n");

  elStatusPos.textContent = "Ln 1, Col 1";
}

function rerender() {
  renderExplorer();
  renderTabs();
  renderEditor();
}

/* =======================
   Actions
======================= */
function openFile(id) {
  if (!state.openTabs.includes(id)) state.openTabs.push(id);
  state.activeId = id;
  saveState();
  rerender();
}

function closeTab(id) {
  const idx = state.openTabs.indexOf(id);
  if (idx === -1) return;

  state.openTabs.splice(idx, 1);

  if (state.activeId === id) {
    const next = state.openTabs[idx] ?? state.openTabs[idx - 1] ?? null;
    state.activeId = next;
  }

  saveState();
  rerender();
}

function wireFolderToggle() {
  const folderBtn = document.querySelector('[data-action="toggleFolder"]');
  folderBtn.addEventListener("click", () => {
    state.folderOpen = !state.folderOpen;
    folderBtn.querySelector(".chev").textContent = state.folderOpen ? "▾" : "▸";
    saveState();
    rerender();
  });

  folderBtn.querySelector(".chev").textContent = state.folderOpen ? "▾" : "▸";
}


function toggleSideBarMobile() {
  const shell = document.querySelector(".appShell");
  const isMobile = window.matchMedia("(max-width: 760px)").matches;

  if (isMobile) {
    shell.classList.toggle("isSideBarOpen");
    return;
  }

  // En desktop/tablet: colapsa/expande
  shell.classList.toggle("isSideBarCollapsed");
}

function wireActivityBarActions(){
  const shell = document.querySelector(".appShell");
  const explorerBtn = document.querySelector('[data-action="explorer"]');

  explorerBtn?.addEventListener("click", () => {
    toggleSideBarMobile();
  });

  // Cerrar drawer tocando el overlay en móvil
  shell.addEventListener("click", (e) => {
    const isMobile = window.matchMedia("(max-width: 760px)").matches;
    if(!isMobile) return;

    // Si está abierto y tocás overlay (appShell::after no captura clicks),
    // detectamos click fuera del sidebar:
    const sideBar = document.querySelector(".sideBar");
    const clickedInsideSideBar = sideBar?.contains(e.target);
    const clickedActivityBar = document.querySelector(".activityBar")?.contains(e.target);

    if(shell.classList.contains("isSideBarOpen") && !clickedInsideSideBar && !clickedActivityBar){
      shell.classList.remove("isSideBarOpen");
    }
  });

  // Si cambia el tamaño de pantalla, limpia estados inválidos
  window.addEventListener("resize", () => {
    const isMobile = window.matchMedia("(max-width: 760px)").matches;
    if(!isMobile){
      shell.classList.remove("isSideBarOpen");
    }
  });
}


/* =======================
   Init
======================= */
function init() {
  loadState();
  mountActivityBarIcons();
  wireFolderToggle();
  wireActivityBarActions();
  rerender();

  if (!state.activeId) {
    openFile("README.md");
  }
}

const svgN = {
  explorer: `<svg viewBox="0 0 24 24" class="svgIcon" aria-hidden="true"><path fill="currentColor" d="M4 4h16v16H4V4zm2 2v12h12V6H6z"/></svg>`,
  search: `<svg viewBox="0 0 24 24" class="svgIcon" aria-hidden="true"><path fill="currentColor" d="M10 2a8 8 0 105.3 14.1l4.3 4.3 1.4-1.4-4.3-4.3A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z"/></svg>`,
  git: `<svg viewBox="0 0 24 24" class="svgIcon" aria-hidden="true"><path fill="currentColor" d="M12 2l10 10-3 3-2-2v-3l-3-3H11L9 4l3-2zm-1 7h3l3 3v3l-6-6zM2 12l7-7 2 2-5 5 5 5-2 2-7-7z"/></svg>`,
  run: `<svg viewBox="0 0 24 24" class="svgIcon" aria-hidden="true"><path fill="currentColor" d="M8 5v14l11-7L8 5z"/></svg>`,
  gear: `<svg viewBox="0 0 24 24" class="svgIcon" aria-hidden="true"><path fill="currentColor" d="M19.4 13a7.7 7.7 0 000-2l2-1.6-2-3.4-2.3.7a8 8 0 00-1.7-1l-.3-2.4H11l-.3 2.4a8 8 0 00-1.7 1L6.7 6 4.7 9.4 6.7 11a7.7 7.7 0 000 2l-2 1.6 2 3.4 2.3-.7a8 8 0 001.7 1l.3 2.4h4l.3-2.4a8 8 0 001.7-1l2.3.7 2-3.4-2-1.6zM12 15.5A3.5 3.5 0 1112 8a3.5 3.5 0 010 7.5z"/></svg>`
};

function mountActivityBarIcons() {
  const map = [
    ["abExplorer", svgN.explorer],
    ["abSearch", svgN.search],
    ["abGit", svgN.git],
    ["abRun", svgN.run],
    ["abGear", svgN.gear]
  ];

  for (const [id, markup] of map) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = markup;
  }
}



init();
