import React, { PropTypes, Component } from 'react';
import { findDOMNode } from 'react-dom';
import injectSheet from 'react-jss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Layout, Header, Drawer, Content } from 'react-mdl/lib/Layout';
import IconButton from 'react-mdl/lib/IconButton';
import { breakpoints } from 'modules/common/styles';
import { actions as dialogActions, selectors as dialogSelectors } from './ducks/dialog';
import { actions as dataActions } from './ducks/data';
import List from './components/list';
import Title from './components/title';
import Messages from './components/messages';
import Input from './components/input';

class Chat extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    dialog: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
  }
  componentWillReceiveProps({ dialog: { open, user } }) {
    // if the dialog was closed, to be opened, there's no user (no conversation) to be entered, and screen width is small
    if (!this.props.dialog.open && open && !user && process.env.browser && window.matchMedia(('(max-width: 1023px)')).matches) {
      this.shallOpenDrawer = true;
    } else {
      this.shallOpenDrawer = false;
    }
  }
  componentDidUpdate() {
    if (this.shallOpenDrawer) {
      const drawerButton = findDOMNode(this.node).getElementsByClassName('mdl-layout__drawer-button')[0]; // eslint-disable-line
      drawerButton.click();
    }
  }
  render() {
    const { dialog: { open, user }, onClose, classes } = this.props;
    return open ? (
      <div
        ref={(node) => { this.node = node; }}
        className={`${classes.chat} shadow--3 material-transition`}
      >
        <Layout fixedHeader fixedDrawer>
          <Header
            className={classes.header}
            title={<Title user={user} />}
          >
            <IconButton name="close" onClick={onClose} />
          </Header>
          <Drawer title={<span>联系人</span>}>
            <List />
          </Drawer>
          <Content className={classes.content}>
            <Messages />
            <Input />
          </Content>
        </Layout>
      </div>
    ) : null;
  }
}

const setCurrentConversation = dataActions.setCurrentConversation;
const closeDialogAction = dialogActions.closeDialog;
const dialogStateSelector = dialogSelectors.dialog;

export default injectSheet({
  chat: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'fixed',
    // above styles are used to center div in screen
    width: 850,
    height: 500,
    maxHeight: '100vh',
    backgroundColor: 'white',
    zIndex: 1000002,
    [breakpoints.mediaSmallScreen]: {
      width: '100vw',
      height: '100vh',
    },
  },
  header: {
    background: 'rgba(76,175,80, 0.08)',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
})(connect(
  (state) => ({ dialog: dialogStateSelector(state) }),
  (dispatch) => {
    const actions = bindActionCreators({ closeDialog: closeDialogAction, setCurrentConversation }, dispatch);
    return {
      onClose: () => {
        actions.closeDialog();
        actions.setCurrentConversation(null);
      },
    };
  },
)(Chat));
