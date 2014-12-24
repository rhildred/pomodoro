"use strict";
require.config({
    paths: {
        'jquery': 'jquery-1.11.2.min',
        'jquery-ui': 'jquery-ui.min',
        'jquery-ui-touch-punch': 'jquery.ui.touch-punch.min',
        'underscore': '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min',
        'underscore-string': 'underscore.string.min'

    },
    shim: {
        'jquery-ui': {
            depends: 'jquery'
        },
        'jquery-ui-touch-punch': {
            depends: 'jquery-ui'
        },
            'underscore': {
            exports: '_'
        },
        'underscore-string': {
            deps: ['underscore'],
        }
    }
});

require(
['jquery', 'jquery-ui', 'jquery-ui-touch-punch'],
    function (jQuery) {
        jQuery("#accordion").accordion();
        jQuery(".green-tomato").draggable({
            axis: "x",
            stop: function (event, ui) {
                jQuery(this).animate({ top: 0, left: 0 }, 'slow', function(){
                    requirejs(['pomodoro'], jQuery.proxy(function(oPomodoro){
                        jQuery.proxy(oPomodoro.startStop, this)();
                    }, this));
                });
            }
        });
    });
