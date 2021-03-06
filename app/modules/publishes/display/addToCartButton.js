import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Link from 'react-router/lib/Link';
import Button from 'react-mdl/lib/Button';
import success from 'modules/toastr/success';
import { publishTypesInfo } from 'funong-common/lib/appConstants';
import { currentUserSelector } from 'modules/data/ducks/selectors';
import { actions, selectors } from 'api/cart';

const { addItem } = actions;
const addCartItemStateSelector = selectors.addItem;

const ToastrLink = () => <Link to="/me/cart">去购物车</Link>;

const AddToCartButton = ({ currentUser, pending, addCartItem, type, entry, specIndex, quantity }, { router }) => {
  const info = publishTypesInfo[type];
  if (!info.saleType === 0) {
    return null;
  }
  return (
    <Button
      raised
      accent
      ripple
      disabled={pending || (info.shop ? entry.shop.owner.objectId === (currentUser && currentUser.objectId) : entry.owner.objectId === (currentUser && currentUser.objectId))}
      onClick={(e) => {
        e.preventDefault();
        if (currentUser) {
          addCartItem({
            type,
            publish: entry,
            quantity,
            specIndex,
            meta: {
              resolve: () => {
                const image = entry.thumbnail.thumbnail_80_80;
                success({
                  icon: <img role="presentation" width="70" height="70" src={image} />,
                  title: '加入成功',
                  message: '您可以在购物车中查看',
                  extra: <ToastrLink />,
                });
              },
            } });
        } else {
          router.push(`/login?message=请登录&redirect=${location.pathname}${location.search}`);
        }
      }}
    >加入购物车</Button>
  );
};

AddToCartButton.contextTypes = {
  router: PropTypes.object.isRequired,
};
AddToCartButton.propTypes = {
  currentUser: PropTypes.object,
  pending: PropTypes.bool,
  addCartItem: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  entry: PropTypes.object.isRequired,
  quantity: PropTypes.number,
  specIndex: PropTypes.number,
};

export default connect(
  (state) => ({ ...addCartItemStateSelector(state), currentUser: currentUserSelector(state) }),
  (dispatch) => bindActionCreators({ addCartItem: addItem }, dispatch),
)(AddToCartButton);
