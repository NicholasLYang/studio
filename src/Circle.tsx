import React, { MouseEvent as ReactMouseEvent, ReactNode } from "react";
import withStyles, { WithStyles } from "react-jss";

const styles = {
  Circle: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transition: "width 1s, height 1s, margin 1s, background-color 0.5s",
    marginLeft: (props: Props) => `-${props.radius}vh`,
    marginTop: (props: Props) => `-${props.radius}vh`,
    width: (props: Props) => `${props.radius * 2}vh`,
    height: (props: Props) => `${props.radius * 2}vh`,
    transform: (props: Props) => props.translate,
    zIndex: (props: Props) => props.zIndex,
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
  zIndex?: string;
  translate?: string;
  children?: ReactNode;
  className?: string;
  handleMouseEnter?: (e: ReactMouseEvent<HTMLDivElement, MouseEvent>) => void;
  handleMouseLeave?: (e: ReactMouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Circle: React.FC<Props> = ({
  handleMouseEnter,
  handleMouseLeave,
  classes,
  className,
  children
}) => {
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className ? `${classes.Circle} ${className}` : classes.Circle}
    >
      {children}
    </div>
  );
};

export default withStyles(styles)(Circle);
