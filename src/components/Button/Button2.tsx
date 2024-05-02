import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}
const Button = (props: ButtonProps) => {
  const { children, className, type = "button", ...rest } = props;
  const buttonStyle = `capitalize inline-flex items-center justify-center py-2 px-4 font-medium rounded-md ${className}`;
  return (
    <button type={type} className={buttonStyle} {...rest}>
      {children}
    </button>
  );
};

export default Button;