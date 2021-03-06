import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from 'modules/common/styles';
import { actions, selectors } from './ducks';
import Addresses from './addresses';
import Orders from './orders';
import Summary from './sumary';

const selectAddressAction = actions.selectAddress;
const addressIndexSelector = selectors.addressIndex;

const OrderPage = ({ addressIndex, selectAddress }) => (
  <div className={styles.w100}>
    <h6 className={`${styles.mt0} ${styles.colorSubTitle}`}>收货地址</h6>
    <Addresses
      onAddressSelected={(index, address) => selectAddress(index, address)}
      selectedIndex={addressIndex}
    />
    <h6 className={styles.colorSubTitle}>订单信息</h6>
    <Orders />
    <Summary />
  </div>
  );
OrderPage.propTypes = {
  addressIndex: PropTypes.number.isRequired,
  selectAddress: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({ addressIndex: addressIndexSelector(state) }),
  (dispatch) => bindActionCreators({ selectAddress: selectAddressAction }, dispatch),
)(OrderPage);

