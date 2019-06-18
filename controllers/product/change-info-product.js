exports.changeinfoproduct = function(req, res, next) {
    const data = {};
    data.user = req.user;
    if (!req.user) {
        return res.redirect('/dang-nhap');
    }
    res.render('product/change-info-product', { title: 'Thay đổi thông tin sản phẩm' ,data});

};