// Imports functions from sounds.js
import { createSoundButtons, playSound } from "./sounds.js";

//IIFE to initialize the soundboard and handle button clicks and keyboard navgiation
(() => {
  createSoundButtons();

  // Finds all buttons within the soundboard and returns them as a NodeList
  const buttons = document.querySelectorAll("#soundboard button");

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

  // Event Listener for arrow key navigation
  document.addEventListener("keydown", (event) => {
    // Catch-functions for if user presses unexpected keys
    const arrowKeys = ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"];

    // User hits non-arrow buttons
    if (!arrowKeys.includes(event.key)) {
      return;
    }

    // Finds element currently receiving focus, converts to array, stores inside currentIndex
    const currentIndex = Array.from(buttons).indexOf(document.activeElement);

    // Exits function if currentIndex is outside the soundboard index
    if (currentIndex === -1) {
      return;
    }

    // Prevents default arrow behavior
    event.preventDefault();

    // Establishes nextIndex behavior
    let nextIndex = currentIndex;

    if (event.key === "ArrowRight") {
      nextIndex = currentIndex + 1;
    }
    if (event.key === "ArrowLeft") {
      nextIndex = currentIndex - 1;
    }
    if (event.key === "ArrowUp") {
      nextIndex = currentIndex - 3;
    }
    if (event.key === "ArrowDown") {
      nextIndex = currentIndex + 3;
    }

    // Handle wrap-around function when reaching the end of the array in either direction
    if (nextIndex >= buttons.length) {
      nextIndex = 0;
    }

    if (nextIndex < 0) {
      nextIndex = buttons.length - 1;
    }

    buttons[nextIndex].focus();
  });
})();
