import React from "react";
import { RouteComponentProps } from "@reach/router";
import { createUseStyles } from "react-jss";

const styles = {
  HomePage: {
    padding: "20px"
  }
} as const;
const useStyles = createUseStyles(styles);

const HomePage: React.FunctionComponent<RouteComponentProps> = () => {
  const classes = useStyles();
  return (
    <div className={classes.HomePage}>
      Click on the links to select a design
    </div>
  );
};

export default HomePage;
