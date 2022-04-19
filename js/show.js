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
    const dateType = /(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}/;
    const isConcur = note.dates.match(dateType);
    const foundDate = isConcur.map((match) => {
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
            <div class="card d-4 a-2 bg-dark text-white thatsMyNote" style='width: 19rem;'>
             <div class="card-body">
             <h6>${note.time}</h6>
             <p class="card-text">${note
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
  if (allActive.length === 0) {
    noteEl.innerHTML = `<h1 class="text-center text-white">No notes to show</h1>`;
  } else {
    noteEl.innerHTML = html;
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
    const dateType = /(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}/;
    const isConcur = note.dates.match(dateType);
    const foundDate = isConcur.map((match) => {
      return match[0];
    });

    let dates = "";
    if (foundDate.length > 0) {
      foundDate.forEach((date) => {
        dates += date + " | ";
      });
    }
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
  if (allArchived.length === 0) {
    noteEl.innerHTML = `<h1 class="text-center text-white">No notes to show</h1>`;
  } else {
    noteEl.innerHTML = html;
  }
}

function showTable() {
  const data = getTableData();
  let html = "";
  data.forEach((category) => {
    const keys = Object.keys(category);
    html += `<tr>
        <th scope="row">${keys}</th>
        <td>${category[keys].active}</td>
        <td>${category[keys].archived}</td>
        </tr>`;
  });
  const tableBody = document.querySelector("#table-body");
  tableBody.innerHTML = html;
}

function getTableData() {
  let dataObj;
  let noteString = data;
  if (noteString === null) {
    dataObj = [];
  } else {
    dataObj = noteString;
  }
  let tableData = {};
  dataObj.forEach((note) => {
    if (!tableData[note.category]) {
      tableData[note.category] = {
        active: 0,
        archived: 0,
      };
    }
    if (!note.archived) {
      tableData[note.category].active += 1;
    } else {
      tableData[note.category].archived += 1;
    }
  });
  return tableData;
}
