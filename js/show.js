import { data } from "./index.js";

export function showNotes() {
  let dataObj;
  let noteString = data;
  if (noteString === null) {
    dataObj = [];
  } else {
    dataObj = noteString;
  }

  let html = "";
  dataObj.forEach(function (note, index) {
    const dateType =
      /(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}/g;
    const isMatch = [...note.text.matchAll(dateType)];
    const foundDate = isMatch.map((match) => {
      return match[0];
    });
    let dates = "";
    if (foundDate.length > 0) {
      foundDate.forEach((date) => {
        dates += date + " | ";
      });
    }
    if (!note.archived) {
      html += `
            <div class="card d-4 a-2 bg-success text-white thatsMyNote" style='width: 19rem;'>
             <div class="card-body">
             <h6>${note.time}</h6>
             <p class="card-text">${note.text
               .replace(/</g, "&lt;")
               .replace(/</g, "&gt")}</p>
             ${
               note.dates
                 ? `<p class="card-subtitle b-2 text-warning">DATES : ${note.dates}</p>`
                 : ""
             }
             ${
               dates.length
                 ? `<p class="card-subtitle b-2 text-danger">DATES : ${dates}</p>`
                 : ""
             }
             <p class="card-text text-info">Category : ${note.category}</p>
                <button id='${index}' class="btn btn-info" onclick="openModal(this.id)">Edit</button>
                <button id='${index}' class="btn btn-danger" onclick="deleteNote(this.id)">Delete</button>
                <button id='${index}' class="btn btn-success" onclick="archiveNote(this.id)">Archive</button>
                </div>
            </div>
            `;
    } else {
      return;
    }
  });

  let noteEl = document.getElementById("notes");
  const allActive = data.filter((note) => !note.archived);
  if (allActive.length != 0) {
    noteEl.innerHTML = html;
  } else {
    noteEl.innerHTML = `<h1 class="text-center text-white">No Notes</h1>`;
  }
}

export function showArchived() {
  let dataObj;
  let noteString = data;
  if (noteString === null) {
    dataObj = [];
  } else {
    dataObj = noteString;
  }
  let html = "";
  dataObj.forEach(function (note, index) {
    if (note.archived) {
      html += `
            <div class="card d-4 a-2 bg-dark text-white thatsMyNote" style='width: 19rem;'>
             <div class="card-body">
             <h6>${note.time}</h6>
             <p class="card-text">${note.text
               .replace(/</g, "&lt;")
               .replace(/</g, "&gt")}</p>
             ${
               note.dates
                 ? `<p class="card-subtitle b-2 text-warning">DATE : ${note.dates}</p>`
                 : ""
             }
                          <p class="card-text text-info">Category : ${
                            note.category
                          }</p>
                <button id='${index}' class="btn btn-success" onclick="unArchiveNote(this.id)">Unarchive</button>
                </div>
            </div>
            `;
    } else {
      return;
    }
  });

  let noteEl = document.getElementById("notes");
  const allArchived = data.filter((note) => note.archived);
  if (allArchived.length != 0) {
    noteEl.innerHTML = html;
  } else {
    noteEl.innerHTML = `<h1 class="text-center text-white">No Notes</h1>`;
  }
}

export function showTable() {
  const storage = getTableData();

  let html = "";

  storage.forEach((category) => {
    const key = Object.keys(category);
    html += `<tr>
        <th scope="row">${key}</th>
        <td>${category[key].active}</td>
        <td>${category[key].archived}</td>
        </tr>`;
  });
  const tableBody = document.querySelector("#table-body");
  tableBody.innerHTML = html;
}

function getTableData() {
  const allCategory = data.map((note) => note.category);
  const uniqueCategory = [...new Set(allCategory)];
  const filteredCategory = uniqueCategory.map((uniqueCategory) => {
    const obj = {
      [uniqueCategory]: {
        active: data.filter(
          (note) => note.category === uniqueCategory && note.archived === false
        ).length,
        archived: data.filter(
          (note) => note.category === uniqueCategory && note.archived === true
        ).length,
      },
    };
    return obj;
  });
  return filteredCategory;
}
