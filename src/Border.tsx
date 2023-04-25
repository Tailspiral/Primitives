import classNames from "classnames";
import React, { useState } from "react";
import { ColorSetting, Input, Section, Select } from "./atomics";
import { Divider } from "./atomics/Divider";
import { DeepPartial } from "./utils";

//@ts-ignore
import { useComponentState } from "host/hooks";
// TODO: finish

type BorderDefault = DeepPartial<{
  color: string;
  thickness: string;
  style: "solid" | "dashed" | "dotted" | "none";
  radius: string;
  sides: {
    top: boolean;
    right: boolean;
    bottom: boolean;
    left: boolean;
  };
}>;

type BorderProps = {
  propKey: string;
  label: string;
  defaultValue: BorderDefault;
};

const BorderStyleOptions = [
  { label: "Solid", value: "solid" },
  { label: "Dashed", value: "dashed" },
  { label: "Dotted", value: "dotted" },
  { label: "None", value: "none" },
];

/**
 *
 * `propKey` - the initial starting point for injection
 * e.g. `propKey="border"` will result in `border.color`, `border.thickness`, etc.
 *
 * injections:
 * - `propKey.color`
 * - `propKey.thickness`
 * - `propKey.style`
 * - `propKey.radius`
 *
 */
export const Border = ({
  propKey,
  label = "Border",
  defaultValue,
}: BorderProps) => {
  const defaultValues = {
    color: "#000000",
    thickness: 1,
    style: "solid",
    radius: "2",
    ...defaultValue,
    sides: {
      top: true,
      right: true,
      bottom: true,
      left: true,
      ...defaultValue.sides,
    },
  };

  const Side = ({
    side,
    propKey,
    active,
    onClick,
  }: {
    side: "top" | "right" | "bottom" | "left" | "all";
    active: boolean;
    propKey: string;
    onClick: () => void;
  }) => {
    return (
      <div
        onClick={onClick}
        className={classNames(
          "w-6 h-6 relative hover:cursor-pointer border-1 border-gray-300 overflow-hidden rounded-sm",
          "hover:shadow-md hover:ring-2 hover:ring-[#2979FF] hover:border-[#2979FF]"
        )}
      >
        <div
          className={classNames(
            "w-full h-1 top-0 absolute",
            side === "top" && "z-10",
            side === "top" && active && "bg-[#2979FF]",
            side === "top" && !active && "bg-[#8a8a8a]",
            side === "all" && active ? "bg-[#2979FF]" : "bg-gray-300"
          )}
        />
        <div
          className={classNames(
            "w-1 h-full left-0 absolute",
            side === "left" && "z-10",
            side === "left" && active && "bg-[#2979FF]",
            side === "left" && !active && "bg-[#8a8a8a]",
            side === "all" && active ? "bg-[#2979FF]" : "bg-gray-300"
          )}
        />
        <div
          className={classNames(
            "w-full h-1 bottom-0 absolute",
            side === "bottom" && "z-10",
            side === "bottom" && active && "bg-[#2979FF]",
            side === "bottom" && !active && "bg-[#8a8a8a]",
            side === "all" && active ? "bg-[#2979FF]" : "bg-gray-300"
          )}
        />
        <div
          className={classNames(
            "w-1 h-full right-0 absolute",
            side === "right" && "z-10",
            side === "right" && active && " bg-[#2979FF]",
            side === "right" && !active && "bg-[#8a8a8a]",
            side === "all" && active ? "bg-[#2979FF]" : "bg-gray-300"
          )}
        />
      </div>
    );
  };
  const Sides = () => {
    //const [state, setState] = useComponentState(propKey + ".sides");
    const [state, setState] = useState(defaultValues.sides);
    return (
      <div className="flex gap-2 justify-evenly">
        {["all", "top", "right", "bottom", "left"].map((side) => {
          return (
            <Side
              onClick={() => {
                setState((state) => {
                  if (side === "all") {
                    return {
                      top: !state.top,
                      right: !state.right,
                      bottom: !state.bottom,
                      left: !state.left,
                    };
                  }
                  return {
                    ...state,
                    [side]: !state[side as keyof typeof state],
                  };
                });
              }}
              active={state[side as keyof typeof state]}
              side={side as any}
              propKey={propKey + ".sides." + side}
            />
          );
        })}
      </div>
    );
  };
  return (
    <Section label={label} settings={[]}>
      <div className="flex gap-5 flex-col">
        <ColorSetting
          defaultValue={defaultValues.color as string}
          label="Border Color"
          propKey={propKey + ".border-color"}
        />
        <div className="flex gap-2">
          <Input
            defaultValue={defaultValues.thickness as string}
            propKey={propKey + ".border-width"}
            type="number"
            suffix="px"
            placeholder="Thickness"
          />
          <Select
            label="Style"
            propKey={propKey + ".border-style"}
            defaultValue={defaultValues.style as string}
            options={BorderStyleOptions}
          />
        </div>
        <Input
          defaultValue={defaultValues.radius as string}
          propKey={propKey + ".border-radius"}
          type="number"
          suffix="px"
          placeholder="Radius"
        />

        <Sides />
      </div>
    </Section>
  );
};
