var siteNameInput = document.getElementById("bookmarkName");
var siteURLInput = document.getElementById("bookmarkUrl");
var submitBtn = document.getElementById("submit_btn");
var tableContent=document.getElementById("table_content");
var visitBtn;
var deletBtn;
var closeBtn = document.getElementById("closeBtn");
var boxModal = document.querySelector(".box-info");


var bookmarks = [];

if (localStorage.getItem("bookmarkList")){
    bookmarks =JSON.parse(localStorage.getItem("bookmarkList"));
    for(var x = 0; x < bookmarks.length; x++){
        displayBookmark(x);
    }
}




function displayBookmark(indexOfWebsite){
    var userURL = bookmarks[indexOfWebsite].siteURLInput;
  var httpsRegex = /^https?:\/\//g;
  if (httpsRegex.test(userURL)) {
    validURL = userURL;
    fixedURL = validURL
    .split("")
    .splice(validURL.match(httpsRegex)[0].length)
    .join("");
} else{
    var fixedURL = userURL;
    validURL = `https://${userURL}`;
  }


  var newBookmark = `
              <tr>
                <td>${indexOfWebsite + 1}</td>
                <td>${bookmarks[indexOfWebsite].siteNameInput}</td>              
                <td>
                  <button class="btn btn-visit" data-index="${indexOfWebsite}">
                    <i class="fa-solid fa-eye pe-2"></i>Visit
                  </button>
                </td>
                <td>
                  <button class="btn btn-delete pe-2" data-index="${indexOfWebsite}">
                    <i class="fa-solid fa-trash-can"></i>
                    Delete
                  </button>
                </td>
            </tr>
            `;
            tableContent.innerHTML += newBookmark;




            deleteBtns = document.querySelectorAll(".btn-delete");
  if (deleteBtns) {
    for (var j = 0; j < deleteBtns.length; j++) {
      deleteBtns[j].addEventListener("click", function (e) {
        deleteBookmark(e);
      });
    }
  }




  visitBtns = document.querySelectorAll(".btn-visit");
  if (visitBtns) {
    for (var l = 0; l < visitBtns.length; l++) {
      visitBtns[l].addEventListener("click", function (e) {
        visitWebsite(e);
      });
    }
  }
}







function clearInput() {
    siteNameInput.value = "";
    siteURLInput.value = "";
  }





  
function capitalize(str) {
    let strArr = str.split("");
    strArr[0] = strArr[0].toUpperCase();
    return strArr.join("");
  }






  submitBtn.addEventListener("click", function () {
    if (
      siteNameInput.classList.contains("is-valid") &&
      siteURLInput.classList.contains("is-valid")
    ) {
      var bookmark = {
        siteNameInput: capitalize(siteNameInput.value),
        siteURLInput: siteURLInput.value,
      };
      bookmarks.push(bookmark);
      localStorage.setItem("bookmarkList", JSON.stringify(bookmarks));
      displayBookmark(bookmarks.length - 1);
      clearInput();
      siteNameInput.classList.remove("is-valid");
      siteURLInput.classList.remove("is-valid");
    } else {
      boxModal.classList.remove("d-none");
    }
  });






  function deleteBookmark(e) {
    tableContent.innerHTML = "";
    var deletedIndex = e.target.dataset.index;
    bookmarks.splice(deletedIndex, 1);
    for (var k = 0; k < bookmarks.length; k++) {
      displayBookmark(k);
    }
    localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
  }





  
function visitWebsite(e) {
    var websiteIndex = e.target.dataset.index;
    var httpsRegex = /^https?:\/\//;
    if (httpsRegex.test(bookmarks[websiteIndex].siteURLInput)) {
      open(bookmarks[websiteIndex].siteURLInput);
    } else {
      open(`https://${bookmarks[websiteIndex].siteURLInput}`);
    }
  }








  var nameRegex = /^\w{3,}(\s+\w+)*$/;
var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;

siteNameInput.addEventListener("input", function () {
  validate(siteNameInput, nameRegex);
});

siteURLInput.addEventListener("input", function () {
  validate(siteURLInput, urlRegex);
});

function validate(element, regex) {
  var testRegex = regex;
  if (testRegex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  }
}









function closeModal() {
    boxModal.classList.add("d-none");
  }
  

  
  closeBtn.addEventListener("click", closeModal);
  
  document.addEventListener("keydown", function (e) {
    if (e.key == "Escape") {
      closeModal();
    }
  });
  
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("box-info")) {
      closeModal();
    }
  });
