import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { Color, ColorResult, SketchPicker } from "react-color";
import { useOnClickOutside } from "../hooks/useOutsideClick";

//@ts-ignore
import { useComponentState } from "host/hooks";
//@ts-ignore
import { useWebsiteStore } from "host/store";

type WebsiteStore = {
  colors: { value: string; name: string }[];
  addColor: any;
  removeColor: any;
  updateColor: any;
};

type ColorProps = {
  propKey: string;
  defaultValue?: Color;
  label: string;
};

type ColorPickerProps = {
  colors: { value: Color; name: string }[];
  color: Color;
  id: string;
  setColor: any;
};

const SerializedColor = (color: Color) => {
  // check if object
  if (typeof color === "object") {
    //@ts-ignore
    return `rgba(${color.r},${color.g},${color.b},${color?.a || 0})`;
  } else {
    return color;
  }
};

const ColorPicker = ({ id, colors, color, setColor }: ColorPickerProps) => {
  const [internalColor, setInternalColor] = useState<Color>(color);
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useOnClickOutside(() => {
    setColor(SerializedColor(internalColor));

    setShowPicker(false);
  });

  useEffect(() => {
    setInternalColor(color);
  }, [color]);

  return (
    <div
      id={id}
      className={classNames(
        "w-7 h-7 relative rounded-full shadow-md  border-2 ",
        "hover:shadow-lg hover:cursor-pointer",
        showPicker ? "border-[#2979FF] " : " border-gray-200 hover:border-[#7aabff]"
      )}
      onClick={(e) => {
        e.stopPropagation();
        if (!showPicker) {
          setShowPicker(true);
        }
      }}
      style={{ backgroundColor: SerializedColor(internalColor) }}
    >
      {showPicker && (
        <div ref={pickerRef}>
          <SketchPicker
            className="absolute z-50 right-0 top-8"
            color={internalColor}
            presetColors={colors.map((color) => {
              return {
                color: SerializedColor(color.value),
                title: color.name,
              };
            })}
            onChange={(color) => {
              setInternalColor(color.rgb);
            }}
          />
        </div>
      )}
    </div>
  );
};
export const ColorSetting = ({
  propKey,
  defaultValue = "rgb(0,0,0,1)",
  label = "Color",
}: ColorProps) => {
  const { colors }: WebsiteStore = useWebsiteStore();
  const [color, setColor] = useComponentState(propKey, defaultValue);

  //const [color, setColor] = useState(defaultValue);
  //const colors = [{ value: "rgb(0,0,0,1)", name: "black" }];

  return (
    <div className="flex gap-2 h-10 w-full px-2 items-center">
      <div className="flex w-full gap-2">
        <label className="font-medium font-inter">{label} </label>
      </div>
      <ColorPicker id={propKey} colors={colors} color={color} setColor={setColor} />
    </div>
  );
};
