// Stores the list of extra sounds to be added to the soundboard
const extraSounds = ["Wind", "Fire", "Forest"];

// Exports function to dynamically create sound buttons 3-6
export function createSoundButtons() {
  const soundboard = document.querySelector("#soundboard");

  // Loops through the extra sounds array and creates a button for each sound
  extraSounds.forEach((sound) => {
    const button = document.createElement("button");

    // Sets the button type to "button" to prevent form submission by default
    button.type = "button";
    button.textContent = sound;

    // Changes the sound name to lowercase for the data attribute
    button.dataset.sound = sound.toLowerCase();
    soundboard.appendChild(button);
  });
}

// Tracks the currently selected audio object and sound name
let currentAudio = null;
let currentSound = null;

export function playSound(soundName) {
  // Selects the element used for screen-reader announcements
  const status = document.querySelector("#status");

  // If the same sound is clicked again, stop it.
  if (currentSound === soundName) {
    currentAudio.pause();
    currentAudio.currentTime = 0;

    currentAudio = null;
    currentSound = null;
    status.textContent = `[${soundName} sounds stopped]`;
    return;
  }

  // If another sound is already playing, stop it.
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  // Create and play the selected sound.
  currentAudio = new Audio(`./assets/audio/${soundName}.mp3`);
  currentSound = soundName;

  // Resets the playback variables when the audio finishes naturally
  currentAudio.addEventListener("ended", () => {
    currentAudio = null;
    currentSound = null;
    status.textContent = `[${soundName} sounds finished playing]`;
  });

  // Starts playing the selected audio
  currentAudio.play();
  status.textContent = `[${soundName} sounds playing]`;
}
