;(function($, doc, win) {
  "use strict";

  function ServerFinder(service, timeout) {
    this.service  = service;
    this.timeout  = timeout || 8000;
    this.hostname = null;
  }

  ServerFinder.prototype.find = function(cb) {
    var self = this;

    this.hostname = null;

    $.jsonp({
      url: this.service + 'instances/bored',
      timeout: this.timeout,
      callbackParameter: 'callback',
      success: function(instance) {
        var err       = instance.error ? instance.error : null;
        self.hostname = err ? null : instance.api2_host;

        cb(err, self.hostname);
      },
      error: function(xhr, status) {
        var err = {
          error: 'CONNECTION_ERROR',
          message: 'There was a problem connecting to the upload server',
          reason: 'JSONP request status: '+status
        };
        cb(err);
      }
    });
  };

})(jQuery, document, window);
