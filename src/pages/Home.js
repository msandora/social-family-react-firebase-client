import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
// Components
import Scream from '../components/scream/Scream';
import Profile from '../components/profile/Profile';
import ScreamSkeleton from '../util/ScreamSkeleton';
import PostScream from	'../components/scream/PostScream';
// Redux
import { connect } from 'react-redux';
import { getScreams } from '../redux/actions/dataActions';

class Home extends React.Component {
  componentDidMount() {
    this.props.getScreams();
  }
  render() {
    const isMobile = window.innerWidth <= 500;
    const { screams, loading } = this.props.data;
    let recentScreamsMarkup = !loading ? (
      screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
    ) : (
      <ScreamSkeleton />
    );
    const { authenticated } = this.props;

    return (
      <Fragment>
        <Grid container spacing={16}>
				{(!isMobile) ?
				<Grid item sm={4} xs={12}>
            <Profile />
				</Grid>
				: (null) }
        <Grid item sm={8} xs={12}>
          {authenticated ? (
            <PostScream/>
            ) : ( null )
          }
          {recentScreamsMarkup}
        </Grid>
      </Grid>
      </Fragment>
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
