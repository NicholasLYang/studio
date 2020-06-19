import React, { ReactNodeArray, useState } from "react";
import Circle from "./Circle";
import { RouteComponentProps } from "@reach/router";
import chroma, { Color } from "chroma-js";
import Button from "./Button";
import { createUseStyles } from "react-jss";

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
  regularCircle: {
    zIndex: "100"
  },
  highlightedCircle: {
    zIndex: "99"
  },
  rainbowButton: {
    background:
      "linear-gradient(to right, red, orange, yellow, green, cyan, blue, violet)",
    color: "white",
    "&:hover": {
      filter: "brightness(80%)"
    }
  },
  flame: {
    background: "linear-gradient(to right, red, orange, yellow)",
    "&:hover": {
      filter: "brightness(80%)"
    },
    color: "black"
  },
  monochromeButton: {
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: chroma("white")
        .darken()
        .hex()
    }
  }
} as const;

const useStyles = createUseStyles(styles);

const CIRCLES_COUNT = 64;
const COLOR_DELTA = 0.25;
enum ColorDirection {
  Brightening,
  Darkening
}

enum ColorScheme {
  Monochrome,
  Rainbow,
  RedYellow
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
const redYellow = chroma
  .scale(["yellow", "red", "yellow"])
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
        handleMouseEnter={() => {
          Math.abs(colorOffset - i) > 3 && setColorOffset(i);
        }}
        color={color.hex()}
        zIndex={colorOffset === i ? "99" : "100"}
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

const makeRedYellowCircles = (
  colorOffset: number,
  setColorOffset: (n: number) => void
): ReactNodeArray => {
  const getNextColor = (i: number) => {
    return chroma(redYellow[(i - colorOffset) % COLORS_COUNT]);
  };
  return makeCircles(
    colorOffset,
    setColorOffset,
    chroma(redYellow[0]),
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
  [ColorScheme.Rainbow]: makeRainbowCircles,
  [ColorScheme.RedYellow]: makeRedYellowCircles
};

const CircleOfCircles: React.FunctionComponent<RouteComponentProps> = () => {
  const classes = useStyles();
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
        <Button
          className={classes.monochromeButton}
          onClick={() => setColorScheme(ColorScheme.Monochrome)}
        >
          MONOCHROME
        </Button>
        <Button
          className={classes.rainbowButton}
          onClick={() => setColorScheme(ColorScheme.Rainbow)}
        >
          RAINBOW
        </Button>
        <Button
          className={classes.flame}
          onClick={() => setColorScheme(ColorScheme.RedYellow)}
        >
          FLAME
        </Button>
      </div>
      {circles}
    </div>
  );
};

export default CircleOfCircles;
