exports.toptensales = function(req, res, next) {
    const data = {};
    data.user = req.user;
    if (!req.user) {
        return res.redirect('/dang-nhap');
    }
    res.render('top10/toptensales', { title: 'Top 10 sản phẩm',data });

};