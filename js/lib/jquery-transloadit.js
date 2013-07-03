/** @license jquery.transloadit3.js: Copyright (c) 2013 Tim Koschützki | MIT License: http://www.opensource.org/licenses/mit-license.php
 *
 * Fork this on Github: http://github.com/transloadit/jquery-sdk-2
 *
 * Transloadit servers allow browsers to cache jquery.transloadit3.js for 1 hour.
 * keep this in mind when rolling out fixes.
 */


;(function($, doc, win) {
  "use strict";

  var name = 'transloadit-uploader';

  function Transloadit(el, opts) {
    this.$el = $(el);
    this.$el.data(name, this);

    this._cssLoaded = false;
    this._protocol = document.location.protocol == 'https:' ? 'https' : 'http';

    this.defaults = {
      wait: true,
      autoSubmit: true,
      modal: true,
      fields: true,
      processZeroFiles: false,

      onStart: function() {},
      onProgress: function() {},
      onUpload: function() {},
      onResult: function() {},
      onCancel: function() {},
      onError: function() {},
      onSuccess: function() {},

      interval: 2500,
      pollTimeout: 8000,
      poll404Retries: 15,
      pollConnectionRetries: 3,
      exclude: '',

      service: this._protocol + '://api2.transloadit.com/',
      assets: this._protocol + '://assets.transloadit.com/',

      debug: true
    };

    opts = opts || {};
    var meta  = this.$el.data(name + '-opts') || {};
    this.opts = $.extend(this.defaults, opts, meta);

    this.init();
  }

  Transloadit.prototype.init = function() {
    this.assemblyId = null;

    this.instance = null;
    this.documentTitle = null;
    this.timer = null;
    this._options = {};
    this.uploads = [];
    this.results = {};
    this.ended = null;
    this.pollStarted = null;
    this.pollRetries = 0;
    this.seq = 0;
    this.started = false;
    this.assembly = null;
    this.params = null;

    this.bytesReceivedBefore = 0;
    this.lastPoll = 0;

    this.$params = null;
    this.$form = null;
    this.$files = null;
    this.$fileClones = null;
    this.$iframe = null;
    this.$modal = null;

    this.serverFinder = new ServerFinder(
      this.opts.service, this.opts.pollTimeout
    );

    var self = this;

    this.$el.bind('submit.transloadit', function() {
      self.validate();
      self.detectFileInputs();
      if (!self.opts['processZeroFiles'] && self.$files.length === 0) {
        self.submitForm();
      } else {
        self.getBoredInstance();
      }

      return false;
    });

    this.includeCss();
  };

  Transloadit.prototype.loadCss = function() {
    if (this.cssLoaded || !this.opts.modal) {
      return;
    }

    this._cssLoaded = true;
    var href = this.opts.assets + 'css/transloadit2.css';
    $('<link rel="stylesheet" type="text/css" href="' + href + '" />').appendTo('head');
  };

  Transloadit.prototype.uuid = function() {
    var uuid = '', i;
    for (i = 0; i < 32; i++) {
      uuid += Math.floor(Math.random() * 16).toString(16);
    }
    return uuid;
  };

  Transloadit.prototype.options = function(options) {
    if (arguments.length === 0) {
      return this.opts;
    }
    $.extend(this.opts, options);
  };

  Transloadit.prototype.option = function(key, val) {
    if (arguments.length === 1) {
      return this.opts[key];
    }
    this.opts[key] = val;
  };

  Transloadit.prototype.destroy = function() {
    this.$el.off('.' + name);
    this.$el.find('*').off('.' + name);
    this.$el.removeData(name);
    this.$el = null;
  };

  $.fn.transloadit = function(opts) {
    return this.each(function() {
      new Transloadit(this, opts);
    });
  };
})(jQuery, document, window);
