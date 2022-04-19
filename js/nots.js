import { showNotes, showTable, showArchived } from "./show.js";
import { data } from "index.js";

export function deleteNote(index) {
  data.splice(index, 1);
  showNotes();
  showTable();
}

export function openModal(id) {
  const modal = document.getElementById("modal");
  const text = document.getElementById("editNote");
  const category = document.getElementById("select-modal");
  const date = document.getElementById("editDate");
  const time = document.getElementById("editTime");

  const saveBtn = `<button id='${id}' class="btn btn-main" onclick="saveNote(this.id) type="button" id="saveChangeBtn">Save</button>`;
  document.querySelector(".modal-footer").innerHTML = saveBtn;
  modal.style.display = "block";
  text.value = data[id].text;
  category.value = data[id].category;
  if (data[id].dates) {
    date.value = data[id].dates;
  }
  time.value = data[id].time;
}

export function saveNote(id) {
  const text = document.getElementById("editNote");
  const category = document.getElementById("select-modal");
  const date = document.getElementById("editDate");
  const time = document.getElementById("editTime");
  if (category.value === "") {
    alert("Please select a category");
    return;
  }
  data[id].text = text.value;
  data[id].category = category.value;

  let meeting;
  if (date.value === "" && time.value === "") {
    meeting = "";
  } else if (date.value === "" || time.value === "") {
    alert("Please enter date and time");
    return;
  } else {
    meeting = date.value + " " + time.value;
  }
  data[id].dates = meeting;

  showNotes();
  showTable();
}

export function closeModal() {
  const date = document.getElementById("editDate");
  const time = document.getElementById("editTime");
  const modal = document.getElementById("modal");
  const text = document.getElementById("editNote");

  document.querySelector(
    ".modal-footer"
  ).innerHTML = `<button class="btn btn-secondary" data-dismiss="modal" onclick="closeModal()" type="button">Close</button>`;

  modal.style.display = "none";
  text.value = "";
  date.value = "";
  time.value = "";
}

export function archiveNote(id) {
  try {
    if (data[id].archived === true) {
    }
  } catch (error) {
    alert(error);
  }
  showNotes();
  showTable();
}

export function unArchiveNote(id) {
  try {
    if (data[id].archived === false) {
    }
  } catch (error) {
    alert(error);
  }
  showTable();
  showArchived();
}
