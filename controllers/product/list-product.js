exports.listproduct = function(req, res, next) {
    const data = {};
    data.user = req.user;
    if (!req.user) {
        return res.redirect('/dang-nhap');
    }
    res.render('product/list-product', { title: 'Danh sách sản phẩm',data });

};