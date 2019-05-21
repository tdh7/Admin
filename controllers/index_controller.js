var app_name = 'EleFind Administration';

exports.home = function(req, res, next) {
    res.render('home/index', { title: app_name });
};