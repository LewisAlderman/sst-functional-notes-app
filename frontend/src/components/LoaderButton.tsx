import React from "react";
import Button, {ButtonProps} from "react-bootstrap/Button";
import { BsArrowRepeat } from "react-icons/bs";
import "./LoaderButton.css";

export default function LoaderButton({
  isLoading,
  className = "",
  disabled = false,
  ...props
} : ButtonProps & {
	isLoading: boolean,
	className?: string,
	disabled?: boolean,
}) {
  return (
    <Button
      disabled={disabled || isLoading}
      className={`LoaderButton ${className}`}
      {...props}
    >
      {isLoading && <BsArrowRepeat className="spinning" style={{
				width: '1em'
			}} />}
      {props.children}
    </Button>
  );
}