export const data = [
  {
    id: "1",
    icon: "./images/handbasket.png",
    name: "Shopping list",
    category: "Task",
    created: "April 20, 2021",
    сontent: "Tomatoes, bread",
    dates: [],
    isActive: "true",
  },
  {
    id: "2",
    icon: "./images/handbasket.png",
    name: "The theory of evolution",
    category: "Random Thought",
    created: "April 27, 2021",
    сontent: "The evolution...",
    dates: ["3/05/2021, 5/05/2021"],
    isActive: "true",
  },
  {
    id: "3",
    icon: "./images/handbasket.png",
    name: "New Feature",
    category: "Idea",
    created: "May 05, 2021",
    сontent: "Implement new...",
    dates: [],
    isActive: "true",
  },
  {
    id: "4",
    icon: "./images/handbasket.png",
    name: "William Gaddis",
    category: "Quote",
    created: "May 07, 2022",
    сontent: "Power doesn't co...",
    dates: [],
    isActive: "true",
  },
  {
    id: "5",
    icon: "./images/handbasket.png",
    name: "Books",
    category: "Task",
    created: "May 15, 2021",
    сontent: "The Lean Startup",
    dates: [],
    isActive: "true",
  },
  {
    id: "6",
    icon: "./images/handbasket.png",
    name: "War",
    category: "Evil",
    created: "March 24, 2022",
    сontent: "No one can destroy us!",
    dates: [],
    isActive: "false",
  },
  {
    id: "7",
    icon: "./images/handbasket.png",
    name: "God",
    category: "Strong",
    created: "01 01, 0001",
    сontent: "in all His will...",
    dates: [],
    isActive: "false",
  },
];

const addButton = document.getElementById("addBtn");
addButton.addEventListener("click", function () {
  let notesObj;
  const addNotes = document.getElementById("addNote");
  const addCategory = document.getElementById("category");
  const addDate = document.getElementById("date");
  const adddTime = document.getElementById("time");
  let noteString = data;
  if (noteString === null) {
    notesObj = [];
  } else {
    notesObj = noteString;
  }
  let now = new Date();
  let dataTime = `${now.getFullYear}- ${now.getMonth}+1 ${now.getDate} | ${now.getHours}:${now.getMinutes}:${now.getSeconds}`;

  let meeting;
  if (addDate.value === "" && adddTime.value === "") {
    meeting = "";
  } else if (addDate.value === "" && adddTime.value === "") {
    alert("Please enter date and time");
  } else {
    meeting = addDate.value + " " + adddTime.value;
  }

  if (category.value === "") {
    alert("Please enter category");
  }

  // push ito data
  let dataObj = {
    text: addNotes.value,
    category: category.value,
    time: dataTime,
    dates: [meeting],
  };
  try {
    data.push(dataObj);
  } catch (error) {
    alert(error);
  }

  addNote.value = "";
  category.value = "";
});

const toggleArchive = document.querySelector(".switch");
toggleArchive.addEventListener("click", function (e) {
  e.target.classList.toggle("show-arch");
  const mustShowArchived = e.target.classList.contains("show-arch");
  if (mustShowArchived) {
  }
});

window.deleteNote = deleteNote;
window.openModal = openModal;
window.closeModal = closeModal;
window.saveChanges = saveChanges;
window.archiveNote = archiveNote;
window.unarchiveNote = unarchiveNote;
