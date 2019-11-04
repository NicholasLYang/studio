import React, { useEffect, useState } from "react";
import withStyles, { WithStyles } from "react-jss";
import { RouteComponentProps } from "@reach/router";
import chroma from "chroma-js";
import Button from "./Button";

// Number of tiles in a row
const TILE_ROW_COUNT = 16;

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
    gridTemplateColumns: `repeat(${TILE_ROW_COUNT}, 1fr)`,
    gridGap: "5px"
  },
  gridElement: {
    transition: "background-color 0.2s",
    borderRadius: "20px",
    width: "4vh",
    height: "4vh"
  },
  buttons: {
    display: "flex"
  }
};

interface Point {
  x: number;
  y: number;
}

const calcCoords = (i: number): Point => {
  const y = i / TILE_ROW_COUNT;
  const x = i % TILE_ROW_COUNT;
  return { x, y };
};

const calcDist = (u: Point, v: Point): number => {
  const delta_x = u.x - v.x;
  const delta_y = u.y - v.y;
  return Math.hypot(delta_x, delta_y);
};

enum SelectionMode {
  Hover,
  Random,
  Click
}

const TileGrid: React.FunctionComponent<
  WithStyles<typeof styles> & RouteComponentProps
> = ({ classes }) => {
  const [activeTile, setActiveTile] = useState({
    x: TILE_ROW_COUNT / 2,
    y: TILE_ROW_COUNT / 2
  });
  const [selectionMode, setSelectionMode] = useState(SelectionMode.Random);
  useEffect(() => {
    const id = setInterval(() => {
      if (selectionMode === SelectionMode.Random) {
        const x = Math.max(
          0,
          Math.min(
            TILE_ROW_COUNT - 1,
            Math.floor(
              activeTile.x +
                (Math.random() - activeTile.x / (TILE_ROW_COUNT - 1)) * 1.5
            )
          )
        );
        const y = Math.max(
          0,
          Math.min(
            TILE_ROW_COUNT - 1,
            Math.floor(
              activeTile.y +
                (Math.random() - activeTile.y / (TILE_ROW_COUNT - 1)) * 1.5
            )
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
  for (let i = 0; i < TILE_ROW_COUNT * TILE_ROW_COUNT; i++) {
    const dist = calcDist(activeTile, calcCoords(i));
    const colorScale = (dist + Math.random()) / 8;
    const handleMouseEnter =
      selectionMode === SelectionMode.Hover
        ? () => setActiveTile(calcCoords(i))
        : undefined;
    const handleClick =
      selectionMode === SelectionMode.Click
        ? () => setActiveTile(calcCoords(i))
        : undefined;
    gridElements.push(
      <div
        onMouseEnter={handleMouseEnter}
        onClick={handleClick}
        style={{
          backgroundColor: scale(colorScale).hex()
        }}
        className={classes.gridElement}
      />
    );
  }
  return (
    <div className={classes.TileGrid}>
      <div className={classes.buttons}>
        <Button
          style={
            selectionMode === SelectionMode.Hover
              ? { backgroundColor: "orangered", color: "#f9f9f9" }
              : {}
          }
          onClick={() => {
            setSelectionMode(SelectionMode.Hover);
            setActiveTile({ x: TILE_ROW_COUNT / 2, y: TILE_ROW_COUNT / 2 });
          }}
        >
          Hover
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
        <Button
          style={
            selectionMode === SelectionMode.Click
              ? { backgroundColor: "orangered", color: "#f9f9f9" }
              : {}
          }
          onClick={() => setSelectionMode(SelectionMode.Click)}
        >
          Click
        </Button>
      </div>
      <div className={classes.grid}>{gridElements}</div>
    </div>
  );
};

export default withStyles(styles)(TileGrid);
