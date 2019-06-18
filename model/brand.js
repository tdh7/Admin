const ObjectId = require('mongodb').ObjectId;
const { dbs } = require('../dbs');

const BANDS = 'brands';

exports.all = async() => {
    return await dbs.production.collection(BANDS).find({}).toArray();
};

exports.find_brand_by_displayName = async (displayName) => {
    return (await dbs.production.collection(BANDS).find({displayName : displayName}).toArray())[0];
};

exports.find_brand_by_id = async (id) => {
    return (await dbs.production.collection(BANDS).find({id : id}).toArray())[0];
};
exports.add = async (data) => {
    return await dbs.production.collection(BANDS).insertOne(data);
};

exports.edit = async (objectId,data) => {
    return await dbs.production.collection(BANDS).update({_id: ObjectId(objectId)},data);
};

exports.delete = async (objectId) => {
    return await dbs.production.collection(BANDS).deleteOne({_id:ObjectId(objectId)});
};

exports.delete_by_display_name = async (brand) => {
    return await dbs.production.collection(BANDS).deleteOne({displayName:brand});
};