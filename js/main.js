// SpeechSyth API
const synth = window.speechSynthesis;

// Initial Variables
const textForm = document.querySelector("form");
const speakBtn = document.querySelector("#speak-btn");
const stopBtn = document.querySelector("#stop-btn");
const textInput = document.querySelector("#text-input");
const voiceSelect = document.querySelector("#voice-select");
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector("#pitch-value");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector("#rate-value");
const clearBtn = document.querySelector("#clearBtn");
// Init voices array
let voices = [];

const getVoices = () => {
  voices = synth.getVoices();

  // Loop through voices and create an option for each one
  voices.forEach((voice) => {
    // Create option element
    const option = document.createElement("option");
    // Fill option with voice and language
    option.textContent = voice.name + "(" + voice.lang + ")";

    // Set needed option attributes
    option.setAttribute("data-lang", voice.lang);
    option.setAttribute("data-name", voice.name);
    voiceSelect.appendChild(option);
  });
};

getVoices();
if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

// Speak
const speak = () => {
  // Check if speaking
  if (synth.speaking) {
    console.error("Already speaking...");
    return;
  }
  if (textInput.value !== "") {
    // Get speak text
    const speakText = new SpeechSynthesisUtterance(textInput.value);

    // Speak end
    speakText.onend = (e) => {
      console.log("Done speaking...");
    };

    // Speak error
    speakText.onerror = (e) => {
      console.error("Something went wrong");
    };

    // Selected voice
    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute(
      "data-name"
    );

    // Loop through voices
    voices.forEach((voice) => {
      if (voice.name === selectedVoice) {
        speakText.voice = voice;
      }
    });

    // Set pitch and rate
    speakText.rate = rate.value;
    speakText.pitch = pitch.value;
    // Speak
    synth.speak(speakText);
  }
};

// EVENT LISTENERS

// Text form prevent submit
textForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

// Speak button
speakBtn.addEventListener("click", (e) => {
  speak();
  textInput.blur();
});

// Stop button
stopBtn.addEventListener("click", (e) => {
  synth.cancel();
});

// Clear Text button
clearText.addEventListener("click", (e) => {
  textInput.value = "";
  synth.cancel();
});

// Rate value change
rate.addEventListener("change", (e) => (rateValue.textContent = rate.value));

// Pitch value change
pitch.addEventListener("change", (e) => (pitchValue.textContent = pitch.value));

// Voice select change
voiceSelect.addEventListener("change", (e) => speak());
