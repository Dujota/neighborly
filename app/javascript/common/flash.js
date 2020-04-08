import { animateCSS } from '../utils/animate';

let timeout;

/**
 *
 * TODO :
 *  DOM ContentLoaded init Flash  - REFACTOR TO USE ES6
 */

const initializeFlash = duration => {
  const closeButtons = document.querySelectorAll('.close-flash-btn');
  const flashMessages = document.querySelectorAll('.flash');

  if (closeButtons) {
    for (const closeButton of closeButtons) {
      closeButton.addEventListener('click', function() {
        const flashEl = this.parentElement.parentNode;

        animateCSS('.flash', 'fadeOutLeft', () => flashEl.remove(), 'slow');

        return false;
      });
    }
  }

  /* AUTO SLIDE UP OF FLASH MESSAGE */
  if (flashMessages.length > 0) {
    timeout = setTimeout(function() {
      clearTimeout(timeout);

      for (const flashMessage of flashMessages) {
        animateCSS('.flash', 'fadeOutLeft', () => flashMessage.remove(), 'slow');
      }
    }, duration || 7000);
  }
};

function flash(type, message, duration) {
  const flashMessages = document.querySelectorAll('.flash');

  /* Clear existing flashes */
  if (flashMessages.length > 0) {
    for (const flashMessage of flashMessages) {
      flashMessage.remove();
    }
  }

  // eslint-disable-next-line vars-on-top
  /**
   * @BUILD_FLASH_ELEMENT_AND_APPEND_HERE
   */

  const flashElement = document.createElement('div');
  flashElement.className = `flash ${type} shadow`;
  flashElement.innerHTML = `<span class='message-text'>${message}</span> <div class='close-flash-container'><a href='#' class='close-flash-btn'>CLOSE</a></div>`;
  document.body.insertBefore(flashElement, document.body.children[0]);
  initializeFlash(duration);
}

document.addEventListener('DOMContentLoaded', () => {
  window.flash = flash;
  initializeFlash();
});
