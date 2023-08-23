const submissionUrl = `${baseUrl}/api/v1/submissions`;

document.getElementById("landingPartBtn").addEventListener("click", () => {
  const participationSection = document.getElementById("landingPart");
  participationSection.style.display = "flex";
});

document
  .getElementById("submissionForm")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    const url = new URL(submissionUrl);
    const token = getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    };
    const submissionForm = document.getElementById("submissionForm");
    const formData = new FormData(submissionForm);

    formData.set(
      "approval_privacypolicy",
      formData.get("approval_privacypolicy") ? "1" : "0"
    );
    formData.set(
      "approval_participation",
      formData.get("approval_participation") ? "1" : "0"
    );
    formData.set(
      "approval_mailnotification",
      formData.get("approval_mailnotification") ? "1" : "0"
    );

    axios
      .post(url, formData, { headers })
      .then((response) => {
        // Handle the response data

        // Show submission done section
        const submissionDoneSection =
          document.getElementById("landingPartDone");
        submissionDoneSection.style.display = "flex";

        // Reset the form
        submissionForm.reset();

        // Hide the form after submission
        submissionForm.style.display = "none";

        // Show the button after submission
        const button = document.getElementById("landingPartBtn");
        button.style.display = "inline-block";
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });

    // Clear previous error messages
    const errorMessages = document.getElementsByClassName("error-message");
    for (let i = 0; i < errorMessages.length; i++) {
      errorMessages[i].innerHTML = "";
    }
  });

const uploadButton = document.getElementById("landingPartPicBtn");
const imagePreview = document.getElementById("landingPartPicFile");
const error = document.getElementById("error");

uploadButton.addEventListener("change", (e) => {
  imagePreview.innerHTML = "";

  const file = e.target.files[0];
  if (!file) {
    error.innerText = "Please select a file";
    return;
  }

  const fileType = file.type;
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/svg+xml",
  ];

  if (!allowedTypes.includes(fileType)) {
    error.innerText =
      "Please upload a valid image file (JPEG, JPG, PNG, GIF, SVG)";
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    error.innerText = "Please upload an image file under 5MB";
    return;
  }

  error.innerText = "";

  const reader = new FileReader();

  reader.onload = () => {
    const img = document.createElement("img");
    img.src = reader.result;
    img.className = "image-preview";

    const figcaption = document.createElement("figcaption");
    figcaption.textContent = file.name;

    const fileContainer = document.createElement("div");
    fileContainer.appendChild(img);
    fileContainer.appendChild(figcaption);

    imagePreview.appendChild(fileContainer);
  };

  reader.readAsDataURL(file);
});
