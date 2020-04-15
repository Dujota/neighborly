const EventSystem = (function() {
  const self = this;

  self.queue = {};

  return {
    publish(event, data) {
      const queue = self.queue[event];

      if (typeof queue === 'undefined') {
        return false;
      }

      for (let i = 0; i < queue.length; i++) {
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
