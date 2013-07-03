# Transloadit jQuery SDK 2.0

This is going to be the new jQuery SDK for Transloadit.

It's currently work-in-progress and not working yet.

## Differences from the old SDK

There are several differences compared to the old one [documented here](http://transloadit.com/docs/jquery-plugin).

### Default configuration settings

* "fields" used to be false, but is now true. This sends all other fields of your form to Transloadit by default. Set this to false if you do not want to send your other data to Transloadit. This also removes the ability to use these form fields in your assembly instructions.
* "processZeroFiles" used to be true, but is now false. The most common use case is that you do not allow your user to submit a form when he has not selected a file. "processZeroFiles" was added in a later version of the old SDK and thus had to be set to false to keep backwards compatibility, whereas it should really be true.
* "wait" used to be false, but is now true. If "wait" is set to false, a notify_url (read [here](https://transloadit.com/docs/server-notifications)) needs to be used in order to get the conversion result sent to your app. For the most simple integration where no notify_url is used, wait must be true, hence it's new default value is true.

### Access to the uploader object

Whenever you call $.transloadit() on a form (or a set of forms), a new uploader object is created for each element in your set. You can access the object by calling .data('transloadit-uploader') on the object.

So for example if you had two forms on your page, and you use $('form').transloadit(), both forms would have a different transloadit object each, accessible at $('form:first').data('transloadit-uploader'). You can then change options and callbacks for that object at runtime, like so:

    var uploader = $('form:first').data('transloadit-uploader')
    uploader.option('wait', true);
    uploader.option('autoSubmit', false);
    uploader.option('onError', function(assembly) {
      alert(assembly.error+': ' + assembly.message);
    });


## Contributing

This is work heavily in progress. For the time being we are thankful for any feature ideas you have.

## Dependencies

This plugin includes the following dependencies:

* [jquery.easing.js](http://gsgd.co.uk/sandbox/jquery/easing/) by George McGinley Smith (BSD License)
* [jquery.jsonp.js](http://code.google.com/p/jquery-jsonp/) by Julian Aubourg (MIT License)
* [toolbox.expose.js](http://flowplayer.org/tools/toolbox/expose.html) by Tero Piirainen (Public domain)
* [json2.js](http://www.json.org/json2.js) by Douglas Crockford (Public domain)

A big thanks goes to the authors of these fantastic projects!

## License

The Transloadit jQuery SDK 2.0 is licensed under the MIT license. The dependencies
have their own licenses (MIT, BSD, PUBLIC DOMAIN).
