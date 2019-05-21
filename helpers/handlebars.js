var register = function(Handlebars) {
    var helpers = {
        'repeat': function (count,options) {
          let result ='';
          for(let i =0 ; i<count;i++)
         result += options.fn(this);
          return result;
        } ,
        'ifEquals' : function(arg1, arg2, options) {
            return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
        },
        'select':  function(selected, options) {
            return options.fn(this).replace(
                new RegExp(' value=\"' + selected + '\"'),
                '$& selected="selected"');
        },
        'eachToDisplayProperty': function(context, toDisplays, options) {
            var ret = "";
            for(var i = 0; i < toDisplays.length; i++) {
                toDisplayKey = toDisplays[i];
                if(context[toDisplayKey]) {
                    ret = ret + options.fn({
                        property : toDisplayKey,
                        value : context[toDisplayKey]
                    });
                }

            }
            return ret;
        }
    };

    if (Handlebars && typeof Handlebars.registerHelper === "function") {
        for (var prop in helpers) {
            Handlebars.registerHelper(prop, helpers[prop]);
        }
    } else {
        return helpers;
    }

};

module.exports.register = register;
module.exports.helpers = register(null);