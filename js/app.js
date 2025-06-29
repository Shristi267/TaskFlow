// const AVATAR = "https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=";
// const API = "https://dummyjson.com/todos";
// const KEY = "taskflow_tasks";

// const user = document.getElementById("username");
// const avatar = document.getElementById("avatar");
// const salutation = document.getElementById("salutation");
// const taskInput = document.getElementById("taskInput");
// const taskForm = document.getElementById("taskForm");
// const searchInput = document.getElementById("searchInput");
// const prioritySelect = document.getElementById("prioritySelect");
// const importFile = document.getElementById("importFile");
// const toast = document.getElementById("toast");

// const lists = {
//   todo: document.getElementById("todo-list"),
//   completed: document.getElementById("completed-list"),
//   archived: document.getElementById("archived-list"),
// };

// const counts = {
//   todo: document.getElementById("todo-count"),
//   completed: document.getElementById("completed-count"),
//   archived: document.getElementById("archived-count"),
// };

// let tasks = [];

// document.addEventListener("DOMContentLoaded", async () => {
//   const u = JSON.parse(localStorage.getItem("taskflow_user"));
//   if (!u) window.location = "index.html";

//   user.textContent = u.name;
//   salutation.textContent = `Welcome back, ${u.name}! 👋`;
//   avatar.src = AVATAR + encodeURIComponent(u.name);

//   const stored = JSON.parse(localStorage.getItem(KEY));
//   if (Array.isArray(stored) && stored.length) {
//     tasks = stored;
//   } else {
//     const res = await fetch(API);
//     const { todos } = await res.json();
//     tasks = todos.slice(0, 5).map((t, i) => ({
//       id: Date.now() + i,
//       text: t.todo,
//       stage: "todo",
//       modified: new Date().toISOString(),
//       priority: "medium",
//     }));
//     save();
//   }
//   render();
// });

// function save() {
//   localStorage.setItem(KEY, JSON.stringify(tasks));
// }

// function showToast(message) {
//   toast.textContent = message;
//   toast.classList.remove("hidden");
//   toast.classList.add("opacity-100");
//   setTimeout(() => {
//     toast.classList.add("hidden");
//   }, 2000);
// }

// function render(filter = "") {
//   Object.values(lists).forEach(l => l.innerHTML = "");
//   const cnt = { todo: 0, completed: 0, archived: 0 };

//   tasks
//     .filter(t => t.text.toLowerCase().includes(filter.toLowerCase()))
//     .forEach(t => {
//       const li = document.createElement("li");
//       li.draggable = true;
//       li.dataset.id = t.id;
//       li.className = `p-3 flex justify-between items-start rounded shadow border-l-4 bg-white hover:shadow-md transition ${
//         t.priority === "high" ? "border-red-500" :
//         t.priority === "low" ? "border-green-500" :
//         "border-yellow-500"
//       }`;
//       li.innerHTML = `
//         <div>
//           <p class="font-medium">${t.text}</p>
//           <small class="text-xs text-gray-500">${new Date(t.modified).toLocaleString("en-US", { hour12: true })}</small>
//         </div>
//         <div class="space-x-1">${buttons(t.stage, t.id)}</div>`;
//       li.addEventListener("dragstart", e => {
//         e.dataTransfer.setData("text/plain", t.id);
//       });
//       lists[t.stage].appendChild(li);
//       cnt[t.stage]++;
//     });

//   Object.keys(counts).forEach(k => counts[k].textContent = cnt[k]);
//   document.querySelectorAll("[data-action]").forEach(b => b.onclick = handle);
// }

// function buttons(stage, id) {
//   const mk = (label, a, c) =>
//     `<button data-id="${id}" data-action="${a}" class="bg-${c}-500 hover:bg-${c}-600 text-white px-2 py-1 rounded text-sm">${label}</button>`;
//   if (stage === "todo") return mk("✔️ Mark as Completed", "complete", "green") + mk("📦 Archive", "archive", "gray") + mk("🗑️ Delete", "delete", "red");
//   if (stage === "completed") return mk("🔁 Move to Todo", "uncomplete", "blue") + mk("📦 Archive", "archive", "gray") + mk("🗑️ Delete", "delete", "red");
//   if (stage === "archived") return mk("🔁 To Todo", "restore-todo", "blue") + mk("✔️ To Completed", "restore-completed", "green") + mk("🗑️ Delete", "delete", "red");
//   return "";
// }

// function handle(e) {
//   const id = +e.target.dataset.id;
//   const action = e.target.dataset.action;
//   const t = tasks.find(x => x.id === id);
//   if (!t) return;

//   let msg = "";

