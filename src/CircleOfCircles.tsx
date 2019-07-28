import React, { ReactNodeArray, useState } from "react";
import Circle from "./Circle";
import { RouteComponentProps } from "@reach/router";
import withStyles, { WithStyles } from "react-jss";
import chroma, { Color } from "chroma-js";

const styles = {
  CircleOfCircles: {
    width: "100vw",
    height: "100vh",
    position: "relative",
    transition: "background-color 0.25s"
  },
  button: {
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    fontSize: "1.1rem",
    margin: "10px",
    transition: "background-color 0.25s, filter 0.25s"
  },
  rainbowButton: {
    background:
      "linear-gradient(to right, red, orange, yellow, green, cyan, blue, violet)",
    color: "white",
    "&:hover": {
      filter: "brightness(80%)"
    }
  },
  monochromeButton: {
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: chroma("white")
        .darken()
        .hex()
    }
  }
};

const CIRCLES_COUNT = 64;
const COLOR_DELTA = 0.25;
enum ColorDirection {
  Brightening,
  Darkening
}

enum ColorScheme {
  Monochrome,
  Rainbow
}

const COLORS_COUNT = 64;
const rainbow = chroma
  .scale([
    "red",
    "orangered",
    "orange",
    "yellow",
    "green",
    "blue",
    "#5500AA",
    "#5500AA",
    "blue",
    "green",
    "yellow",
    "orange",
    "orangered",
    "red"
  ])
  .colors(COLORS_COUNT);

type GetNextColor = (i: number, previousColor: Color) => Color;

const makeCircles = (
  colorOffset: number,
  setColorOffset: (n: number) => void,
  initialColor: Color,
  getNextColor: GetNextColor
): ReactNodeArray => {
  const circles = [];
  let color = initialColor;
  for (let i = colorOffset; i < CIRCLES_COUNT + colorOffset; i++) {
    const xOffset = 20 * Math.cos((2 * Math.PI * i) / CIRCLES_COUNT);
    const yOffset = 20 * Math.sin((2 * Math.PI * i) / CIRCLES_COUNT);
    circles.push(
      <Circle
        radius={5}
        handleMouseEnter={() => setColorOffset(i)}
        color={color.hex()}
        translate={`translate(${xOffset}vw, ${yOffset}vw)`}
      />
    );
    color = getNextColor(i, color);
  }
  return circles;
};

const makeMonochromeCircles = (
  colorOffset: number,
  setColorOffset: (n: number) => void
): ReactNodeArray => {
  const getNextColor = (() => {
    let colorDirection = ColorDirection.Darkening;
    return (i: number, previousColor: Color) => {
      if (i === colorOffset + CIRCLES_COUNT / 2) {
        colorDirection = ColorDirection.Brightening;
      }
      if (colorDirection === ColorDirection.Darkening) {
        return previousColor.darken(COLOR_DELTA);
      } else {
        return previousColor.brighten(COLOR_DELTA);
      }
    };
  })();
  return makeCircles(
    colorOffset,
    setColorOffset,
    chroma("#ffffff"),
    getNextColor
  );
};

const makeRainbowCircles = (
  colorOffset: number,
  setColorOffset: (n: number) => void
): ReactNodeArray => {
  const getNextColor = (i: number) => {
    return chroma(rainbow[(i - colorOffset) % COLORS_COUNT]);
  };
  return makeCircles(
    colorOffset,
    setColorOffset,
    chroma(rainbow[0]),
    getNextColor
  );
};
const colorSchemeFunctions = {
  [ColorScheme.Monochrome]: makeMonochromeCircles,
  [ColorScheme.Rainbow]: makeRainbowCircles
};

const CircleOfCircles: React.FunctionComponent<
  RouteComponentProps & WithStyles<typeof styles>
> = ({ classes }) => {
  const [colorScheme, setColorScheme] = useState(ColorScheme.Monochrome);
  const [colorOffset, setColorOffset] = useState(0);
  const circles = colorSchemeFunctions[colorScheme](
    colorOffset,
    setColorOffset
  );
  return (
    <div
      className={classes.CircleOfCircles}
      style={{
        backgroundColor:
          colorScheme === ColorScheme.Monochrome
            ? chroma("#ffffff")
                .darken(1.5)
                .hex()
            : "white"
      }}
    >
      <div>
        <button
          className={`${classes.button} ${classes.monochromeButton}`}
          onClick={() => setColorScheme(ColorScheme.Monochrome)}
        >
          MONOCHROME
        </button>
        <button
          className={`${classes.button} ${classes.rainbowButton}`}
          onClick={() => setColorScheme(ColorScheme.Rainbow)}
        >
          RAINBOW
        </button>
      </div>
      {circles}
    </div>
  );
};

export default withStyles(styles)(CircleOfCircles);
