/* eslint-disable prefer-template */
/* eslint-disable no-var */
var timeout;

/**
 *
 * TODO :
 *  DOM ContentLoaded init Flash  - REFACTOR TO USE ES6
 */
$(function() {
  initializeFlash();
});

function initializeFlash(duration) {
  $('#close-flash').click(function() {
    $('.flash').fadeOut(500, function() {
      this.remove();
    });
    return false;
  });

  if (duration === undefined) {
    duration = 7000;
  }

  /* AUTO SLIDE UP OF FLASH MESSAGE */
  if ($('.flash').length > 0) {
    timeout = setTimeout(function() {
      clearTimeout(timeout);
      $('.flash').fadeOut(500, function() {
        this.remove();
      });
    }, duration);
  }
}

function flash(type, message, duration) {
  /* Clear existing flashes */
  if ($('.flash').length > 0) {
    $('.flash').remove();
  }

  // eslint-disable-next-line vars-on-top
  var flashElement = document.createElement('div');
  flashElement.className = 'flash ' + type + ' shadow';
  flashElement.innerHTML =
    "<span class='message-text'>" +
    message +
    "</span> <div class='close-flash-container'><a href='#' id='close-flash'>CLOSE</a></div>";
  document.body.insertBefore(flashElement, document.body.children[0]);
  initializeFlash(duration);
}
