import React, { useCallback } from "react";
import { transtionControl } from "../../utils/styles";
import Link from "next/link";

type ButtonProps = {
  variant?: "primary" | "secondary" | "tertiary";
  title: string;
  iconAdornmentStart?: React.ReactNode;
  iconAdornmentEnd?: React.ReactNode;
  fullWidth?: boolean;
  onClick?: () => void;
  externalLink?: string;
  href?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  pulse?: boolean;
  rounded?: boolean;
};

const color = {
  primary: `bg-primary-500 hover:bg-primary-700 text-white ${transtionControl}`,
  secondary: `bg-secondary-500 hover:bg-secondary-700 text-white ${transtionControl}`,
  tertiary: `bg-primary-dark-400 hover:bg-primary-dark-700 ${transtionControl} text-white`,
};

function Button(props: ButtonProps) {
  const {
    variant = "primary",
    title,
    fullWidth = true,
    onClick,
    externalLink,
    href,
    disabled = false,
    type = "button",
    pulse = false,
    rounded = true,
  } = props;

  const width = fullWidth ? "w-full" : "";

  const willUseATAG = externalLink ? true : false;

  const renderInternalContent = useCallback(() => {
    return (
      <>
        {props.iconAdornmentStart && (
          <div className="px-2">{props.iconAdornmentStart}</div>
        )}

        {title}
        {props.iconAdornmentEnd && (
          <div className="px-2">{props.iconAdornmentEnd}</div>
        )}
      </>
    );
  }, [props.iconAdornmentStart, props.iconAdornmentEnd, title]);

  const renderButton = useCallback(() => {
    return (
      <button
        disabled={disabled}
        type={type}
        onClick={onClick}
        className={`flex flex-row ${
          rounded ? "rounded" : ""
        } py-2 justify-center   font-semibold items-center ${
          color[variant]
        } ${width}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${pulse ? "animate-pulse" : ""}`}
      >
        {willUseATAG ? (
          <a
            className="flex flex-row  "
            {...{
              ...(externalLink && { href: externalLink }),
              ...(externalLink && { target: "_blank" }),
              ...(externalLink && { rel: "noopener noreferrer" }),
            }}
          >
            {renderInternalContent()}
          </a>
        ) : (
          <div className="flex flex-row">{renderInternalContent()}</div>
        )}
      </button>
    );
  }, [
    externalLink,
    onClick,
    renderInternalContent,
    variant,
    width,
    willUseATAG,
    disabled,
    type,
    pulse,
  ]);

  return !!href ? (
    <Link className={`flex ${width}`} href={href}>
      {renderButton()}
    </Link>
  ) : (
    renderButton()
  );
}

export { Button };
