exports.toptencategory = function(req, res, next) {
    const data = {};
    data.user = req.user;
    if (!req.user) {
        return res.redirect('/dang-nhap');
    }
    res.render('top10/toptencategory', { title: 'Top 10 danh mục',data });

};