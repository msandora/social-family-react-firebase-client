import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

import Scream from '../components/scream/Scream';
import Profile from '../components/profile/Profile';
import ScreamSkeleton from '../util/ScreamSkeleton';
import PostScream from	'../components/scream/AddScream';

import { connect } from 'react-redux';
import { getScreams } from '../redux/actions/dataActions';

class Home extends Component {
  componentDidMount() {
    this.props.getScreams();
  }
  render() {
    const { screams, loading } = this.props.data;
    let recentScreamsMarkup = !loading ? (
      screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
    ) : (
      <ScreamSkeleton />
    );
    const { authenticated } = this.props;

    return (
      <Grid container spacing={16}>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
        <Grid item sm={8} xs={12}>
          {authenticated ? (
            <PostScream/>
            ) : ( null )
          }
          {recentScreamsMarkup}
        </Grid>
      </Grid>
    );
  }
}

Home.propTypes = {
  getScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data,
  authenticated: state.user.authenticated
});

export default connect(
  mapStateToProps,
  { getScreams }
)(Home);
