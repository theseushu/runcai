const thumbnailURL = function thumbnailURL(width, height, q, scaleToFit, f) {
  const url = this.attributes.url;
  if (!url) {
    throw new Error('Invalid url.');
  }
  if (!width || !height || width <= 0 || height <= 0) {
    throw new Error('Invalid width or height value.');
  }
  const quality = q || 100;
  if (quality <= 0 || quality > 100) {
    throw new Error('Invalid quality value.');
  }
  const fmt = f || 'png';
  const mode = scaleToFit ? 2 : 1;
  return `${url}?imageView/${mode}/w/${width}/h/${height}/q/${quality}/format/${fmt}`;
};

export const fileToJSON = (file) => {
  if (file.get('url')) {
    return {
      ...file.toJSON(),
      metaData: file.get('metaData'),
      thumbnail_50_50: thumbnailURL.bind(file)(50, 50, 100, false),
      thumbnail_160_160: thumbnailURL.bind(file)(160, 160, 100, false),
      thumbnail_300_300: thumbnailURL.bind(file)(300, 300, 100, true),
    };
  }
  return null;
};

export const supplyProductToJSON = (product) => {
  const avCategory = product.get('category');
  const category = avCategory ? { ...avCategory.toJSON(), catalog: avCategory.get('catalog').toJSON() } : null;

  const avSpecies = product.get('species');
  const species = avSpecies ? { ...avSpecies.toJSON(), category } : null;

  const address = product.get('address') || null;

  const lnglat = product.get('lnglat').toJSON() || null;

  const avDesc = product.get('desc');
  const desc = avDesc ? { ...avDesc, images: avDesc.images ? avDesc.images.map(fileToJSON) : [] } : null;

  const specs = product.get('specs') || null;

  const avOwner = product.get('owner');
  const owner = avOwner ? avOwner.toJSON() : null;

  const avThumbnail = product.get('thumbnail');
  const thumbnail = avThumbnail ? fileToJSON(avThumbnail) : null;

  const labels = product.get('labels') || null;

  return {
    ...product.toJSON(),
    category,
    species,
    location: { address, lnglat },
    specs,
    desc,
    owner,
    thumbnail,
    labels,
    updatedAt: product.getUpdatedAt().getTime(),
    createdAt: product.getCreatedAt().getTime(),
  };
};

export const logisticsToJSON = (logistics) => {
  const address = logistics.get('address') || null;

  const lnglat = logistics.get('lnglat').toJSON() || null;

  const avDesc = logistics.get('desc');
  const desc = avDesc ? { ...avDesc, images: avDesc.images ? avDesc.images.map(fileToJSON) : [] } : null;

  const avOwner = logistics.get('owner');
  const owner = avOwner ? avOwner.toJSON() : null;

  const avThumbnail = logistics.get('thumbnail');
  const thumbnail = avThumbnail ? fileToJSON(avThumbnail) : null;

  const labels = logistics.get('labels') || null;

  return {
    ...logistics.toJSON(),
    location: { address, lnglat },
    desc,
    owner,
    thumbnail,
    labels,
    updatedAt: logistics.getUpdatedAt().getTime(),
    createdAt: logistics.getCreatedAt().getTime(),
  };
};
