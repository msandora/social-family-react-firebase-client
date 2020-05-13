import React, { Component } from "react";
import LazyLoad from "react-lazyload";
import PropTypes from "prop-types";
import axios from "axios";
// Mui
import Grid from "@material-ui/core/Grid";
// Components
import Scream from "../components/scream/Scream";
import StaticProfile from "../components/profile/StaticProfile";
import ScreamSkeleton from "../util/ScreamSkeleton";
import ProfileSkeleton from "../util/ProfileSkeleton";
import Spinner from "../util/Spinner";
// Redux
import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";

class User extends Component {
  state = {
    profile: null,
    postIdParam: null,
  };
  componentDidMount() {
    const handle = this.props.match.params.handle;
    const postId = this.props.match.params.postId;

    if (postId) this.setState({ postIdParam: postId });

    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        this.setState({
          profile: res.data.user,
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    const { screams, loading } = this.props.data;
    const { postIdParam } = this.state;

    const screamsMarkup = loading ? (
      <ScreamSkeleton />
    ) : screams === null ? (
      <p>No posts from this user</p>
    ) : !postIdParam ? (
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
      screams.map((scream) => {
        if (scream.postId !== postIdParam)
          return <Scream key={scream.postId} scream={scream} />;
        else return <Scream key={scream.postId} scream={scream} openDialog />;
      })
    );
    // console.log("screams", screams);

    return (
      <Grid container spacing={16}>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
        <Grid item sm={8} xs={12}>
          {screamsMarkup}
        </Grid>
      </Grid>
    );
  }
}

User.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getUserData })(User);
