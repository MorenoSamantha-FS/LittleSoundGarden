// Import from sounds.js and create remaining 3 buttons
import { createSoundButtons, playSound } from "./sounds.js";

//IIFE to initialize the soundboard and handle button clicks
(() => {
  createSoundButtons();

  const soundboard = document.querySelector("#soundboard");

  soundboard.addEventListener("click", (event) => {

    // Finds the closest button element to the clicked target while ignoring clicks outside buttons
    const button = event.target.closest("button");

    if (!button || !soundboard.contains(button)) {
      return;
    }
    // Gets the sound name from the button's data attribute
    const soundName = button.dataset.sound;

    playSound(soundName);
  });
})();
