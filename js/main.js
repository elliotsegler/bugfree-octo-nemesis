var app = {

    findByName: function() {
        console.log('findByName');
        this.store.findByName($('.search-key').val(), function(employees) {
          $('.employee-list').html(self.app.employeeLiTpl(employees));
        });
    },

    showAlert: function(message, title) {
      if (navigator.notification) {
        navigator.notification.alert(message, null, title, 'OK');
      } else {
        alert(title ? (title + ": " + message) : message);
      }
    },

    /** Renders the Home View **/
    renderHomeView: function() {
      $('body').html(this.homeTpl());
      $('.search-key').on('keyup', $.proxy(this.findByName, this));
    },

    initialize: function() {
      var self = this;
      this.homeTpl = Handlebars.compile($('#home-tpl').html());
      this.employeeLiTpl = Handlebars.compile($('#employee-li-tpl').html());
      this.store = new MemoryStore(function() {
        self.renderHomeView();
      });
    }

};

app.initialize();
