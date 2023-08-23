const snippetHeaders = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
  Accept: "application/json",
};
// API endpoint URL
const url = `${baseUrl}/api/v1/submissions`;
// Make a GET request using Axios to fetch all submissions
axios
  .get(url, { headers: snippetHeaders })
  .then((response) => {
    const data = response.data;
    const galleryElement = document.querySelector(".gallery");
    if (data.data && Array.isArray(data.data)) {
      const images = data.data;
      images.forEach((item, index) => {
        const imageUrl = baseUrl + item.image.public_location;
        // Create a container for each gallery item
        const galleryItem = document.createElement("div");
        galleryItem.className = "gallery-item";
        // Create a nested container for image and overlay
        const imageContainer = document.createElement("div");
        imageContainer.className = "image-container";
        // Create an image element and set the source and fixed height
        const imageElement = document.createElement("img");
        imageElement.src = imageUrl;
        imageElement.className = "gallery-image";
        // Add alt attribute to the image element
        imageElement.alt = `Gallery Item ${index + 1}`;
        // Add click event listener to the image element
        imageElement.addEventListener("click", () => {
          displayPopup(item);
        });
        // Append the image element to the image container
        imageContainer.appendChild(imageElement);
        // Create a container for vote icon, count, child name, and age
        const infoContainer = document.createElement("div");
        infoContainer.className = "info-container";
        // Create a container for vote icon and vote count
        const voteContainer = document.createElement("div");
        voteContainer.className = "vote-container";
        // Create the voting icon
        const votingIcon = document.createElement("div");
        votingIcon.innerHTML =
          '<img src="../Assets/bee_icon.svg" alt="Vote" class="vote-icon" />';
        // Create the vote count element
        const voteCountElement = document.createElement("div");
        voteCountElement.id = `vote-count-${item.id}`; // Set an ID for the vote count element
        voteCountElement.className = "vote-count";
        voteCountElement.textContent = item.votings.length;
        // Append the voting icon and vote count to the vote container
        voteContainer.appendChild(votingIcon);
        voteContainer.appendChild(voteCountElement);
        // Create a container for the child's name and age
        const childContainer = document.createElement("div");
        childContainer.className = "child-container";
        // Create the child's name and age element
        const childElement = document.createElement("div");
        childElement.className = "child-info";
        childElement.textContent = `${item.child_firstname}, ${item.child_age}`;
        // Append the vote container and child element to the respective containers
        infoContainer.appendChild(voteContainer);
        infoContainer.appendChild(childContainer);
        childContainer.appendChild(childElement);
        // Append the info container to the image container
        imageContainer.appendChild(infoContainer);
        // Append the image container to the gallery item
        galleryItem.appendChild(imageContainer);
        // Append the gallery item to the gallery element
        galleryElement.appendChild(galleryItem);
      });
    } else {
      console.error("Invalid images data:", data);
    }
  })
  .catch((error) => {
    console.error("Error fetching images:", error);
  });
// Function to fetch all votes of a submission
function getAllVotes(submissionId) {
  const url = `${baseUrl}/api/v1/submissions/${submissionId}/votings`;
  axios
    .get(url, { headers: snippetHeaders })
    .catch((error) => {
      console.error("Error fetching all votes:", error);
    });
}
// Function to count votes for a submission
function countVotes(submissionId, callback) {
  const url = `${baseUrl}/api/v1/submissions/${submissionId}/votes/count`;
  axios
    .get(url, { headers: snippetHeaders })
    .then((response) => {
      const data = response.data;
      const voteCount = data.data.votes;
      callback(voteCount); // Invoke the callback function with the vote count
    })
    .catch((error) => {
      console.error("Error counting votes:", error);
    });
}
function sendVote(submissionId, email) {
  const url = `${baseUrl}/api/v1/submissions/${submissionId}/votings`;
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  const body = {
    email: email,
  };
  return axios
    .post(url, body, { headers })
    .then(() => {
      // Update the vote count after successful vote submission
      countVotes(submissionId, (voteCount) => {
        const voteCountElement = document.querySelector(
          `#vote-count-${submissionId}`
        );
        if (voteCountElement) {
          voteCountElement.textContent = voteCount;
          // Refresh the gallery item after vote count update
          refreshGalleryItem(submissionId);
        }
        // Refresh the vote count in the popup if it is open
        const popupContainer = document.querySelector(".popup-container");
        if (popupContainer) {
          const popupVoteCountElement = popupContainer.querySelector(
            ".popup-child-image-vote"
          );
          if (popupVoteCountElement) {
            popupVoteCountElement.textContent = voteCount;
          }
        }
      });
      // Refresh the list of all votes for the submission
      getAllVotes(submissionId);
    })
    .catch((error) => {
      console.error("Error sending vote:", error);
    });
}

