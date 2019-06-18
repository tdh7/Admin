const product = require('../model/product');
const categoryDb = require('../model/category');
const FgBlue = "\x1b[34m";

const home = async function(req, res, next) {
    const data = {};
    data.user = req.user;
    if (!req.user) {
        return res.redirect('/dang-nhap');
    }

    data.categories = await categoryDb.all();

    if(data.categories)
        for(let i=0;i<data.categories.length;i++)
            data.categories[i].index = i+1;

    res.render('category/category_list', { title:'EleFind - Danh mục',data });
};

exports.home = home;

exports.detail = async (req,res,next) => {
    const data = {};
    data.user = req.user;
    if (!req.user) {
        return res.redirect('/dang-nhap');
    }
    var category = req.params.category;
    var productId = req.params.productId;

    console.log(FgBlue,"receive category = " + category + ", product_id = " + productId);
    const result = await product.find_product_by_category_and_id(category,productId);
    console.log(FgBlue,"get result : category = "+result.category+", id = "+result.id);
    if(result) {
        data.product = result;
        res.render('product/detail', {title: 'Elefinder - Danh sách sản phẩm', data});
    } else {
        res.render('error', { customStyleSheet:'stylesheets/error.css' });
    }
};
/**
 * Yêu cầu render trang form cập nhật/thêm mới một danh mục
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */

exports.request_edit_or_add = async (req, res, next) => {
    var category = req.params.category;

    const data = {};
    data.user = req.user;
    if (!req.user) {
        return res.redirect('/dang-nhap');
    }

    if(category) {
        console.log(FgBlue,"receive category = " + category);
        const result = await categoryDb.find_category(category);
        if(result)
            console.log(FgBlue,"get result : category = "+result.category+", id = "+result.id);
        if(result) data.category = result;
    }
    if(data.category)
        data.autoId = data.category.id;
    else {
        const arr =  await categoryDb.all();
        let tempId = 1;
        do {
            for (let i = 0; i < arr.length; i++) {
                if(arr[i].id==tempId) break;
                if(i==arr.length-1) {
                    data.autoId = tempId;
                    break;
                }
            }
            tempId++;
        } while(!data.autoId);
    }
    console.log(FgBlue,"autoId = "+data.autoId);

    if(data.category) {
        data.title = "Cập nhật danh mục";
        data.update = true;
    } else {
        data.title = "Thêm mới danh mục";
    }
    data.header="Danh mục";
    data.url="/danh-muc";
    data.urlSubmit ="/danh-muc/cap-nhat";

    res.render('category/edit', {title: 'Elefinder - '+data.title, data});
};
/**
 * Thực hiện cập nhật/thêm mới sản phẩm
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */

exports.update = async (req, res, next) => {
    const data = {};
    data.user = req.user;
    if (!req.user) {
        return res.redirect('/dang-nhap');
    }

    const p = req.body;
    if(p.id&&p.category&&p.categoryName&&p.count) {

        data.id = p.id;
        data.category = p.category;
        data.categoryName = p.categoryName;
        data.count = p.count;

        // try to get exist brand
        const old = await categoryDb.find_category_by_id(data.id)
        let result ;
        if(old) result = await categoryDb.edit(old._id,data);
        else result = await categoryDb.add(data);
    }
    res.redirect('/danh-muc');
};

exports.delete = async (req, res, next) => {
    const data = {};
    data.user = req.user;
    if (!req.user) {
        return res.redirect('/dang-nhap');
    }
    var category = req.params.category;

    if(category) {
        let object = await categoryDb.find_category(category);
        if(object) await categoryDb.delete(object._id);
    }
    res.redirect('/danh-muc');

};