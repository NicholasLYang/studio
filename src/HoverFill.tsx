import React, { MouseEvent, useState } from "react";
import Circle from "./Circle";
import { RouteComponentProps } from "@reach/router";
import { createUseStyles } from "react-jss";

const circles = [
  {
    color: "#ccdbdc",
    radius: 40
  },
  {
    key: 2,
    color: "#80ced7",
    radius: 32
  },
  {
    color: "#007ea7",
    radius: 21
  },
  {
    color: "#003249",
    radius: 13
  }
];

const styles = {
  HoverFill: {
    width: "100vw",
    height: "100vh",
    position: "relative"
  }
} as const;
const useStyles = createUseStyles(styles);

const HoverFill: React.FunctionComponent<RouteComponentProps> = () => {
  const [activeCircle, setActiveCircle] = useState(0);
  const classes = useStyles();
  const handleMouseEnter = (id: number) => (_: MouseEvent) => {
    setActiveCircle(id);
  };
  const handleMouseLeave = (_: MouseEvent) => {
    setActiveCircle(-1);
  };

  return (
    <div className={classes.HoverFill}>
      {circles.map(({ color, radius }, id) => (
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

export default HoverFill;
