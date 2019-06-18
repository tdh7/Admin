const product = require('../model/product');
const categoryDb = require('../model/category');
const brandDb = require('../model/brand');
const indexMakerDb = require('../model/index_maker');
const FgBlue = "\x1b[34m";

const home = async function(req, res, next) {
    const data = {};
    data.user = req.user;
    if (!req.user) {
        return res.redirect('/dang-nhap');
    }

    const top_categories = await indexMakerDb.get_top_categories();
    const sections = await indexMakerDb.get_products_sections();

    if(top_categories) data.top_categories = top_categories;
    if(sections) data.sections = sections;

    data.title="Thiết lập bố cục";
    data.header="Thiết lập bố cục";
    data.url="/thiet-lap-bo-cuc";
    data.urlSubmit ="/thiet-lap-bo-cuc/cap-nhat";

    res.render('layouts/index_maker', { title:'EleFind - Thiết lập bố cục',data });
};

exports.home = home;
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
    if(p.id&&p.name&&p.displayName) {

        data.id = p.id;
        data.name = p.name;
        data.displayName = p.displayName;

        // try to get exist brand
        const old = await brandDb.find_brand_by_displayName(data.displayName);
        let result ;
        if(old) result = await brandDb.edit(old._id,data);
        else result = await brandDb.add(data);
    }
    res.redirect('/thiet-lap-bo-cuc');
};
