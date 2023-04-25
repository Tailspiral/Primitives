import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "../hooks/useOutsideClick";
import autoAnimate from "@formkit/auto-animate";
import { Divider } from "./Divider";
import { ChevronRight } from "../icons/ChevronRight";
import { CaretRightFill } from "../icons/CaretRightFill";

type SectionProps = {
  label: string;
  children: React.ReactNode;
  isInitiallyOpen?: boolean;
  settings: {
    label: string;
    action?: () => void;
    backgroundColor?: string;
  }[];
};

export const Section = ({
  isInitiallyOpen = true,
  label,
  children,
  settings,
}: SectionProps) => {
  const [open, setOpen] = useState(isInitiallyOpen);
  const containerRef = useRef<HTMLDivElement>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  useEffect(() => {
    console.log("open", open);
  }, [open]);

  useEffect(() => {
    if (containerRef.current) {
      autoAnimate(containerRef.current, {
        duration: 200,
        easing: "ease-in-out",
      });
    }
  }, [containerRef]);

  const toggleOpen = () => {
    setOpen(!open);
  };

  const toggleSettingsOpen = () => {
    setSettingsOpen(!settingsOpen);
  };

  const moreRef = useOnClickOutside(() => {
    setSettingsOpen(false);
  });

  return (
    <div className="flex flex-col  w-full">
      <div
        className="w-full py-1 rounded-sm group flex justify-between hover:cursor-pointer"
        onClick={toggleOpen}
      >
        <div className="w-[30px] pb-1 flex items-center ">
          <div
            className={classNames(
              "duration-300 flex w-fit h-fit ease-in-out group-hover:text-[#2979FF]  transition-all",
              open && "transform rotate-90 "
            )}
          >
            <CaretRightFill />
          </div>
        </div>
        <span
          className="text-xl group-hover:text-[#2979FF]   w-full hover:cursor-pointer font-medium font-inter"
          onClick={toggleOpen}
        >
          {label}
        </span>
        {settings.length > 0 && (
          <span
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              toggleSettingsOpen();
            }}
            className="  px-2 py-1 duration-300 ease-in-out transition-all hover:cursor-pointer hover:text-[#2979FF]"
          >
            🞄🞄🞄
          </span>
        )}

        <div className="relative group" onClick={toggleSettingsOpen}>
          {settingsOpen && (
            <div
              ref={moreRef as any}
              className="absolute  z-50 border-2 border-gray-300 p-1 top-6 right-2 w-40 bg-white rounded-sm shadow-lg"
            >
              <ul className="flex flex-col gap-2">
                {settings.map((s) => (
                  <li
                    className="flex hover:cursor-pointer gap-2 items-center py-1 hover:bg-gray-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      s.action && s.action();
                      setSettingsOpen(false);
                    }}
                  >
                    <span
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: s.backgroundColor }}
                    ></span>
                    <span>{s.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full" ref={containerRef}>
        <div className="flex justify-between  w-full items-center"></div>

        {open && <div>{children}</div>}
      </div>
      <Divider />
    </div>
  );
};
