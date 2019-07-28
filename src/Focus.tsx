import React, { useEffect, useState } from "react";
import Circle from "./Circle";
import { RouteComponentProps } from "@reach/router";
import withStyles, { WithStyles } from "react-jss";

const styles = {
  Focus: {
    width: "100vw",
    height: "100vh",
    position: "relative"
  },
  focusText: {
    transition: "font-size 1s"
  }
};
const Focus: React.FunctionComponent<
  RouteComponentProps & WithStyles<typeof styles>
> = ({ classes }) => {
  const [isFocused, setFocused] = useState(false);
  useEffect(() => {
    const id = setInterval(() => {
      setFocused(!isFocused);
    }, 2000);
    return () => clearInterval(id);
  });
  if (isFocused) {
    return (
      <div className={classes.Focus}>
        <Circle color={"#f4faff"} radius={50} />
        <Circle color={"#86bbd8"} radius={36} />
        <Circle color={"#048ba8"} radius={16} />
        <Circle color={"#33658a"} radius={4}>
          <div style={{ fontSize: "0.75rem" }} className={classes.focusText}>
            Focus
          </div>
        </Circle>
      </div>
    );
  }
  return (
    <div className={classes.Focus}>
      <Circle color={"#f4faff"} radius={50} />
      <Circle color={"#86bbd8"} radius={30} />
      <Circle color={"#048ba8"} radius={20} />
      <Circle color={"#33658a"} radius={10}>
        <div style={{ fontSize: "2rem" }} className={classes.focusText}>
          Focus
        </div>
      </Circle>
    </div>
  );
};

export default withStyles(styles)(Focus);
