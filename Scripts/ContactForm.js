const landingPart = document.getElementById("landingPart");
const landingPartBtn = document.getElementById("landingPartBtn");
const landingPartDone = document.getElementById("landingPartDone");
const landingPartSend = document.getElementById("landingPartSend");
const landingPartInputSection = document.getElementById(
  "landingPartInputSection"
);

landingPartDone.style.display = "none";
landingPart.style.display = "none";
landingPartBtn.addEventListener("click", showSubmitForm);
landingPartSend.addEventListener("click", closeSubmit);

function showSubmitForm() {
  landingPart.style.display = "flex";
  landingPartBtn.style.display = "none";
}

function closeSubmit() {
  if (validateForm()) {
    landingPartInputSection.style.display = "none";
    landingPartDone.style.display = "flex";
  } else {
    console.log("Please fill in all fields before submitting!");
  }
}

function validateForm() {
  const inputs = document.querySelectorAll("#submissionForm input");
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value === "") {
      return false;
    }
  }

  const checkboxes = document.querySelectorAll(
    '#submissionForm input[type="checkbox"]'
  );
  for (let i = 0; i < checkboxes.length; i++) {
    if (!checkboxes[i].checked) {
      return false;
    }
  }

  return true;
}
