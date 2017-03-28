import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { Card, CardTitle, CardText, CardActions } from 'react-mdl/lib/Card';
import styles from 'modules/common/styles';
import { MainRight } from 'modules/common/layout/content';
import UserCard from 'modules/common/user/card';
import DescCard from 'modules/common/desc/card';
import Info from './info';
import BidButton from './bidButton';
import MyBids from './myBids';
import Bids from './bids';

const Display = ({ inquiry, classes }) => (
  <MainRight
    main={
      <div>
        <div className={classes.header}>
          <div className={classes.info}>
            <Card shadow={2}>
              <CardTitle>{`[采购]${inquiry.name}`}</CardTitle>
              <CardText className={styles.w100}>
                <Info inquiry={inquiry} />
              </CardText>
              <CardActions>
                <div className={classes.actions}>
                  <BidButton inquiry={inquiry} />
                </div>
              </CardActions>
            </Card>
            <MyBids inquiry={inquiry} />
            <Bids inquiry={inquiry} />
            <DescCard desc={inquiry.desc} />
          </div>
          <div className={classes.owner}>
            <UserCard user={inquiry.owner} />
          </div>
        </div>
      </div>
    }
    right={<div />}
  />
);
Display.propTypes = {
  inquiry: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default injectSheet({
  header: {
    display: 'flex',
  },
  info: {
    flex: 1,
    marginRight: 24,
    '& > div': {
      width: '100%',
    },
  },
  owner: {
    width: 200,
  },
  actions: {
    width: '100%',
    display: 'flex',
  },
  bid: {
    width: 100,
  },
})(Display);