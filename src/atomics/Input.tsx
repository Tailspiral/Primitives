import React, { useState } from "react";
import classNames from "classnames";
//@ts-ignore
import { useComponentState } from "host/hooks";

type ParentControlledProps<T extends "number" | "text"> = {
  placeholder?: string;
  suffix?: string;
  propKey: string;
  type?: T;
  defaultValue: T extends "number" ? number : string;
  disabled?: boolean;
  value?: never;
  onChange?: never;
};

type SelfControlledProps<T extends "number" | "text"> = {
  placeholder?: string;
  suffix?: string;
  propKey?: never;
  type?: T;
  defaultValue?: never;
  disabled?: boolean;
  value: T extends "number" ? number : string;
  onChange: (value: T extends "number" ? number : string) => void;
};

type InputProps<T extends "number" | "text"> =
  | ParentControlledProps<T>
  | SelfControlledProps<T>;

/**
 * An input component.
 *
 * ⚠️ `defaultValue` and `propKey` cannot be used at the same time as `value` and `onChange`.
 * when `defaultValue` and `propKey` are used the component internally uses `useComponentState` hook.
 * if `value` and `onChange` are used the state is managed by the parent component.
 *
 */
export const Input = ({
  placeholder = "Input",
  suffix,
  value,
  propKey,
  type = "text",
  onChange,
  defaultValue = type === "number" ? 0 : "",
  disabled,
}: InputProps<"number" | "text">) => {
  const [val, setVal] = useComponentState(propKey, defaultValue);
  //const [val, setVal] = useState(defaultValue);
  return (
    <label
      htmlFor={placeholder + "id"}
      tabIndex={disabled ? -1 : 0}
      className={classNames(
        "flex w-full flex-row min-h-[40px] group relative  outline-none group items-center leading-none border-2 px-4 rounded-sm border-gray-200 justify-between",
        "focus-within:border-[#2979FF] focus-within:ring-1 focus-within:ring-[#2979FF] focus-within:ring-opacity-50",
        "duration-200 ease-in-out transition-all",
        disabled
          ? " opacity-30  cursor-not-allowed pointer-events-none"
          : " hover:cursor-text  [&:hover:not(:focus-within)]:hover:border-gray-500"
      )}
    >
      <input
        type={type}
        value={value || val}
        disabled={disabled}
        id={placeholder + "id"}
        onChange={(e) => {
          if (type === "number") {
            if (onChange) {
              onChange(e.currentTarget.valueAsNumber);
            } else {
              setVal(e.currentTarget.valueAsNumber);
            }
          } else {
            if (onChange) {
              onChange(e.currentTarget.value);
            } else {
              setVal(e.currentTarget.value);
            }
          }
        }}
        className={classNames(
          " outline-none font-inter font-medium w-full",
          disabled
        )}
      />
      {suffix && (
        <label
          className={classNames(
            "text-[#333] bg-white px-2 z-30 text-sm font-semibold font-inter hover:cursor-text"
          )}
          htmlFor={placeholder + "id"}
        >
          {suffix}
        </label>
      )}

      <label
        className={classNames(
          "text-[#555] bg-white px-2 z-30 text-[10px] font-semibold font-inter hover:cursor-text",
          "absolute -top-1 left-3",
          "duration-200 ease-in-out transition-all"
        )}
        htmlFor={placeholder + "id"}
      >
        {placeholder}
      </label>
    </label>
  );
};
