import { Schema, arrayOf } from 'normalizr';

export const UserSchema = new Schema('users', {
  idAttribute: 'objectId',
});
export const UsersSchema = arrayOf(UserSchema);

export const ShopSchema = new Schema('shops', {
  idAttribute: 'objectId',
});
ShopSchema.define({
  owner: UserSchema,
});
export const ShopsSchema = arrayOf(ShopSchema);

export const CategorySchema = new Schema('categories', {
  idAttribute: 'objectId',
});

export const CategoriesSchema = arrayOf(CategorySchema);

export const SpeciesSchema = new Schema('species', {
  idAttribute: 'objectId',
});
SpeciesSchema.define({
  category: CategorySchema,
});
export const SpeciesArraySchema = arrayOf(SpeciesSchema);

export const SpecificationSchema = new Schema('specifications', {
  idAttribute: 'objectId',
});
SpecificationSchema.define({
  species: SpeciesSchema,
});
export const SpecificationsSchema = arrayOf(SpecificationSchema);

export const ShopProductSchema = new Schema('shopProducts', {
  idAttribute: 'objectId',
});
ShopProductSchema.define({
  shop: ShopSchema,
  species: SpeciesSchema,
  specifications: SpecificationsSchema,
});
export const ShopProductsSchema = arrayOf(ShopProductSchema);

export const SupplyProductSchema = new Schema('supplyProducts', {
  idAttribute: 'objectId',
});
SupplyProductSchema.define({
  owner: UserSchema,
  species: SpeciesSchema,
  category: CategorySchema,
});
export const SupplyProductsSchema = arrayOf(SupplyProductSchema);

export const LogisticsProductSchema = new Schema('logisticsProducts', {
  idAttribute: 'objectId',
});
LogisticsProductSchema.define({
  owner: UserSchema,
});
export const LogisticsProductsSchema = arrayOf(LogisticsProductSchema);


export const CertSchema = new Schema('certs', {
  idAttribute: 'objectId',
});
CertSchema.define({
  owner: UserSchema,
});
export const CertsSchema = arrayOf(CertSchema);


export const CartItemSchema = new Schema('cartItems', {
  idAttribute: 'objectId',
});
CartItemSchema.define({
  shopProduct: ShopProductSchema,
  supplyProduct: SupplyProductSchema,
  owner: UserSchema,
});
export const CartItemsSchema = arrayOf(CartItemSchema);
