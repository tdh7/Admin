var app_name = 'EleFind Administration';
const userModel = require('../model/user');
const passport = require('passport');

exports.home = function(req, res, next) {
    const data = {};
    data.user = req.user;
    if(!req.user) {
        res.redirect('/dang-nhap',)
    }
    else {
        data.title="Elefinder - Quản trị viên";
        res.render('home/index', {data});
    }
};
exports.signInGet = async (req,res,next) => {
    const data= {};
    data.user = req.user;
    console.log('redirect : '+req.query.redirect);
    if(data.user) {
        req.redirect('/')
    } else {
        data.title = 'Đăng nhập';
        res.render('home/signin', {data});
    }
};

exports.registerGet = (req,res) => {
    const data = {};
    data.user = req.user;
    if(req.user)
        res.redirect('/');
    else {
        res.render('home/signup', {title: 'Đăng ký',data})
    }
};

exports.signUpGet = async (req,res,next) => {
    const data= {};
    data.user = req.user;
    if(data.user) {
        req.redirect('/')
    } else {
        data.title = 'Đăng ký';
        res.render('home/signup', {data});
    }
};


exports.accountRecovery = (req,res,next) => {

};

exports.registerPost = async (req,res,next) => {
  const user = await userModel.get(req.body.email);

  const data = {};

  if(user) {
      data.cache = req.body;
      data.title= 'Đăng ký tài khoản';
      data.error = 'Địa chỉ email đã được sử dụng';
      return res.render('home/signup',data);
  }
    const newUser = {};
    newUser.firstName = req.body.firstName;
    newUser.lastName = req.body.lastName;
    newUser.email = req.body.email;
    newUser.password = req.body.password;
    newUser.address = req.body.address;
    newUser.city = req.body.city;
    newUser.country = req.body.country;
    newUser.phone = req.body.phone;
    const returnUser = await userModel.register(newUser);

    if(returnUser) {
        passport.authenticate('local', (err, newUser) => {
            req.logIn(newUser, (errLogIn) => {
                if (errLogIn) {
                    console.log('fail to login : '+ errLogIn);
                }
                return res.redirect('/');
            });
        })(req, res, next);
    }
    else {
        const data ={};
        data.cache = req.body;
        data.error = 'Xin lỗi, hệ thống không thể tạo tài khoản cho bạn, vui lòng thử lại :/';
        return res.render('home/signup',{title:'Elefind - Đăng ký tài khoản',data});
    }
};

exports.logout = (req,res) => {
    req.logout();
    res.redirect('/');
};