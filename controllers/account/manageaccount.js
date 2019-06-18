exports.manageaccount = function(req, res, next) {
    const data = {};
    data.user = req.user;
    if (!req.user) {
        return res.redirect('/dang-nhap');
    }
    res.render('account/manageaccount',{title:'Quản lý tài khoản',data});

};