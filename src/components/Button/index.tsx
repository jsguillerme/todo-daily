import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonHTMLAttributes, ReactNode } from "react"

import style from './button.module.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: ReactNode;
}

export function Button(propsButton : ButtonProps){

  const { 
    children,
    icon = <FontAwesomeIcon icon={faCheck}/>,
    ...props
  } = propsButton;

  return (
    <button {...props} className={style.button}>
      {icon}
      {children}
    </button>
  )
}