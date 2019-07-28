import React, { MouseEvent as ReactMouseEvent, ReactNode } from "react";
import withStyles, { WithStyles } from "react-jss";

const styles = {
  Circle: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transition: "width 1s, height 1s, margin 1s",
    marginLeft: (props: Props) => `-${props.radius}vh`,
    marginTop: (props: Props) => `-${props.radius}vh`,
    width: (props: Props) => `${props.radius * 2}vh`,
    height: (props: Props) => `${props.radius * 2}vh`,
    borderRadius: "50%",
    backgroundColor: (props: Props) => props.color,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
};

interface Props extends WithStyles<typeof styles> {
  color: string;
  radius: number;
  children?: ReactNode;
  handleMouseEnter?: (e: ReactMouseEvent<HTMLDivElement, MouseEvent>) => void;
  handleMouseLeave?: (e: ReactMouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Circle: React.FC<Props> = ({
  handleMouseEnter,
  handleMouseLeave,
  classes,
  children
}) => {
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={classes.Circle}
    >
      {children}
    </div>
  );
};

export default withStyles(styles)(Circle);
