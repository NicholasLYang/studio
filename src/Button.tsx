import React, { ButtonHTMLAttributes } from "react";
import withStyles, { WithStylesProps } from "react-jss";
import chroma from "chroma-js";

const styles = {
  Button: {
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    fontSize: "1.1rem",
    margin: "10px",
    transition: "background-color 0.25s, filter 0.25s",
    "&:hover": {
      backgroundColor: chroma("white")
        .darken()
        .hex()
    }
  }
};

type Props = WithStylesProps<typeof styles> &
  ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FunctionComponent<Props> = ({
  classes,
  className,
  children,
  ...props
}) => {
  return (
    <button className={`${classes.Button} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default withStyles(styles)(Button);
