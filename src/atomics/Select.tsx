import classNames from "classnames";
//@ts-ignore
import { useComponentState } from "host/hooks";
import React, { useState } from "react";
import { useOnClickOutside } from "../hooks/useOutsideClick";

type SelectOption = {
  label: string;
  value: string;
};

type SelectProps<T extends SelectOption["value"]> = {
  propKey?: string;
  label: string;
  disabled?: boolean;
  options: { label: string; value: T }[];
  // one of the values of the options
  defaultValue?: string;
  value?: T;
  onChange?: (value: T) => void;
};

export const Select = <T extends string>({
  propKey,
  label,
  disabled,
  options,
  defaultValue,
  value,
  onChange,
}: SelectProps<T>) => {
  const [internalValue, setValue] = useComponentState(propKey, defaultValue);
  //const [internalValue, setValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);

  const selectRef = useOnClickOutside(() => {
    setOpen(false);
  });

  const toggleOpen = () => {
    setOpen(!open);
    // unfocus the select
    if (selectRef.current && open) {
      selectRef.current.blur();
    }
  };

  const handleSelect = (value: T) => {
    if (onChange) {
      onChange(value);
    } else {
      setValue(value as any);
    }
  };

  return (
    <label
      ref={selectRef as any}
      htmlFor={label + "id"}
      tabIndex={disabled ? -1 : 0}
      onClick={toggleOpen}
      className={classNames(
        "flex  flex-row h-[40px]  group relative w-full outline-none group items-center leading-none border-2 px-4 rounded-sm border-gray-200 justify-between",
        "focus-within:border-[#2979FF] focus-within:ring-1 focus-within:ring-[#2979FF] focus-within:ring-opacity-50",
        "duration-200 ease-in-out transition-all",
        disabled
          ? "opacity-50  cursor-not-allowed pointer-events-none"
          : " hover:cursor-pointer [&:hover:not(:focus-within)]:hover:border-gray-500"
      )}
    >
      {/*Implement select without using select tag*/}

      <div className="w-full">
        <div className="flex items-center justify-between">
          <span>
            {
              options.find((o) => {
                return o.value === (value || internalValue);
              })?.label
            }
          </span>
          <span
            className={classNames(
              "duration-300 ease-in-out transition-all",
              open && "transform -rotate-90"
            )}
          >
            ◂
          </span>
        </div>
        {open && (
          <div className="absolute shadow-xl z-40 top-[45px] left-0 w-full bg-white border-2 border-gray-200 rounded-sm">
            {options.map((option) => (
              <div
                key={option.value}
                className={classNames(
                  "w-full h-[40px] px-4 flex items-center",
                  "hover:bg-gray-200 hover:cursor-pointer",
                  "duration-200 ease-in-out transition-all"
                )}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>

      <label
        className={classNames(
          "text-[#555] bg-white px-2 z-30 text-[10px] font-semibold font-inter hover:cursor-text",
          "absolute -top-1 left-3",
          "duration-200 ease-in-out transition-all"
        )}
        htmlFor={label + "id"}
      >
        {label}
      </label>
    </label>
  );
};
