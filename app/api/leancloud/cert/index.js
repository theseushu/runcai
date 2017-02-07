import { certToJSON } from '../converters';
const debug = require('debug')('app:api:certs');

export default ({ AV, context: { token: { sessionToken }, profile } }) => {
  class Cert extends AV.Object {}
  AV.Object.register(Cert);

// TODO deal with empty catalogType
  const searchMyCerts = () => new AV.Query('Cert')
    .equalTo('owner', AV.Object.createWithoutData('Profile', profile.objectId))
    .include(['images'])
    .find({ sessionToken })
    .then((certs) => certs.map(certToJSON));

  const createCert = async (attrs) => {
    const cert = new Cert();
    cert.set('owner', AV.Object.createWithoutData('Profile', profile.objectId));
    const attributes = { ...attrs };
    if (attrs.images) {
      attributes.images = attrs.images.map((image) => AV.Object.createWithoutData('_File', image.id));
    }
    const requestParams = { sessionToken };
    const saved = await cert.save(attributes, requestParams);
    return { ...saved.toJSON(), ...attrs };
  };

  const updateCert = async ({ objectId, ...attrs }) => {
    try {
      const certs = AV.Object.createWithoutData('Cert', objectId);
      const attributes = { ...attrs };
      if (attrs.images) {
        attributes.images = attrs.images.map((image) => AV.Object.createWithoutData('_File', image.id));
      }
      const { updateAt } = certs.save(attributes, { sessionToken });
      return { ...attrs, objectId, updateAt };
    } catch (err) {
      debug(err);
      throw err;
    }
  };

  return {
    searchMyCerts,
    createCert,
    updateCert,
  };
};