// Column order as decided: R, T, S
const ORDER = ["R", "T", "S"];

const columnsEl = document.getElementById("columns");
const panelsEl = document.getElementById("panels");
const openPanels = new Map(); // key -> panel element

function itemKey(catKey, nucleusId, itemId){
  return `${catKey}__${nucleusId}__${itemId}`;
}

function buildColumns(){
  ORDER.forEach(catKey => {
    const cat = ARCHIVE[catKey];
    if(!cat) return;

    const col = document.createElement("div");
    col.className = "column";

    const letter = document.createElement("div");
    letter.className = "letter";
    letter.textContent = catKey;
    col.appendChild(letter);

    const catLabel = document.createElement("div");
    catLabel.className = "cat-label";
    catLabel.textContent = cat.label;
    col.appendChild(catLabel);

    cat.nuclei.forEach(nucleus => {
      const nEl = document.createElement("div");
      nEl.className = "nucleus";

      const head = document.createElement("div");
      head.className = "nucleus-head";
      const idSpan = document.createElement("span");
      idSpan.className = "n-id";
      idSpan.textContent = nucleus.id;
      const dateSpan = document.createElement("span");
      dateSpan.className = "n-date";
      dateSpan.textContent = nucleus.dateRange || "";
      head.appendChild(idSpan);
      head.appendChild(dateSpan);
      nEl.appendChild(head);

      if(nucleus.label){
        const sub = document.createElement("div");
        sub.className = "nucleus-sub";
        sub.textContent = nucleus.label;
        nEl.appendChild(sub);
      }

      nucleus.items.forEach(item => {
        const row = document.createElement("div");
        row.className = "item-row";
        row.dataset.key = itemKey(catKey, nucleus.id, item.id);

        const idEl = document.createElement("span");
        idEl.className = "i-id";
        idEl.textContent = item.id;

        const capEl = document.createElement("span");
        capEl.className = "i-caption";
        capEl.textContent = item.caption;

        row.appendChild(idEl);
        row.appendChild(capEl);

        row.addEventListener("click", () => togglePanel(catKey, nucleus, item, row));

        nEl.appendChild(row);
      });

      col.appendChild(nEl);
    });

    columnsEl.appendChild(col);
  });
}

function togglePanel(catKey, nucleus, item, rowEl){
  const key = itemKey(catKey, nucleus.id, item.id);

  if(openPanels.has(key)){
    // already open -> close it
    openPanels.get(key).remove();
    openPanels.delete(key);
    rowEl.classList.remove("active");
    return;
  }

  const panel = document.createElement("div");
  panel.className = "panel";

  const close = document.createElement("div");
  close.className = "p-close";
  close.textContent = "close";
  close.addEventListener("click", () => {
    panel.remove();
    openPanels.delete(key);
    rowEl.classList.remove("active");
  });
  panel.appendChild(close);

  const idEl = document.createElement("div");
  idEl.className = "p-id";
  idEl.textContent = `${catKey} / ${nucleus.id} / ${item.id}`;
  panel.appendChild(idEl);

  const dateEl = document.createElement("div");
  dateEl.className = "p-date";
  dateEl.textContent = item.date || "";
  panel.appendChild(dateEl);

  if(item.img){
    const img = document.createElement("img");
    img.src = `images/${item.img}`;
    img.alt = item.caption;
    img.onerror = () => { img.style.display = "none"; };
    panel.appendChild(img);
  }

  const cap = document.createElement("div");
  cap.className = "p-caption";
  cap.textContent = item.caption;
  panel.appendChild(cap);

  const noteLabel = document.createElement("div");
  noteLabel.className = "p-note-label";
  noteLabel.textContent = "note";
  panel.appendChild(noteLabel);

  const note = document.createElement("div");
  const hasNote = item.note && item.note.trim().length > 0;
  note.className = hasNote ? "p-note" : "p-note empty";
  note.textContent = hasNote ? item.note : "— no note yet —";
  panel.appendChild(note);

  if(item.video){
    const video = document.createElement("video");
    video.src = item.video;
    video.controls = true;
    panel.appendChild(video);
  }

  panelsEl.appendChild(panel);
  openPanels.set(key, panel);
  rowEl.classList.add("active");

  panel.scrollIntoView({ behavior:"smooth", inline:"end", block:"nearest" });
}

buildColumns();
