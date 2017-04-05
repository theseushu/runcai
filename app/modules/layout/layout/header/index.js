import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Link from 'react-router/lib/Link';
import { Header, HeaderRow, Navigation } from 'react-mdl/lib/Layout';
import IconButton from 'react-mdl/lib/IconButton';
import { colors, breakpoints } from 'modules/common/styles';
import { findRoutes } from '../utils';
import background from '../assets/header-bg.jpg';
import Container from '../container';
import DefaultHeader from './defaultHeader';
import User from './user';
import Chat from './chat';
import Cart from './cart';

const AppHeader = ({ classes, header, onSearch, sideMenu, onReturn }, { router }) => {
  let paddingClass = '';
  if (sideMenu && onReturn) {
    paddingClass = classes.padding128;
  } else if (sideMenu || onReturn) {
    paddingClass = classes.padding56;
  }
  return (
    <Header waterfall hideTop={false} className={classes.header}>
      <HeaderRow className={classes.main}>
        <Container className={`${classes.container} ${paddingClass}`}>
          <div style={{ position: 'relative', height: '100%' }}>
            {header || <DefaultHeader onSearch={onSearch} />}
            <div className={classes.buttons}>
              <Cart />
              <User />
              <Chat />
            </div>
          </div>
        </Container>
        {onReturn && (
          <div className={classes.returnButton} style={{ left: sideMenu ? 56 : 0 }}>
            <IconButton name="keyboard_backspace" onClick={onReturn} />
          </div>
        )}
      </HeaderRow>
      <HeaderRow className={classes.nav}>
        <Container className={classes.navContainer}>
          <Navigation className={classes.links}>
            { findRoutes(router).map((route, i) => <Link key={i} activeClassName={classes.activeLink} to={route.path}>{route.title}</Link>) }
          </Navigation>
        </Container>
      </HeaderRow>
    </Header>
  );
};

AppHeader.contextTypes = {
  router: PropTypes.object.isRequired,
};

AppHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  header: PropTypes.any,
  onSearch: PropTypes.func,
  sideMenu: PropTypes.array,
  onReturn: PropTypes.func,
};

export default injectSheet({
  header: {
    background: `url(${background})`,
    [breakpoints.mediaDestkopAbove]: {
      '& .mdl-layout__drawer-button': {
        display: 'none',
      },
    },
  },
  main: {
    position: 'relative',
    justifyContent: 'center',
    padding: 0,
    minHeight: 100,
    maxHeight: 100,
    '.is-compact &': {
      minHeight: 0,
    },
  },
  container: {
    position: 'relative',
    height: 100,
    '.is-compact &': {
      // background: `url(${logoHorizontal})`,
      height: 40,
    },
  },
  padding56: {
    [breakpoints.mediaDestkopBelow]: {
      paddingLeft: 56,
    },
  },
  padding128: {
    [breakpoints.mediaDestkopBelow]: {
      paddingLeft: 128,
    },
  },
  returnButton: {
    position: 'absolute',
    top: 0,
    width: 48,
    height: 48,
    margin: 4,
    textAlign: 'center',
    lineHeight: '48px',
    [breakpoints.mediaDestkopAbove]: {
      display: 'none',
    },
  },
  buttons: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    display: 'flex',
    height: '100%',
    alignItems: 'flex-end',
    '.is-compact &': {
      alignItems: 'center',
    },
  },
  account: {
    position: 'absolute',
    right: 16,
    bottom: 0,
  },
  nav: {
    height: 45,
    padding: 0,
    background: 'rgba(76,175,80, 0.08)',
    [breakpoints.mediaTabletBelow]: {
      display: 'none',
    },
  },
  navContainer: {
    padding: 0,
  },
  links: {
    height: '45px !important',
    display: 'flex',
    justifyContent: 'space-between',
    '& > .mdl-navigation__link': {
      flex: 1,
      textAlign: 'center',
      padding: 0,
      height: 42,
      lineHeight: '42px',
    },
  },
  activeLink: {
    borderBottom: `solid 3px ${colors.colorAccent}`,
  },
})(AppHeader);
