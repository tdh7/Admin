const product = require('../model/product');
const categoryDb = require('../model/category');
const brandDb = require('../model/brand');
const Util = require('../helpers/util');
const FgBlue = "\x1b[34m";

const home = async function(req, res, next) {
    const data = {
        products: []
    };

    data.user = req.user;
    if (!req.user) {
        return res.redirect('/dang-nhap');
    }
    let category = req.query.danhmuc;
    if(category==='all') category = undefined;
    let brand = req.query.thuonghieu;

    let search = req.query.timkiem;



    data.search = search;
    data.category = category;

    if(search) data.title= "Kết quả tìm kiếm";
    if(brand&&category) data.title = "Sản phẩm thuộc danh mục <strong>"+category+"</strong>, và thương hiệu <strong>"+brand+"</strong>";
    else if(brand) data.title = "Sản phẩm thuộc thương hiệu <strong>"+brand+"</strong>";
    else if(category) data.title = "Sản phẩm thuộc danh mục <strong>"+category+"</strong>";
    else data.title ="Sản phẩm";
   // data.title = data.title.replace(/(<([^>]+)>)/ig,"");
    data.products = await product.search_product_by(category,brand,search);

    //else if(category) data.products = await product.query_by_category(category);
    //else data.products = await product.all();

    if(data.products)
        for(let i=0;i<data.products.length;i++)
            data.products[i].index = i+1;
    res.render('product/product_list', { title:'EleFind - Danh sách sản phẩm',data });
};
exports.home = home;

exports.product_detail = async (req,res,next) => {
    var category = req.params.category;
    var productId = req.params.productId;

    const data = {
        product
    };

    data.user = req.user;
    if (!req.user) {
        return res.redirect('/dang-nhap');
    }
    console.log(FgBlue,"receive category = " + category + ", product_id = " + productId);
    const result = await product.find_product_by_category_and_id(category,productId);
    console.log(FgBlue,"get result : category = "+result.category+", id = "+result.id);
    if(result) {
        data.product = result;
        if(data.product.image) data.product.image = Util.getOriginalImages(data.product.image);
        res.render('product/detail', {title: 'Elefinder - Danh sách sản phẩm', data});
    } else {
        res.render('error', { customStyleSheet:'stylesheets/error.css' });
    }
};
/**
 * Yêu cầu render trang form cập nhật/thêm mới một sản phẩm
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */

exports.request_edit_or_add_product = async (req, res, next) => {
    var category = req.params.category;
    var productId = req.params.productId;

    const data = {};
    data.user = req.user;
    if (!req.user) {
        return res.redirect('/dang-nhap');
    }
    if(category&&productId) {
        console.log(FgBlue,"receive category = " + category + ", product_id = " + productId);
        const result = await product.find_product_by_category_and_id(category,productId);
        if(result)
            console.log(FgBlue,"get result : category = "+result.category+", id = "+result.id);
        if(result) data.product = result;
    }
    if(data.product)
        data.autoId = data.product.id;
    else data.autoId = (await product.all()).length + 1;
    console.log(FgBlue,"autoId = "+data.autoId);

    data.categories = await categoryDb.all();
    data.brands = await brandDb.all();
    if(data.product)
        res.render('product/edit_product', {title: 'Elefinder - Cập nhật sản phẩm',pageheader:'Cập nhật sản phẩm', data});
    else
        res.render('product/edit_product', {title: 'Elefinder - Thêm mới sản phẩm',pageheader:'Thêm mới sản phẩm', data});

};
/**
 * Thực hiện cập nhật/thêm mới sản phẩm
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */

exports.update_product = async (req, res, next) => {
    const data = {};
    data.user = req.user;
    if (!req.user) {
        return res.redirect('/dang-nhap');
    }
    const p = req.body;
    if(p.id&&p.name&&p.category&&p.image&&p.starRate&&p.price&&p.brand) {

        data.id = p.id;
        data.name = p.name;
        data.category = p.category;
        const cateObject = await categoryDb.find_category(p.category);
        data.categoryName = cateObject.categoryName;
        data.image = p.image;
        data.brand = p.brand;
        data.description = p.description;
        data.price = p.price;
        data.oldPrice = p.oldPrice;
        data.starRate = p.starRate;
        data.count = p.count;
        data.labels = [];

        let stop = false;
        for (let i = 0; !stop; i++) {
            const label = {};
            label.tagClass = p['tagClass_' + i];
            label.title = p['title_' + i];
            if (label.tagClass) data.labels.push(label);
            else stop = true;
        };

        // try to get exist product
        const oldProduct = await product.find_product_by_category_and_id(data.category,data.id);
        let result ;
        if(oldProduct) result = await product.edit_product(oldProduct._id,data);
        else result = await product.add_product(data);
    }
    res.redirect('/san-pham');
};

exports.delete_product = async (req, res, next) => {
    const data = {};
    data.user = req.user;
    if (!req.user) {
        return res.redirect('/dang-nhap');
    }

    var category = req.params.category;
    var productId = req.params.productId;

    if(category&&productId) {
    let productObject = await product.find_product_by_category_and_id(category,productId);
    if(productObject) await product.delete(productObject._id);

}
    res.redirect('/san-pham');

};