//   switch (action) {
//     case "complete":
//       t.stage = "completed";
//       msg = "✅ Task marked as completed.";
//       break;
//     case "uncomplete":
//       t.stage = "todo";
//       msg = "🔁 Task moved back to Todo.";
//       break;
//     case "archive":
//       t.stage = "archived";
//       msg = "📦 Task archived.";
//       break;
//     case "restore-todo":
//       t.stage = "todo";
//       msg = "🔁 Task restored to Todo.";
//       break;
//     case "restore-completed":
//       t.stage = "completed";
//       msg = "✔️ Task restored to Completed.";
//       break;
//     case "delete":
//       tasks = tasks.filter(x => x.id !== id);
//       save();
//       render(searchInput.value);
//       showToast("🗑️ Task deleted.");
//       return;
//   }

//   t.modified = new Date().toISOString();
//   save();
//   render(searchInput.value);
//   showToast(msg);
// }

// taskForm.addEventListener("submit", e => {
//   e.preventDefault();
//   const text = taskInput.value.trim();
//   const pri = prioritySelect.value;
//   if (!text) return;
//   tasks.push({
//     id: Date.now(),
//     text,
//     stage: "todo",
//     modified: new Date().toISOString(),
//     priority: pri,
//   });
//   taskInput.value = "";
//   save();
//   render(searchInput.value);
//   showToast("✅ Task added!");
// });

// searchInput.oninput = e => render(e.target.value);

// importFile.onchange = e => {
//   const f = e.target.files[0];
//   if (!f) return;
//   const r = new FileReader();
//   r.onload = _ => {
//     try {
//       const arr = JSON.parse(r.result);
//       if (!Array.isArray(arr)) throw new Error();
//       tasks = arr.map(t => ({
//         id: t.id || Date.now() + Math.random(),
//         text: t.text,
//         stage: t.stage || "todo",
//         modified: t.modified || new Date().toISOString(),
//         priority: t.priority || "medium"
//       }));
//       save();
//       render(searchInput.value);
//       showToast("✅ Imported successfully!");
//     } catch {
//       alert("Invalid JSON file.");
//     }
//   };
//   r.readAsText(f);
// };

// function exportTasks() {
//   const blob = new Blob([JSON.stringify(tasks, null, 2)], { type: "application/json" });
//   const a = document.createElement("a");
//   a.href = URL.createObjectURL(blob);
//   a.download = "taskflow-tasks.json";
//   a.click();
// }

// function logout() {
//   localStorage.removeItem("taskflow_user");
//   localStorage.removeItem(KEY);
//   window.location = "index.html";
// }

// function onDragOver(e) { e.preventDefault(); }

// function onDrop(e, stage) {
//   e.preventDefault();
//   const id = +e.dataTransfer.getData("text/plain");
//   const t = tasks.find(x => x.id === id);
//   if (!t) return;
//   t.stage = stage;
//   t.modified = new Date().toISOString();
//   save();
//   render(searchInput.value);
//   showToast(`✅ Task moved to ${stage}.`);
// }

// document.addEventListener("keydown", e => {
//   if (e.ctrlKey && e.key === "Enter") {
//     taskForm.requestSubmit();
//   }
// });

const AVATAR = "https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=";
const API = "https://dummyjson.com/todos";
const KEY = "taskflow_tasks";

const user = document.getElementById("username");
const avatar = document.getElementById("avatar");
const salutation = document.getElementById("salutation");
const taskInput = document.getElementById("taskInput");
const taskForm = document.getElementById("taskForm");
const searchInput = document.getElementById("searchInput");
const prioritySelect = document.getElementById("prioritySelect");
const importFile = document.getElementById("importFile");
const toast = document.getElementById("toast");

const lists = {
  todo: document.getElementById("todo-list"),
  completed: document.getElementById("completed-list"),
  archived: document.getElementById("archived-list"),
};

const counts = {
  todo: document.getElementById("todo-count"),
  completed: document.getElementById("completed-count"),
  archived: document.getElementById("archived-count"),
};

let tasks = [];

document.addEventListener("DOMContentLoaded", async () => {
  const u = JSON.parse(localStorage.getItem("taskflow_user"));
  if (!u) window.location = "index.html";

  user.textContent = u.name;
  salutation.textContent = `Welcome back, ${u.name}! 👋`;
  avatar.src = AVATAR + encodeURIComponent(u.name);

  const stored = JSON.parse(localStorage.getItem(KEY));
  if (Array.isArray(stored) && stored.length) {
    tasks = stored;
  } else {
    const res = await fetch(API);
    const { todos } = await res.json();
    tasks = todos.slice(0, 5).map((t, i) => ({
      id: Date.now() + i,
      text: t.todo,
      stage: "todo",
      modified: new Date().toISOString(),
      priority: "medium",
    }));
    save();
  }
  render();
});

function save() {
  localStorage.setItem(KEY, JSON.stringify(tasks));
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.remove("hidden");
  toast.classList.add("opacity-100");
  setTimeout(() => {
    toast.classList.add("hidden");
  }, 2000);
}

