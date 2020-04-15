const EventSystem = (function() {
  const self = this;

  // Event Queue
  self.queue = {};

  return {
    publish(event, data) {
      // Find the subscribed event
      const queue = self.queue[event];

      if (typeof queue === 'undefined') {
        return false;
      }

      // Event Loop
      for (let i = 0; i < queue.length; i++) {
        // Call the functions pushed by subscribe with the data submitted on publish
        queue[i](data);
      }

      return true;
    },
    subscribe(event, callback) {
      if (typeof self.queue[event] === 'undefined') {
        self.queue[event] = [];
      }

      self.queue[event].push(callback);
    },
  };
})();

window.EventSystem = EventSystem;
