import React, { MouseEvent as ReactMouseEvent, ReactNode } from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  //@ts-ignore
  Circle: (props: any) => ({
    position: "absolute",
    left: "50%",
    top: "50%",
    transition: "width 1s, height 1s, margin 1s, background-color 0.5s",
    marginLeft: `-${props.radius}vh`,
    marginTop: `-${props.radius}vh`,
    width: `${props.radius * 2}vh`,
    height: `${props.radius * 2}vh`,
    transform: props.translate,
    zIndex: props.zIndex,
    borderRadius: "50%",
    backgroundColor: props.color,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  })
});

interface Props {
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
  className,
  children,
  ...props
}) => {
  const classes = useStyles(props);
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

export default Circle;
