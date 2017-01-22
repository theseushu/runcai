import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import { Card, CardTitle, CardMedia } from 'react-mdl/lib/Card';
import Button from 'react-mdl/lib/Button';
import IconButton from 'react-mdl/lib/IconButton';
import Tooltip from 'react-mdl/lib/Tooltip';
import styles, { breakpoints } from '../../common/styles';
import Avatar from '../../common/avatar';
import AvatarCropper from '../avatarCropper';
import Line from './line';
import Name from './name';
import Type from './type';
import Desc from './desc';

class Profile extends Component {
  static propTypes = {
    sheet: PropTypes.object,
    user: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = { activeTab: 0 };
  }
  render() {
    const { user: { profile: { type }, mobilePhoneNumber }, sheet: { classes } } = this.props;
    return (
      <div className={classes.content}>
        <Card shadow={2} style={{ width: '100%', margin: 'auto' }}>
          <CardTitle>
            <h2 className="mdl-card__title-text">{type === '微店店主' ? '店铺信息' : '个人信息'}</h2>
            <Tooltip label={<span>点击条目内容即可开始修改<br />您也可以点击图像更换新的头像</span>}>
              <IconButton colored name="help_outline"></IconButton>
            </Tooltip>
          </CardTitle>
          <CardMedia className={styles.contentCenter} style={{ background: 'none' }}>
            <div className={classes.avatar}>
              <Avatar />
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                <AvatarCropper />
              </div>
            </div>
          </CardMedia>
          <Line title="手机号" content={<Button colored>{mobilePhoneNumber}</Button>} />
          <Name />
          <Type />
          <Line title="修改密码" content={<Button colored>验证手机号码后开始</Button>} />
          <Desc />
        </Card>
      </div>
    );
  }
}

export default injectSheet({
  content: {
    flex: '1',
    marginLeft: 24,
    [breakpoints.mediaDestkopBelow]: {
      marginLeft: 0,
    },
  },
  avatar: {
    width: 100,
    height: 100,
    position: 'relative',
  },
})(Profile);