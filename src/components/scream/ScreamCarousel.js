import React, { Component, Fragment } from "react";
import Carousel from 'react-material-ui-carousel'
import Paper from "@material-ui/core/Paper";
import CardContent from "@material-ui/core/CardContent";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({
  ...theme
});

class ScreamCarousel extends Component {
  render() {
    const {       
      classes, images
    } = this.props;
    

    let recentScreamImages = images ? (
      <CardContent className={classes.cardImages} style={{ textAlign: 'center' }}>
        <Carousel>
        {images.map((image, i) => (
          <img key={i} src={image} alt={i} style={{ maxHeight: 330 }}/>
        ))}
        </Carousel>
      </CardContent>
    ) : null;

    return (
      <Fragment>
        <CardContent className={classes.cardImages}>
          {recentScreamImages}
        </CardContent>
      </Fragment>
    );
  }
}

export default withStyles(styles)(ScreamCarousel);
