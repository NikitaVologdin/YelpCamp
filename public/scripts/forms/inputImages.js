const input = document.querySelector("#imagesInput");
const buttons = document.querySelector(".buttons");

function removeFileFromFileList(name) {
  const dt = new DataTransfer();
  const { files } = input;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (name !== files[i].name) dt.items.add(file);
  }

  input.files = dt.files;
}

input.addEventListener("change", (event) => {
  buttons.innerHTML = "";
  let files = event.target.files;

  for (let file of files) {
    let markup = `<button type="button" class="btn btn-sm btn-outline-danger mt-1 ms-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-x-square"
              viewBox="0 0 16 16"
            >
              <path
                d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
              ></path>
              <path
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
              ></path>
            </svg>
            ${file.name}
          </button>`;
    buttons.insertAdjacentHTML("beforeend", markup);
  }
});

buttons.addEventListener("click", (event) => {
  let target = event.target;
  if (target.tagName === "svg") {
    target = event.target.parentNode;
  }
  removeFileFromFileList(target.innerText.trim());
  target.remove();
});
