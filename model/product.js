
const ObjectId = require('mongodb').ObjectId;
const { dbs } = require('../dbs');
const PRODUCTS = 'products';
function productCollection() {
    return dbs.production.collection(PRODUCTS);
}

exports.find_product_by__object_id = async (id) => {
    const results = await dbs.production.collection(PRODUCTS).find({_id: ObjectId(id)})
        .toArray();
    return results[0];
};

exports.search_by_name = async (search) => {
    return await dbs.production.collection(PRODUCTS).find({name: {$regex: search, $options: "$i"}}).toArray();
};

exports.search_product_by = async (category,brand,search) => {
    const query = {};
    if(category) query.category = category;
    if(brand) query.brand = brand;
    if(search) query.name = {$regex:search,$option: "$i"};
    return await dbs.production.collection(PRODUCTS).find(query).toArray();
};

exports.find_product_by = async (category, brand) => {
    const query = {};
    if(category) query.category = category;
    if(brand) query.brand = brand;
    return await dbs.production.collection(PRODUCTS).find(query).toArray();
};

exports.search_by_category_and_name = async(category, search) => {
    return await dbs.production.collection(PRODUCTS).find({category: category, name: {$regex: search, $options: "$i"}}).toArray();
};

exports.find_product_by_category_and_id = async (category, productId) => {
    const  result = await  dbs.production.collection(PRODUCTS).find({id:productId})
        .toArray();
    return result[0];
};

exports.find_product_by_id = async (productId) => {
    const  result = await dbs.production.collection(PRODUCTS).find({id:productId})
        .toArray();
    return result[0];
};

const all = async() => {
    return await dbs.production.collection(PRODUCTS).find({}).toArray();
};

exports.query_by_category = async (category) => {
    return await dbs.production.collection(PRODUCTS).find({category: category}).toArray();
};

exports.add_product = async (data) => {
    return await dbs.production.collection(PRODUCTS).insertOne(data);
};

exports.edit_product = async (objectId,data) => {
    return await dbs.production.collection(PRODUCTS).update({_id: ObjectId(objectId)},data);
};

exports.delete = async (objectId) => {
    return await dbs.production.collection(PRODUCTS).deleteOne({_id:ObjectId(objectId)});
};
exports.all = all;