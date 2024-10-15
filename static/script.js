let text = document.getElementById("text");

// Ensure DOM is fully loaded before accessing elements and attaching events
document.addEventListener("DOMContentLoaded", function () {
  // Get button and add scroll effect
  window.addEventListener("scroll", () => {
    let value = window.scrollY;
    text.style.marginTop = value * 2.5 + "px";
  });

  // Check if the button-30 exists before attaching the event listener
  let button = document.getElementById("button-30");
  if (button) {
    // Attach click event to the button
    button.addEventListener("click", () => {
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
  } else {
    console.error('Button with ID "button-30" not found!'); // Added check for missing button
  }

  // Get modal and buttons
  let ttsModal = document.getElementById("ttsModal");
  let closeBtn = document.querySelector(".close");
  let speakBtn = document.getElementById("speakBtn");

  // Ensure buttons and modal exist before adding event listeners
  if (button && ttsModal) {
    // Show modal on button click
    button.onclick = function () {
      ttsModal.style.display = "block";
    };
  } else {
    console.error("Modal or button not found!"); // Error if modal or button missing
  }

  // Close modal on 'X' click
  if (closeBtn) {
    closeBtn.onclick = function () {
      ttsModal.style.display = "none";
    };
  } else {
    console.error("Close button not found!"); // Error if close button is missing
  }

  // Close modal on outside click
  window.onclick = function (event) {
    if (event.target === ttsModal) {
      ttsModal.style.display = "none";
    }
  };

  // Function to handle speaking text in selected language
  if (speakBtn) {
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
  } else {
    console.error("Speak button not found!"); // Error if speak button is missing
  }
});
