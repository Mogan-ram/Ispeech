let text = document.getElementById("text");
// let button = document.getElementById("button-30");

window.addEventListener("scroll", () => {
  let value = window.scrollY;

  text.style.marginTop = value * 2.5 + "px";
  // button.style.marginTop = value * 2.5 + "px";
});

document.getElementById("button-30").addEventListener("click", () => {
  const language = document.getElementById("language").value;
  const text = document.getElementById("textInput").value;

  fetch("/convert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      language: language,
      text: text,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === "Success") {
        alert("Speech output generated!");
      } else {
        alert("Error: " + data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

// Get modal and buttons
let ttsModal = document.getElementById("ttsModal");
let textSpeechBtn = document.getElementById("textSpeechBtn");
let closeBtn = document.querySelector(".close");
let speakBtn = document.getElementById("speakBtn");

// Show modal on button click
textSpeechBtn.onclick = function () {
  ttsModal.style.display = "block";
};

// Close modal on 'X' click
closeBtn.onclick = function () {
  ttsModal.style.display = "none";
};

// Close modal on outside click
window.onclick = function (event) {
  if (event.target === ttsModal) {
    ttsModal.style.display = "none";
  }
};

// Function to handle speaking text in selected language
speakBtn.onclick = function () {
  let language = document.getElementById("language").value;
  let text = document.getElementById("textInput").value;

  fetch("/speak", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ language, text }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        console.log("Speech played successfully");
      } else {
        console.error("Error playing speech");
      }
    })
    .catch((error) => console.error("Error:", error));
};
