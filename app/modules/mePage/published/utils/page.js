import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import Link from 'react-router/lib/Link';
import FABButton from 'react-mdl/lib/FABButton';
import Icon from 'react-mdl/lib/Icon';
import { colors, breakpoints } from 'modules/common/styles';
import PageComponent from '../../page';
import Header from '../../header';

class Page extends Component { // eslint-disable-line
  static propTypes = {
    location: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    content: PropTypes.object.isRequired,
    title: PropTypes.object,
    editPath: PropTypes.string.isRequired,
    create: PropTypes.bool,
  }
  render() {
    const { location, content, create = true, title, editPath, classes, ...props } = this.props;
    return (
      <PageComponent
        location={location}
        header={<Header />}
        smallContent={false}
        {...props}
      >
        <div className={classes.content}>
          { title }
          <div className={classes.entries}>
            { create && <div className={classes.createButton}><Link to={`/${editPath}/new`}><FABButton accent><Icon name="add" /></FABButton></Link></div> }
            { content }
          </div>
        </div>
      </PageComponent>
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
  entries: {
    width: '100%',
    marginTop: 24,
    paddingTop: 24,
    position: 'relative',
    borderTop: `solid 1px ${colors.colorLightGrey}`,
  },
  createButton: {
    zIndex: 2,
    position: 'absolute',
    right: 16,
    top: -28,
  },
})(Page);
