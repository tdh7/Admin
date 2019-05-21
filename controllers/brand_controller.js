const product = require('../model/product');
const categoryDb = require('../model/category');
const brandDb = require('../model/brand');
const FgBlue = "\x1b[34m";

const home = async function(req, res, next) {
    const data = {};
    data.list = await brandDb.all();
    data.rows = ["index","id","name","displayName"];
    data.rowNames =["Số thứ tự","ID","Tên thương hiệu","Tên hiển thị"];
    data.add = {};
    data.add.url = '/thuong-hieu/them';
    data.add.title='Thêm thương hiệu';
    data.title='Tất cả thương hiệu';
    data.url = '/thuong-hieu';
    data.option = true;
    if(data.list)
        for(let i=0;i<data.list.length;i++) {
            data.list[i].index = i + 1;
            const button_detail = {url:'/san-pham?thuonghieu='+data.list[i].displayName,title:'Xem sản phẩm của thương hiệu này',class:'fa fa-eye',color:'yellow'};
            const button_edit = {url:'/thuong-hieu/sua-thong-tin-'+data.list[i].displayName,title:'Sửa thông tin thương hiệu',class:'fa fa-pen-square',color:'blue'};
            const button_delete = {url:'/thuong-hieu/xac-nhan-xoa-'+data.list[i].displayName,title:'Sửa thông tin thương hiệu',class:'fa fa-trash-alt',color:'red'};

            data.list[i].options =[button_detail,button_edit,button_delete];
        }

    res.render('list', { title:'EleFind - Danh sách sản phẩm',data });
};

exports.home = home;

exports.detail = async (req,res,next) => {
    var category = req.params.category;
    var productId = req.params.productId;

    const data = {
        product
    };
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
 * Yêu cầu render trang form cập nhật/thêm mới một sản phẩm
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */

exports.request_edit_or_add = async (req, res, next) => {
   var brand = req.params.brand;

    const data = {};

    if(brand) {
        console.log(FgBlue,"receive brand = " + brand);
        const result = await brandDb.find_brand_by_displayName(brand);
        if(result)
            console.log(FgBlue,"get result : brand = "+result.name+", id = "+result.id);
        if(result) data.brand = result;
    }
    if(data.brand)
        data.autoId = data.brand.id;
    else {
        const arr =  await brandDb.all();
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

    if(data.brand) {
        data.title = "Cập nhật thương hiệu";
        data.update = true;
    } else {
        data.title = "Thêm mới thương hiệu";
    }
    data.header="Thương hiệu";
    data.url="/thuong-hieu";
    data.urlSubmit ="/thuong-hieu/cap-nhat";

        res.render('brand/edit', {title: 'Elefinder - '+data.title, data});


};
/**
 * Thực hiện cập nhật/thêm mới sản phẩm
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */

exports.update = async (req, res, next) => {
    const p = req.body;
    if(p.id&&p.name&&p.displayName) {
        const data = {};
        data.id = p.id;
        data.name = p.name;
        data.displayName = p.displayName;

        // try to get exist brand
        const old = await brandDb.find_brand_by_displayName(data.displayName);
        let result ;
        if(old) result = await brandDb.edit(old._id,data);
        else result = await brandDb.add(data);
    }
    res.redirect('/thuong-hieu');
};

exports.delete = async (req, res, next) => {
    var brand = req.params.brand;

    if(brand) {
        let productObject = await brandDb.find_brand_by_displayName(brand);
        if(productObject) await brandDb.delete(productObject._id);
    }
    res.redirect('/thuong-hieu');

};