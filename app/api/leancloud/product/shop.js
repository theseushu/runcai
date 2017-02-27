/*
 * important! do not deconstruct context. eg:
 * export default ({ AV, { token, profile }, updateContextProfile }) => {
 * ...
 * }
 * this object is mutable, deconstruction could cause latest value untouchable
 * wait until I figure out a better way
 */
import { shopProductToJSON } from '../converters';
const debug = require('debug')('app:api:supply');

export default ({ AV, context }) => {
  class ShopProduct extends AV.Object {}
  AV.Object.register(ShopProduct);

  const createShopProduct = async ({ category, species, name, specs, desc, images, labels, shop }) => {
    const { token: { sessionToken } } = context;
    try {
      const product = new ShopProduct();
      product.set('category', AV.Object.createWithoutData('Category', category.objectId));
      product.set('species', AV.Object.createWithoutData('Species', species.objectId));
      product.set('name', name);
      product.set('specs', specs);
      product.set('desc', desc);
      product.set('images', images.map((image) => AV.Object.createWithoutData('_File', image.id)));
      product.set('thumbnail', AV.Object.createWithoutData('_File', images[0].id));
      product.set('shop', AV.Object.createWithoutData('Shop', shop.objectId));
      product.set('labels', labels);
      const savedProduct = await product.save(null, {
        fetchWhenSave: true,
        sessionToken,
      });
      return { ...savedProduct.toJSON(), category, species, specs, shop, desc, images, thumbnail: images[0], labels };
    } catch (err) {
      debug(err);
      throw err;
    }
  };

  const updateShopProduct = async ({ objectId, category, species, name, specs, desc, images, labels }) => {
    const { token: { sessionToken } } = context;
    if (!objectId) {
      throw new Error('objectId is empty');
    }
    try {
      const product = AV.Object.createWithoutData('ShopProduct', objectId);
      if (category && category.objectId) {
        product.set('category', AV.Object.createWithoutData('Category', category.objectId));
      }
      if (species && species.objectId) {
        product.set('species', AV.Object.createWithoutData('Species', species.objectId));
      }
      if (name) {
        product.set('name', name);
      }
      if (specs) {
        product.set('specs', specs);
      }
      if (location && location.lnglat) {
        product.set('lnglat', new AV.GeoPoint(location.lnglat));
      }
      if (desc) {
        product.set('desc', desc);
      }
      if (images) {
        product.set('images', images.map((image) => AV.Object.createWithoutData('_File', image.id)));
        product.set('thumbnail', images.length > 0 ? AV.Object.createWithoutData('_File', images[0].id) : null);
      }
      if (labels != null) {
        product.set('labels', labels);
      }
      const savedProduct = await product.save(null, {
        fetchWhenSave: true,
        sessionToken,
      });
      return { ...savedProduct.toJSON(), category, species, specs, desc, images, thumbnail: images ? images[0] : null, labels };
    } catch (err) {
      debug(err);
      throw err;
    }
  };

  const fetchShopProduct = async ({ objectId }) => {
    const { token: { sessionToken } } = context;
    const product = await AV.Object.createWithoutData('ShopProduct', objectId)
      .fetch({
        include: ['images', 'thumbnail', 'category', 'species', 'shop', 'shop.thumbnail'],
      }, {
        sessionToken,
      });
    return product ? shopProductToJSON(product) : null;
  };

  const searchShopProducts = async ({ shop, available }) => {
    const query = new AV.Query('ShopProduct')
      .include(['images', 'thumbnail', 'category', 'species', 'shop', 'shop.thumbnail']);
    if (shop && shop.objectId) {
      query.equalTo('shop', AV.Object.createWithoutData('Shop', shop.objectId));
    }
    if (available != null) {
      query.equalTo('available', available);
    }
    query
      .limit(1000);
    const products = await query.find();

    return products.map(shopProductToJSON);
  };

  return {
    createShopProduct,
    updateShopProduct,
    fetchShopProduct,
    searchShopProducts,
  };
};
