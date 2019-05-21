const ObjectId = require('mongodb').ObjectId;
const { dbs } = require('../dbs');

exports.all = async() => {
    return await index.find({}).toArray();
};

exports.get_top_categories = async () => {
    const obj = (await dbs.production.collection('index').find({name:'top_categories'}).toArray())[0];
    return obj.categories;
};

exports.get_products_sections = async () => {
  const obj = (await dbs.production.collection('index').find({name:'products_sections'}).toArray())[0];
  return obj.sections;
};

exports.set_products_sections = async (sections) => {
   return await dbs.production.collection('index').save({name:'products_sections',sections:sections});
};

exports.set_top_categories_sections = async (categories) => {
   return await dbs.production.collection('index').save({name:top_categories,categories: categories});
};