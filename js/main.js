var app = {

    showAlert: function(message, title) {
      if (navigator.notification) {
        navigator.notification.alert(message, null, title, 'OK');
      } else {
        alert(title ? (title + ": " + message) : message);
      }
    },

    registerEvents: function() {
      var self = this;

      // Check that the browser supports touch events
      if (document.documentElement.hasOwnProperty('ontouchstart')) {
        // if yes: register an event on the touch listener to change the
        // "selected" state of the item
        $('body').on('touchstart', 'a', function(event) {
          $(event.target).addClass('tappable-active');
        });
        $('body').on('touchend', 'a', function(event) {
          $(event.target).removeClass('tappable-active');
        });
      } else {
        // if not, use mouse events instead
        $('body').on('mousedown', 'a', function(event) {
          $(event.target).addClass('tappable-active');
        });
        $('body').on('mouseup', 'a', function(event) {
          $(event.target).removeClass('tappable-active');
        });
      }
    },

    initialize: function() {
      var self = this;
      this.store = new MemoryStore(function() {
        $('body').html(new HomeView(self.store).render().el);
        self.app.registerEvents();
      });
    }

};

app.initialize();
