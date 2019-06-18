exports.ecommerceproductsingle = function(req, res, next) {
    const data = {};
    data.user = req.user;
    if (!req.user) {
        return res.redirect('/dang-nhap');
    }
    res.render('product/ecommerce-product-single', { title: 'Chi tiết sản phẩm',data });

};