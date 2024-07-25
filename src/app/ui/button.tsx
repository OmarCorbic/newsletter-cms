import clsx from "clsx";
import React, { ReactNode } from "react";

const mergeClassNames = (defaultClassName: string, userClassName: string) => {
  const defaultClassArray = defaultClassName.split(" ");
  const userClassArray = userClassName.split(" ");
  const filteredDefaultClassName = defaultClassArray.filter(
    (defaultClass: string) =>
      !userClassArray.some(
        (userClass: string) =>
          userClass.split("-")[0] === defaultClass.split("-")[0]
      )
  );
  return clsx(userClassName, filteredDefaultClassName);
};

function Button({
  disabled,
  onClick,
  type = "button",
  children,
  className,
}: {
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
  children?: ReactNode;
  className?: string;
}) {
  const defaultClassName =
    "bg-orange-700 hover:bg-orange-600 rounded-md px-5 py-2 text-center text-white";
  const finalClassName = className
    ? mergeClassNames(defaultClassName, className)
    : defaultClassName;
  return (
    <button
      disabled={disabled}
      className={finalClassName}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;
