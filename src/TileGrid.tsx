import React, { useEffect, useState } from "react";
import withStyles, { WithStyles } from "react-jss";
import { RouteComponentProps } from "@reach/router";
import chroma from "chroma-js";
import Button from "./Button";

const styles = {
  TileGrid: {
    display: "flex",
    width: "100vw",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "40px"
  },
  grid: {
    display: "grid",
    width: "80vh",
    height: "80vh",
    gridTemplateColumns: "repeat(8, 1fr)",
    gridGap: "5px"
  },
  gridElement: {
    transition: "background-color 0.2s",
    borderRadius: "20px",
    width: "8vh",
    height: "8vh"
  },
  buttons: {
    display: "flex"
  }
};

interface Point {
  x: number;
  y: number;
}

const calculateCoords = (i: number): Point => {
  const y = i / 8;
  const x = i % 8;
  return { x, y };
};

const calculateDist = (u: Point, v: Point): number => {
  const delta_x = u.x - v.x;
  const delta_y = u.y - v.y;
  return Math.hypot(delta_x, delta_y);
};

enum SelectionMode {
  Mouse,
  Random
}

const TileGrid: React.FunctionComponent<
  WithStyles<typeof styles> & RouteComponentProps
> = ({ classes }) => {
  const [activeTile, setActiveTile] = useState({ x: 2, y: 2 });
  const [selectionMode, setSelectionMode] = useState(SelectionMode.Random);
  useEffect(() => {
    const id = setInterval(() => {
      if (selectionMode === SelectionMode.Random) {
        const x = Math.max(
          0,
          Math.min(
            15,
            Math.floor(activeTile.x + (Math.random() - activeTile.x / 15) * 1.5)
          )
        );
        const y = Math.max(
          0,
          Math.min(
            15,
            Math.floor(activeTile.y + (Math.random() - activeTile.y / 15) * 1.5)
          )
        );
        setActiveTile({ x, y });
      } else {
        setActiveTile({ x: activeTile.x, y: activeTile.y });
      }
    }, 500);
    return () => clearInterval(id);
  });
  const gridElements = [];
  const scale = chroma.scale(["red", "yellow"]);
  for (let i = 0; i < 64; i++) {
    const dist = calculateDist(activeTile, calculateCoords(i));
    const colorScale = (dist + Math.random()) / 5;
    const handleMouseEnter =
      selectionMode === SelectionMode.Mouse
        ? () => setActiveTile(calculateCoords(i))
        : undefined;
    gridElements.push(
      <div
        onMouseEnter={handleMouseEnter}
        style={{ backgroundColor: scale(colorScale).hex() }}
        className={classes.gridElement}
      />
    );
  }
  return (
    <div className={classes.TileGrid}>
      <div className={classes.buttons}>
        <Button
          style={
            selectionMode === SelectionMode.Mouse
              ? { backgroundColor: "orangered", color: "#f9f9f9" }
              : {}
          }
          onClick={() => {
            setSelectionMode(SelectionMode.Mouse);
            setActiveTile({ x: 4, y: 4 });
          }}
        >
          Mouse
        </Button>
        <Button
          style={
            selectionMode === SelectionMode.Random
              ? { backgroundColor: "orangered", color: "#f9f9f9" }
              : {}
          }
          onClick={() => setSelectionMode(SelectionMode.Random)}
        >
          Random
        </Button>
      </div>
      <div className={classes.grid}>{gridElements}</div>
    </div>
  );
};

export default withStyles(styles)(TileGrid);
