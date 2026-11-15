// Create remaining sound buttons
const extraSounds = ["Wind", "Fire", "Forest"];

// Export function to create sound buttons
export function createSoundButtons() {
  const soundboard = document.querySelector("#soundboard");

  extraSounds.forEach((sound) => {
    const button = document.createElement("button");

    button.type = "button";
    button.textContent = sound;
    button.dataset.sound = sound.toLowerCase();
    soundboard.appendChild(button);
  });
}

// Create Variables to control the audio playback
let currentAudio = null;
let currentSound = null;

export function playSound(soundName) {
  // If the same sound is clicked again, stop it.
  if (currentSound === soundName) {
    currentAudio.pause();
    currentAudio.currentTime = 0;

    currentAudio = null;
    currentSound = null;
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

  currentAudio.play();
}
