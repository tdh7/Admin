const ObjectId = require('mongodb').ObjectId;
const { dbs } = require('../dbs');

exports.all = async() => {
    return await dbs.production.collection('category').find({}).toArray();
};

exports.find_category = async (category) => {
   const result =  await dbs.production.collection('category').find({category : category}).toArray();
       return result[0];
};

exports.find_category_by_id = async (id) => {
    const result =  await dbs.production.collection('category').find({id : id}).toArray();
    return result[0];
};

exports.edit = async (objectId,data) => {
    return await dbs.production.collection('category').update({_id: ObjectId(objectId)},data);
};

exports.delete = async (objectId) => {
    return await dbs.production.collection('category').deleteOne({_id:ObjectId(objectId)});
};
exports.add = async (data) => {
    return await dbs.production.collection('category').insertOne(data);
};