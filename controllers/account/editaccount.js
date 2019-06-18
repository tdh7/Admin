exports.editaccount = function(req, res, next) {
    const data = {};
    data.user = req.user;
    if (!req.user) {
        return res.redirect('/dang-nhap');
    }

    res.render('account/editaccount',{title:'Thay đổi thông tin tài khoản',data});

};