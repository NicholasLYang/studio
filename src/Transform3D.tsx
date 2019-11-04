import React from "react";
import withStyles, { WithStyles } from "react-jss";
import { RouteComponentProps } from "@reach/router";

const styles = {
  Transform3D: {
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  square: {
    width: "200px",
    height: "200px",
    backgroundColor: "orangered",
    translate3d: ""
  }
};

const Transform3D: React.FunctionComponent<
  WithStyles<typeof styles> & RouteComponentProps
> = ({ classes }) => {
  return (
    <div className={classes.Transform3D}>
      <div className={classes.square} />
    </div>
  );
};

export default withStyles(styles)(Transform3D);
