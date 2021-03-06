import React, { Component, PropTypes } from 'react';
import _without from 'lodash/without';
import { Card, CardTitle, CardText } from 'react-mdl/lib/Card';
import injectSheet from 'react-jss';
import IconButton from 'react-mdl/lib/IconButton';
import { List, ListItem, ListItemContent, ListItemAction } from 'react-mdl/lib/List';
import Menu, { MenuItem } from 'react-mdl/lib/Menu';
import FormIconButton from 'modules/common/formElements/iconButton';
import { formatPrice } from 'funong-common/lib/utils/displayUtils';
import { colors } from 'modules/common/styles';
import moduleStyles from '../../moduleStyles';
import SpecDialog from './dialog';

class Specs extends Component {
  static propTypes = {
    input: PropTypes.shape({
      value: PropTypes.array.isRequired,
      onChange: PropTypes.func.isRequired,
    }).isRequired,
    meta: PropTypes.object,
    useMinimum: PropTypes.bool,
    selector: PropTypes.bool,
    specs: PropTypes.array,
    classes: PropTypes.object,
  }
  constructor(props) {
    super(props);
    this.state = { editingIndex: null };
  }

  hideDialog = (e) => {
    if (e) {
      e.preventDefault();
    }
    this.setState({ editingIndex: null });
  }

  addSpec = () => {
    const { input: { value } } = this.props;
    this.setState({ editingIndex: value.length });
  }

  editSpec = (index) => {
    this.setState({ editingIndex: index });
  }

  saveSpec = (spec) => {
    const { input: { value, onChange } } = this.props;
    const { editingIndex } = this.state;
    const specs = [...value];
    specs[editingIndex] = spec;
    onChange(specs);
    this.setState({ editingIndex: null });
  }

  removeSpec = (spec) => {
    const { input: { value, onChange } } = this.props;
    onChange(_without(value, spec));
  }

  render() {
    const { input: { value, onChange }, meta: { error }, useMinimum, selector, specs, classes } = this.props; // eslint-disable-line
    const { editingIndex } = this.state;
    return (
      <Card shadow={1} className={classes.card}>
        <CardTitle>
          规格
        </CardTitle>
        <CardText>
          {value.length > 0 && (
            <List className={classes.list}>
              {
                value.map((spec, i) => (
                  <ListItem key={i} threeLine>
                    <ListItemContent
                      subtitle={spec.params.join(', ')}
                    ><span>{spec.name}<small> {formatPrice(spec, useMinimum)}</small></span></ListItemContent>
                    <ListItemAction>
                      <IconButton name="edit" onClick={(e) => { e.preventDefault(); this.editSpec(i); }} />
                      { !selector && <IconButton name="delete_sweep" onClick={(e) => { e.preventDefault(); this.removeSpec(spec); }} /> }
                    </ListItemAction>
                  </ListItem>
                ))
              }
            </List>
          )
          }
        </CardText>
        { !selector && (
          <FormIconButton
            error={error}
            name="add_circle" ripple onClick={(e) => { e.preventDefault(); this.addSpec(); }}
          />
        )}
        { selector && specs.length > 1 && (
          <div className={classes.specSelector}>
            <small>其它规格</small>
            <IconButton name="more_vert" id={'_form_spec_menu'} onClick={(e) => { e.preventDefault(); }} />
            <Menu target={'_form_spec_menu'} align="right">
              {specs.map((s, i) => <MenuItem
                key={i}
                onClick={() => onChange([{ ...s, name: '默认' }])}
              >{s.name}</MenuItem>)}
            </Menu>
          </div>
        )}
        {
          editingIndex !== null && (
            <SpecDialog
              isDefault={editingIndex === 0}
              spec={value[editingIndex]}
              close={this.hideDialog}
              useMinimum={useMinimum}
              onSubmit={this.saveSpec}
            />
          )
        }
      </Card>
    );
  }
}

export default injectSheet({
  ...moduleStyles,
  list: {
    margin: 0,
    padding: 0,
    '& > li': {
      height: 56,
      padding: 0,
      marginBottom: 8,
      borderBottom: `solid 1px ${colors.colorLightGrey}`,
    },
  },
  specSelector: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
})(Specs);
