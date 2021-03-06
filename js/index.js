import { showNotes, showTable, showArchived } from "./show.js";
import {
  deleteNote,
  openModal,
  saveNote,
  closeModal,
  archiveNote,
  unArchiveNote,
} from "./nots.js";

export const data = [
  {
    text: "Shopping list",
    category: "Task",
    time: "2021-4-20 | 10:17",
    dates: [],
    archived: "true",
  },
  {
    text: "The theory of evolution",
    category: "Random Thought",
    time: "2021-4-27 | 10:15",
    dates: ["3/05/2021, 5/05/2021"],
    archived: "false",
  },
  {
    text: "New Feature",
    category: "Idea",
    time: "2021-5-5 | 10:30",
    dates: [],
    archived: "true",
  },
  {
    text: "William Gaddis",
    category: "Quote",
    time: "2022-5-7 | 11:00",
    dates: [],
    archived: "true",
  },
  {
    text: "Books",
    category: "Task",
    time: "2021-5-15 | 10:35",
    dates: [],
    archived: "true",
  },
  {
    text: "War",
    category: "Evil",
    time: "2022-5-1 | 13:12",
    dates: [],
    archived: "false",
  },
  {
    text: "God",
    category: "Strong",
    time: "01-01-01 | 00:00",
    dates: [],
    archived: "true",
  },
];

showNotes();
showTable();

const addButton = document.getElementById("addBtn");
addButton.addEventListener("click", function () {
  let notesObj;
  const addNotes = document.getElementById("addNote");
  const category = document.getElementById("category");
  const addDate = document.getElementById("date");
  const addTime = document.getElementById("time");
  let noteString = data;
  if (noteString === null) {
    notesObj = [];
  } else {
    notesObj = noteString;
  }

  let now = new Date();
  let dataTime = `${now.getFullYear()}- ${
    now.getMonth() + 1
  }- ${now.getDate()} | ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

  let meeting;
  if (addDate.value.length === 0 && addTime.value.length === 0) {
    meeting = null;
  } else if (addDate.value.length === 0 || addTime.value.length === 0) {
    alert("Please enter date and time");
    return;
  } else {
    // meeting = addDate.value + " " + addTime.value;
    meeting = `${addDate.value} | ${addTime.value}`;
  }

  if (category.value === "null") {
    alert("Please enter category");
    return;
  }

  // push into data
  let dataObj = {
    text: addNotes.value,
    category: category.value,
    time: dataTime,
    dates: meeting,
  };
  try {
    data.push(dataObj);
  } catch (error) {
    alert(error);
  }

  addNotes.value = "";
  category.value = "null";

  showNotes();
  showTable();
});

const toggleArchive = document.querySelector("#checkbox");
toggleArchive.addEventListener("click", function (e) {
  e.target.classList.toggle("show-archived");
  const mustShowArchived = [...e.target.classList].includes("show-archived");
  mustShowArchived ? showArchived() : showNotes();
});

window.deleteNote = deleteNote;
window.openModal = openModal;
window.closeModal = closeModal;
window.saveNote = saveNote;
window.archiveNote = archiveNote;
window.unArchiveNote = unArchiveNote;
