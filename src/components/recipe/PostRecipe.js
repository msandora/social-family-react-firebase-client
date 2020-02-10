import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

// MUI Stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

// Redux stuff
import { connect } from 'react-redux';
import { postRecipe, clearErrors } from '../../redux/actions/dataActions';
import { Card, CardContent } from '@material-ui/core';

const styles = (theme) => ({
  ...theme,
  submitButton: {
    position: 'relative',
    float: 'right',
    marginTop: 10
  },
  progressSpinner: {
    position: 'absolute'
  },
	card: {
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		marginBottom: 10
  },
  cardContent: {
    paddingBottom: 16
  }
});

class PostRecipe extends Component {
  state = {
    body: '',
    errors: {}
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors
      });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: '', errors: {} });
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.postRecipe({ body: this.state.body });
  };
  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading }
    } = this.props;

    return (
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
        <form onSubmit={this.handleSubmit}>
        <TextField
          name="body"
          type="text"
          label="Say Something..."
          multiline
          rows="3"
          placeholder="What is on your mind?"
          error={errors.body ? true : false}
          helperText={errors.body}
          className={classes.textField}
          onChange={this.handleChange}
          fullWidth
        />
        <Button type="submit"
        variant="contained"
        color="primary"
        className={classes.submitButton}
        disabled={loading} onClick={this.handleSubmit}>
          Submit
          {loading && (
            <CircularProgress
              size={30}
              className={classes.progressSpinner}
            />
          )}
        </Button>
        </form>
        </CardContent>
      </Card>
    );
  }
}

PostRecipe.propTypes = {
  postRecipe: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  UI: state.UI
});

export default connect(
  mapStateToProps,
  { postRecipe, clearErrors }
)(withStyles(styles)(PostRecipe));
