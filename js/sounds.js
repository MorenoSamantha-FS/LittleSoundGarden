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
