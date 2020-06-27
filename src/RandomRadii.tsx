import React, { useEffect, useState } from "react";
import Circle from "./Circle";
import { RouteComponentProps } from "@reach/router";
import { createUseStyles } from "react-jss";

const styles = {
  RandomRadii: {
    width: "100vw",
    height: "100vh",
    position: "relative"
  }
} as const;
const useStyles = createUseStyles(styles);

const RandomRadii: React.FunctionComponent<RouteComponentProps> = () => {
  const [offset, setOffset] = useState(0);
  const classes = useStyles();
  useEffect(() => {
    const id = setInterval(() => {
      setOffset(Math.random());
    }, Math.random() * 750);
    return () => clearInterval(id);
  });
  return (
    <div className={classes.RandomRadii}>
      <Circle radius={40 + offset * Math.random() * 40} color="#0e79b2" />
      <Circle radius={30 + offset * Math.random() * 30} color="#bf1363" />
      <Circle radius={15 + offset * Math.random() * 15} color="#f39237" />
    </div>
  );
};

export default RandomRadii;
