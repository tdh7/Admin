exports.ordermanagement = function(req, res, next) {
    const data = {};
    data.user = req.user;
    if (!req.user) {
        return res.redirect('/dang-nhap');
    }
    res.render('order/order-management', { title: 'Quản lý đơn đặt hàng',data });

};