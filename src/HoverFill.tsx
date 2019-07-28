import React, { MouseEvent, useState } from "react";
import Circle from "./Circle";
import { RouteComponentProps } from "@reach/router";
import withStyles, { WithStyles } from "react-jss";

const circles = {
  0: {
    color: "#ccdbdc",
    radius: 40
  },
  1: {
    key: 2,
    color: "#80ced7",
    radius: 32
  },
  2: {
    color: "#007ea7",
    radius: 21
  },
  3: {
    color: "#003249",
    radius: 13
  }
};

const styles = {
  HoverFill: {
    width: "100vw",
    height: "100vh",
    position: "relative"
  }
};

const HoverFill: React.FunctionComponent<
  RouteComponentProps & WithStyles<typeof styles>
> = ({ classes }) => {
  const [activeCircle, setActiveCircle] = useState("0");
  const handleMouseEnter = (id: string) => (_: MouseEvent) => {
    setActiveCircle(id);
  };
  const handleMouseLeave = (_: MouseEvent) => {
    setActiveCircle("-1");
  };

  return (
    <div className={classes.HoverFill}>
      {Object.entries(circles).map(([id, { color, radius }]) => (
        <div key={id}>
          <Circle
            key={2}
            color={color}
            radius={activeCircle === id ? circles[0].radius : radius}
          />
          <Circle
            key={1}
            color={color}
            handleMouseEnter={handleMouseEnter(id)}
            handleMouseLeave={handleMouseLeave}
            radius={radius}
          />
        </div>
      ))}
    </div>
  );
};

export default withStyles(styles)(HoverFill);
