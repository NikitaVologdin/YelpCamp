const uploadedImages = document.querySelector(".images");

uploadedImages.addEventListener("click", (event) => {
  let target = event.target;
  if (target.tagName === "svg") {
    target = event.target.parentNode;
  }

  if (
    target.tagName === "BUTTON" &&
    target.classList.contains("btn-outline-danger")
  ) {
    target.nextElementSibling.checked = true;
    displayDeleted(target);
  } else if (
    target.tagName === "BUTTON" &&
    target.classList.contains("btn-outline-warning")
  ) {
    target.nextElementSibling.checked = false;
    dipslayAvailableToDelete(target);
  }
});

function displayDeleted(target) {
  target.innerText = "Image Deleted";
  target.classList.remove("btn-outline-danger");
  target.classList.add("btn-outline-warning");
}

function dipslayAvailableToDelete(target) {
  target.innerHTML = `Delete Image
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path>
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path>
                      </svg>`;
  target.classList.remove("btn-outline-warning");
  target.classList.add("btn-outline-danger");
}
