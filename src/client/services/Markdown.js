'use strict';

// *****************************************************
// Markdown Factory
// *****************************************************

module.factory('Markdown', ['$HUB', '$stateParams', function($HUB, $stateParams) {

    var label = function(markdown) {

        var negative = /\!\bfix\b|\!\bresolve\b/g;
        var positive = /\!\bfixed\b|\!\bresolved\b|\!\bcompleted\b/g;

        markdown = markdown.replace(negative, function(flag) {
            return '<span class="label label-danger">' + flag + '</span>';
        });

        markdown = markdown.replace(positive, function(flag) {
            return '<span class="label label-success">' + flag + '</span>';
        });

        return markdown;
    };

    return {
        render: function(obj) {
            if(obj.body) {
                $HUB.wrap('markdown', 'render', {
                    text: obj.body,
                    mode: 'gfm',
                    context: $stateParams.user + '/' + $stateParams.repo
                }, function(err, markdown) {
                    if(!err) {
                        obj.html = label(markdown.value);
                    }
                });
            }

            return obj;
        }
    };
}]);
