// Imports functions from sounds.js
import { createSoundButtons, playSound } from "./sounds.js";

//IIFE to initialize the soundboard and handle clicks and keyboard navigation
(() => {
  createSoundButtons();

  // Finds all buttons within the soundboard and returns them as a NodeList
  const buttons = document.querySelectorAll("#soundboard button");

  const soundboard = document.querySelector("#soundboard");

  soundboard.addEventListener("click", (event) => {
    // Finds the closest button associated with the clicked element
    const button = event.target.closest("button");

    // Exits if the click did not originate within a soundboard button
    if (!button || !soundboard.contains(button)) {
      return;
    }
    // Gets the sound name from the button's data attribute
    const soundName = button.dataset.sound;

    playSound(soundName);
  });

  // Event Listener for arrow key navigation
  document.addEventListener("keydown", (event) => {
    // Defines arrow keys used for soundboard navigation
    const arrowKeys = ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"];

    // Defines number keys for direct sound selection
    const numberKeys = ["1", "2", "3", "4", "5", "6"];

    // Exits if key is not an arrow key or a number key
    if (!arrowKeys.includes(event.key) && !numberKeys.includes(event.key)) {
      return;
    }

    // Handles number key shortcuts
    if (numberKeys.includes(event.key)) {
      const numberIndex = Number(event.key) - 1;
      const button = buttons[numberIndex];

      const soundName = button.dataset.sound;
      playSound(soundName);

      return;
    }

    // Converts button collection to an array and find the focused button's index
    const currentIndex = Array.from(buttons).indexOf(document.activeElement);

    // Exits if the currently focused element is not a soundboard button
    if (currentIndex === -1) {
      return;
    }

    // Prevents default arrow behavior
    event.preventDefault();

    // Initializes nextIndex to the current button's index
    let nextIndex = currentIndex;

    // Right and Down move to the next sound
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = currentIndex + 1;
    }

    // Left and Up move to the previous sound
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = currentIndex - 1;
    }

    // Conditional check to handle wrap-around when reaching the end of the array in either direction
    if (nextIndex >= buttons.length) {
      nextIndex = 0;
    }

    if (nextIndex < 0) {
      nextIndex = buttons.length - 1;
    }

    buttons[nextIndex].focus();
  });
})();
