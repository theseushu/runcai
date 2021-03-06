import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';

const HelmetComponent = ({ title, meta = [], script = [] }) => (
  <Helmet
    title={title}
    meta={[
        { name: 'Keywords', content: '富农商城 农产品' },
      { name: 'Description', content: '富农商城作为专业的线上农产品批发交易市场,用户不仅可以在平台上免费发布农产品供求信息,了解中国农产品价格行情,进行农产品批发和农产品交易,农产品加盟。买卖农产品就上富农商城。' },
      ...meta,
    ]}
    script={script}
  >
  </Helmet>
);
HelmetComponent.propTypes = {
  title: PropTypes.string.isRequired,
  meta: PropTypes.array,
  script: PropTypes.array,
};

export default HelmetComponent;