function refreshGalleryItem(submissionId) {
  const galleryItem = document.querySelector(`#gallery-item-${submissionId}`);
  if (galleryItem) {
    const voteCountElement = galleryItem.querySelector(".vote-count");
    // Update the vote count element with the latest vote count
    countVotes(submissionId, (voteCount) => {
      if (voteCountElement) {
        voteCountElement.textContent = voteCount;
      }
    });
  }
}
function displayPopup(item) {
  const imageUrl = baseUrl + item.image.public_location;
  
  const popUpWindowSpaceholder = document.getElementById('popUpWindowSpaceholder');
  popUpWindowSpaceholder.style.display = "flex";
  
  // Create a popup container
  const popupContainer = document.createElement("div");
  popupContainer.className = "popup-container";

  const closeButton = document.createElement("button");
  closeButton.className = "close-button";
  closeButton.textContent = "X";
  closeButton.addEventListener("click", () => {
    popupContainer.remove();
    popUpWindowSpaceholder.style.display = "none";
    
  });

  const popupContentContainer = document.createElement('div');
  popupContentContainer.className ="popupContentContainer"
  const popupTextConatiner = document.createElement('div');
  popupTextConatiner.className = "popupTextContainer";

  // Create a container for the image
  const imageContainer = document.createElement("div");
  imageContainer.className = "popup-image-container";

  
  // Create an image element and set the source and fixed height
  const imageElement = document.createElement("img");
  imageElement.src = imageUrl;
  imageElement.className = "popup-image";
  // Append the image element to the container
  imageContainer.appendChild(imageElement);
  // Append the image container to the popup container
  popupContainer.appendChild(imageContainer);
  // Create a container for the child's description
  const childDescriptionContainer = document.createElement("div");
  childDescriptionContainer.className = "popup-child-description";

  popupTextConatiner.appendChild(closeButton);
  // Create a container for the child's name
  const childNameContainer = document.createElement("div");
  childNameContainer.className = "popup-text-content";
  // Create the label for the child's name
  const childNameLabel = document.createElement("label");
  childNameLabel.className = "popup-child-name-label popup-child-text-label";
  // Create the child's name element
  const childNameElement = document.createElement("p");
  childNameElement.className = "popup-child-name popup-child-paragraphs";
  childNameElement.textContent = item.child_firstname;
  // Append the label and child's name element to the child's name container
  childNameContainer.appendChild(childNameLabel);
  childNameContainer.appendChild(childNameElement);
  // Create a container for the child's age
  const childAgeContainer = document.createElement("div");
  childAgeContainer.className = "popup-text-content";
  // Create the label for the child's age
  const childAgeLabel = document.createElement("label");
  childAgeLabel.className = "popup-child-age-label popup-child-text-label";
  // Create the child's age element
  const childAgeElement = document.createElement("p");
  childAgeElement.className = "popup-child-age popup-child-paragraphs";
  childAgeElement.textContent = item.child_age;
  // Append the label and child's age element to the child's age container
  childAgeContainer.appendChild(childAgeLabel);
  childAgeContainer.appendChild(childAgeElement);
  // Create a container for the vote count
  const voteCountContainer = document.createElement("div");
  voteCountContainer.className = "popup-text-content";
  // Create the label for the vote count
  const voteCountLabel = document.createElement("label");
  voteCountLabel.className =
    "popup-child-image-vote-label popup-child-text-label";
  // Create the vote count element
  const voteCountElement = document.createElement("p");
  voteCountElement.className = "popup-child-image-vote popup-child-paragraphs";
  voteCountElement.textContent = item.votings.length;

  // Append the label and vote count element to the vote count container
  voteCountContainer.appendChild(voteCountLabel);
  voteCountContainer.appendChild(voteCountElement);
  // Append the child's name, age, and vote count containers to the child's description container
  childDescriptionContainer.appendChild(childNameContainer);
  childDescriptionContainer.appendChild(childAgeContainer);
  childDescriptionContainer.appendChild(voteCountContainer);
  // Fetch the voting status from the API
  const votingStatusUrl = `${baseUrl}/api/v1/settings`;
  axios
    .get(votingStatusUrl, { headers: snippetHeaders })
    .then((response) => {
      const votingStatus = response.data.data.voting_open;
      // Create the voting section
      const voteSection = document.createElement("div");
      voteSection.className = "popup-image-vote";

      function changelanguage() {
        if (language == "de") {
          // Request for getting German language data
          var germanRequest = new XMLHttpRequest();
          germanRequest.open("GET", "../Data/StaticContentGerman.json", true);
          germanRequest.onreadystatechange = function () {
            if (
              germanRequest.readyState === 4 &&
              germanRequest.status === 200
            ) {
              germanData = JSON.parse(germanRequest.responseText);
              processGermanData();
            }
          };
          germanRequest.send();
        } else if (language == "en") {
          // Request for getting English language data
          var englishRequest = new XMLHttpRequest();
          englishRequest.open(
            "GET",
            "../Data/StaticContentEnglish.json",
            true
          );
          englishRequest.onreadystatechange = function () {
            if (
              englishRequest.readyState === 4 &&
              englishRequest.status === 200
            ) {
              englishData = JSON.parse(englishRequest.responseText);
              processEnglishData();
            }
          };
          englishRequest.send();
        }
      }

      // Fill labels with fitting content depending on the chosen language
      function processGermanData() {
        fillLabels(germanData);
      }

      function processEnglishData() {
        fillLabels(englishData);
      }

      function fillLabels(data) {
        childNameLabel.textContent = data.gallery.popUp.name;
        childAgeLabel.textContent = data.gallery.popUp.age;
        voteCountLabel.textContent = data.gallery.popUp.votes;
        
        if(votingStatus)
        {
          document.getElementById("voteHeading").innerHTML =
          data.gallery.popUp.vote.heading;
        document.getElementById("voteText").innerHTML =
          data.gallery.popUp.vote.text;
        document.getElementById("emailLabel").innerHTML =
          data.gallery.popUp.vote.mail;
        document.getElementById("submitButton").innerHTML =
          data.gallery.popUp.vote.button;
        }
      }

      if(!votingStatus)
      {
        changelanguage();
      }

      if (votingStatus) {
        // Voting is open, show the voting section
        const voteHeading = document.createElement("h3");
        voteHeading.className = "popup-image-vote-heading";
        voteHeading.id = "voteHeading";
        const voteText = document.createElement("p");
        voteText.className = "popup-image-vote-text";
        voteText.id = "voteText";
        const voteForm = document.createElement("form");
        voteForm.className = "popup-form";
        voteForm.addEventListener("submit", (e) => {
          e.preventDefault();
          const formData = new FormData(voteForm);
          const email = formData.get("email");
          // Send the new vote using Axios
          sendVote(item.id, email);
          // Close the popup
          popupContainer.remove();
          popUpWindowSpaceholder.style.display = "none";
        });
        const emailLabel = document.createElement("label");
        emailLabel.className = "popup-email-vote";
        emailLabel.id = "emailLabel";
        const emailInput = document.createElement("input");
        emailInput.className = "email-input";
        emailInput.type = "email";
        emailInput.name = "email";
        emailInput.placeholder = "Email";
        emailInput.required = true;
        const submitButton = document.createElement("button");
        submitButton.className = "submit-button";
        submitButton.type = "submit";
        submitButton.id = "submitButton";
        //check what language is chosen
        document
          .getElementById("langBtnDE")
          .addEventListener("click", function () {
            language = "de";
          });
        document
          .getElementById("langBtnEN")
          .addEventListener("click", function () {
            language = "en";
          });

        // Call the `changelanguage` function to start the language processing
        changelanguage();

        // Append elements to the vote form
        voteForm.appendChild(emailLabel);
        voteForm.appendChild(emailInput);
        voteForm.appendChild(submitButton);
        // Append elements to the vote section
        voteSection.appendChild(voteHeading);
        voteSection.appendChild(voteText);
        voteSection.appendChild(voteForm);
      } else {
        // Voting is closed, hide the voting section
        voteSection.style.display = "none";
      }
      // Append the vote section to the popup container
      popupContentContainer.appendChild(imageContainer);
      popupContentContainer.appendChild(popupTextConatiner);
      popupTextConatiner.appendChild(childDescriptionContainer);
      popupTextConatiner.appendChild(voteSection);

      popupContainer.appendChild(popupContentContainer);

      popUpWindowSpaceholder.appendChild(popupContainer);

      // Update the vote count in the popup with the latest count
      countVotes(item.id, (voteCount) => {
        const popupVoteCountElement = popupContainer.querySelector(
          ".popup-child-image-vote"
        );
        if (popupVoteCountElement) {
          popupVoteCountElement.textContent = voteCount;
        }
      });
    })
    .catch((error) => {
      console.error("Error fetching voting status:", error);
    });
}
