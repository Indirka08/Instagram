const API = "http://localhost:8000/posts";

let inpTitle = document.getElementById("inpTitle");
let inpDesc = document.getElementById("inpDesc");
let inpImg = document.getElementById("inpImg");
let inpPosts = document.getElementById("inpPosts");
let searchValue = "";
let currentPage = 1;
let sectionPosts = document.querySelector("#posts");
btnAdd.addEventListener("click", () => {
  if (!inpTitle.value.trim() || !inpDesc.value.trim() || !inpImg.value.trim()) {
    alert("Error, please enter all inputs");
    return;
  }
  let newInst = {
    instTitle: inpTitle.value,
    instDesc: inpDesc.value,
    instImg: inpImg.value,
  };
  createInst(newInst);
});
function createInst(instObj) {
  fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(instObj),
  });

  inpTitle.value = "";
  inpDesc.value = "";
  inpImg.value = "";
}

document.addEventListener("click", (e) => {
  let del_class = [...e.target.classList];
  if (del_class.includes("btnDelete")) {
    let del_id = e.target.id;
    fetch(`${API}/${del_id}`, {
      method: "DELETE",
    }).then(() => readPosts());
  }
});

function readPosts() {
  fetch(`${API}?q=${searchValue}&_page=${currentPage}&_limit=6`) // получение данных из db.json
    .then((res) => res.json())
    .then((data) => {
      sectionPosts.innerHTML = ""; // очищаем наш тег section, чтобы не было дубликатов
      data.forEach((item) => {
        // перебираем наш полученный массив с объектами
        // добаляем в наш тег section верстку при каждом цикле
        sectionPosts.innerHTML += ` 
          <div class="card m-4 cardBook" style="width: 18rem">
          <img id="${item.id}" src="${item.instImg}" class="card-img-top detailsCard" style="height: 280px" alt="${item.instTitle}" />
        <div class="card-body">
          <h5 class="card-title">${item.instDesc}</h5>
      
      
          <button class="btn btn-outline-danger btnDelete" id="${item.id}">
              Delete
            </button>
            <button type="button" class="btn btn-warning btnEdit" id="${item.id}" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Edit
          </button>
          
        </div>
      </div>
          `;
      });
    });
}
readPosts();
