import React from "react";
import { RouteComponentProps } from "@reach/router";
import withStyles, { WithStyles } from "react-jss";

const styles = {
  HomePage: {
    padding: "20px"
  }
};
const HomePage: React.FunctionComponent<
  RouteComponentProps & WithStyles<typeof styles>
> = ({ classes }) => {
  return (
    <div className={classes.HomePage}>
      {" "}
      Click on the links to select a design
    </div>
  );
};

export default withStyles(styles)(HomePage);