function render(filter = "") {
  Object.values(lists).forEach(l => l.innerHTML = "");
  const cnt = { todo: 0, completed: 0, archived: 0 };

  tasks
    .filter(t => t.text.toLowerCase().includes(filter.toLowerCase()))
    .forEach(t => {
      const li = document.createElement("li");
      li.draggable = true;
      li.dataset.id = t.id;
      li.className = `p-3 flex justify-between items-start rounded shadow border-l-4 bg-white hover:shadow-md transition ${
        t.priority === "high" ? "border-red-500" :
        t.priority === "low" ? "border-green-500" :
        "border-yellow-500"
      }`;
      li.innerHTML = `
        <div>
          <p class="font-medium">${t.text}</p>
          <small class="text-xs text-gray-500">${new Date(t.modified).toLocaleString("en-US", { hour12: true })}</small>
        </div>
        <div class="flex flex-col items-end gap-1">${buttons(t.stage, t.id)}</div>`;
      li.addEventListener("dragstart", e => {
        e.dataTransfer.setData("text/plain", t.id);
      });
      lists[t.stage].appendChild(li);
      cnt[t.stage]++;
    });

  Object.keys(counts).forEach(k => counts[k].textContent = cnt[k]);
  document.querySelectorAll("[data-action]").forEach(b => b.onclick = handle);
}

function buttons(stage, id) {
  const mk = (label, a, c) =>
    `<button data-id="${id}" data-action="${a}" class="bg-${c}-500 hover:bg-${c}-600 text-white px-2 py-1 rounded text-xs w-[130px]">${label}</button>`;

  if (stage === "todo")
    return mk("✔️ Mark as Completed", "complete", "green") +
           mk("📦 Archive", "archive", "gray") +
           mk("🗑️ Delete", "delete", "red");

  if (stage === "completed")
    return mk("🔁 Move to Todo", "uncomplete", "blue") +
           mk("📦 Archive", "archive", "gray") +
           mk("🗑️ Delete", "delete", "red");

  if (stage === "archived")
    return mk("🔁 To Todo", "restore-todo", "blue") +
           mk("✔️ To Completed", "restore-completed", "green") +
           mk("🗑️ Delete", "delete", "red");

  return "";
}

function handle(e) {
  const id = +e.target.dataset.id;
  const action = e.target.dataset.action;
  const t = tasks.find(x => x.id === id);
  if (!t) return;

  let msg = "";

  switch (action) {
    case "complete":
      t.stage = "completed";
      msg = "✅ Task marked as completed.";
      break;
    case "uncomplete":
      t.stage = "todo";
      msg = "🔁 Task moved back to Todo.";
      break;
    case "archive":
      t.stage = "archived";
      msg = "📦 Task archived.";
      break;
    case "restore-todo":
      t.stage = "todo";
      msg = "🔁 Task restored to Todo.";
      break;
    case "restore-completed":
      t.stage = "completed";
      msg = "✔️ Task restored to Completed.";
      break;
    case "delete":
      tasks = tasks.filter(x => x.id !== id);
      save();
      render(searchInput.value);
      showToast("🗑️ Task deleted.");
      return;
  }

  t.modified = new Date().toISOString();
  save();
  render(searchInput.value);
  showToast(msg);
}

taskForm.addEventListener("submit", e => {
  e.preventDefault();
  const text = taskInput.value.trim();
  const pri = prioritySelect.value;
  if (!text) return;
  tasks.push({
    id: Date.now(),
    text,
    stage: "todo",
    modified: new Date().toISOString(),
    priority: pri,
  });
  taskInput.value = "";
  save();
  render(searchInput.value);
  showToast("✅ Task added!");
});

searchInput.oninput = e => render(e.target.value);

importFile.onchange = e => {
  const f = e.target.files[0];
  if (!f) return;
  const r = new FileReader();
  r.onload = _ => {
    try {
      const arr = JSON.parse(r.result);
      if (!Array.isArray(arr)) throw new Error();
      tasks = arr.map(t => ({
        id: t.id || Date.now() + Math.random(),
        text: t.text,
        stage: t.stage || "todo",
        modified: t.modified || new Date().toISOString(),
        priority: t.priority || "medium"
      }));
      save();
      render(searchInput.value);
      showToast("✅ Imported successfully!");
    } catch {
      alert("Invalid JSON file.");
    }
  };
  r.readAsText(f);
};

function exportTasks() {
  const blob = new Blob([JSON.stringify(tasks, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "taskflow-tasks.json";
  a.click();
}

function logout() {
  localStorage.removeItem("taskflow_user");
  localStorage.removeItem(KEY);
  window.location = "index.html";
}

function onDragOver(e) { e.preventDefault(); }

function onDrop(e, stage) {
  e.preventDefault();
  const id = +e.dataTransfer.getData("text/plain");
  const t = tasks.find(x => x.id === id);
  if (!t) return;
  t.stage = stage;
  t.modified = new Date().toISOString();
  save();
  render(searchInput.value);
  showToast(`✅ Task moved to ${stage}.`);
}

document.addEventListener("keydown", e => {
  if (e.ctrlKey && e.key === "Enter") {
    taskForm.requestSubmit();
  }
});
