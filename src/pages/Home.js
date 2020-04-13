import React, { Component } from "react";
import LazyLoad from "react-lazyload";
import PropTypes from "prop-types";
// Mui
import Grid from "@material-ui/core/Grid";
// Components
import Scream from "../components/scream/Scream";
import Profile from "../components/profile/Profile";
import ScreamSkeleton from "../util/ScreamSkeleton";
import Spinner from "../util/Spinner";
import PostScream from "../components/scream/PostScream";
// Redux
import { connect } from "react-redux";
import { getScreams } from "../redux/actions/dataActions";

class Home extends Component {
  componentDidMount() {
    this.props.getScreams();
  }
  render() {
    const isMobile = window.innerWidth <= 500;
    const { screams, loading } = this.props.data;
    const { authenticated } = this.props;

    let recentScreamsMarkup = !loading ? (
      screams.map((scream) => (
        <LazyLoad
          key={scream.postId}
          height={100}
          offset={[-100, 100]}
          placeholder={<Spinner />}
        >
          <div className='post'>
            <Scream scream={scream} />
          </div>
        </LazyLoad>
      ))
    ) : (
      <ScreamSkeleton />
    );

    return (
      <Grid container spacing={16}>
        <Grid item sm={4} xs={12}>
          {!isMobile ? <Profile /> : null}

          {authenticated ? <PostScream /> : null}
        </Grid>
        <Grid item sm={8} xs={12}>
          {recentScreamsMarkup}
        </Grid>
      </Grid>
    );
  }
}

Home.propTypes = {
  getScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps, { getScreams })(Home);
