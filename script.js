"use strict";

const MODULES = ["Variables and data types", "Operators", "Conditional statements", "Loops",
  "Functions", "Debugging", "DOM manipulation", "Mini project"];
const STORE_KEY = "classTrackData";
const $ = (id) => document.getElementById(id);

let state = load();

function load() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY)) || { students: [] }; }
  catch { return { students: [] }; }
}
function save() { localStorage.setItem(STORE_KEY, JSON.stringify(state)); }
function today() { return new Date().toISOString().slice(0, 10); }

function attendanceRate(student) {
  const marks = Object.values(student.attendance);
  if (!marks.length) return null;
  const score = marks.reduce((n, m) => n + (m === "P" ? 1 : m === "L" ? 0.5 : 0), 0);
  return Math.round((score / marks.length) * 100);
}
function progress(student) { return Math.round((student.done.length / MODULES.length) * 100); }

function renderAttendance() {
  const date = $("sessionDate").value;
  const list = $("attendanceList");
  list.innerHTML = "";
  if (!state.students.length) {
    list.innerHTML = '<li class="muted">Add a student below to start taking attendance.</li>';
    $("attSummary").textContent = ""; return;
  }
  state.students.forEach((s) => {
    const li = document.createElement("li"); li.className = "att-row";
    const name = document.createElement("strong"); name.textContent = s.name;
    const seg = document.createElement("div"); seg.className = "seg"; seg.setAttribute("role", "group");
    seg.setAttribute("aria-label", "Attendance for " + s.name);
    [["P", "Present", "p"], ["L", "Late", "l"], ["A", "Absent", "a"]].forEach(([code, label, cls]) => {
      const b = document.createElement("button");
      b.type = "button"; b.className = cls; b.textContent = label;
      b.setAttribute("aria-pressed", String(s.attendance[date] === code));
      b.addEventListener("click", () => { s.attendance[date] = code; save(); render(); });
      seg.append(b);
    });
    li.append(name, seg); list.append(li);
  });
  const marked = state.students.filter((s) => s.attendance[date]).length;
  const present = state.students.filter((s) => s.attendance[date] === "P").length;
  $("attSummary").textContent = `${marked} of ${state.students.length} marked. ${present} present on ${date}.`;
}

function renderStudents() {
  const box = $("students");
  box.innerHTML = "";
  state.students.forEach((s) => {
    const card = document.createElement("article"); card.className = "student";
    const head = document.createElement("header");
    const h = document.createElement("h3"); h.textContent = s.name;
    const rate = attendanceRate(s);
    const meta = document.createElement("span"); meta.className = "muted";
    meta.textContent = rate === null ? "No attendance yet" : "Attendance " + rate + "%";
    head.append(h, meta);

    const bar = document.createElement("div"); bar.className = "bar";
    bar.setAttribute("role", "progressbar"); bar.setAttribute("aria-valuenow", progress(s));
    bar.setAttribute("aria-valuemin", 0); bar.setAttribute("aria-valuemax", 100);
    const fill = document.createElement("span"); fill.style.width = progress(s) + "%"; bar.append(fill);
    const cap = document.createElement("div"); cap.className = "muted";
    cap.textContent = `${s.done.length} of ${MODULES.length} modules complete (${progress(s)}%)`;

    const details = document.createElement("details");
    if (s.open) details.open = true;
    details.addEventListener("toggle", () => { s.open = details.open; });
    const sum = document.createElement("summary"); sum.textContent = "Modules";
    const ul = document.createElement("ul"); ul.className = "mods";
    MODULES.forEach((m) => {
      const li = document.createElement("li"); const label = document.createElement("label");
      const cb = document.createElement("input"); cb.type = "checkbox"; cb.checked = s.done.includes(m);
      cb.addEventListener("change", () => {
        s.done = cb.checked ? [...s.done, m] : s.done.filter((x) => x !== m);
        s.open = true; save(); renderStudents();
      });
      label.append(cb, document.createTextNode(m)); li.append(label); ul.append(li);
    });
    details.append(sum, ul);

    const del = document.createElement("button"); del.type = "button"; del.className = "link";
    del.textContent = "Remove student";
    del.addEventListener("click", () => {
      if (confirm("Remove " + s.name + " and all their records?")) {
        state.students = state.students.filter((x) => x !== s); save(); render();
      }
    });
    card.append(head, bar, cap, details, del); box.append(card);
  });
  if (!state.students.length) box.innerHTML = '<p class="muted">No students yet.</p>';
}

function render() { renderAttendance(); renderStudents(); }

function addStudent(name) {
  if (state.students.some((s) => s.name.toLowerCase() === name.toLowerCase())) { alert("That student is already on the list."); return; }
  state.students.push({ name, attendance: {}, done: [], open: false });
  save(); render();
}

function exportCsv() {
  const esc = (v) => '"' + String(v).replace(/"/g, '""') + '"';
  const rows = [["Student", "Sessions marked", "Attendance %", "Modules complete", "Progress %"].map(esc).join(",")];
  state.students.forEach((s) => rows.push([s.name, Object.keys(s.attendance).length,
    attendanceRate(s) ?? "", `${s.done.length}/${MODULES.length}`, progress(s)].map(esc).join(",")));
  const url = URL.createObjectURL(new Blob([rows.join("\n")], { type: "text/csv" }));
  const a = document.createElement("a"); a.href = url; a.download = "class-track.csv"; a.click();
  URL.revokeObjectURL(url);
}

$("addForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = $("newName").value.trim();
  if (name) { addStudent(name); $("newName").value = ""; }
});
$("sessionDate").addEventListener("change", renderAttendance);
$("exportBtn").addEventListener("click", exportCsv);
$("sampleBtn").addEventListener("click", () => {
  ["Sample Student A", "Sample Student B", "Sample Student C"].forEach((n) => {
    if (!state.students.some((s) => s.name === n)) state.students.push({ name: n, attendance: {}, done: [], open: false });
  });
  save(); render();
});

$("sessionDate").value = today();
render();