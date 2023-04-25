import React, { useState } from "react";
//@ts-ignore
import { useComponentState } from "host/hooks";
import { Section, Input } from "./atomics";
import { Number } from "./atomics/Number";
import { Divider } from "./atomics/Divider";
// TODO: finish

type PaddingProps = {
  propKey?: string;
  label?: string;
  defaultValue?: {
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
    full?: boolean;
  };
};

/**
 *
 * `propKey` - the initial starting point for injection
 *  e.g. `propKey="padding"` will inject `padding.left`, `padding.right`, etc.
 *
 *  Injections:
 *  - `propKey.left`
 *  - `propKey.right`
 *  - `propKey.top`
 *  - `propKey.bottom`
 */
export const Padding = ({ propKey = "style", label = "Padding", defaultValue }: PaddingProps) => {
  const defaultValues = {
    left: 5,
    right: 5,
    top: 5,
    bottom: 5,
    full: false,
    ...defaultValue,
  };

  const [showFull, setShowFull] = useComponentState("_padding.showFull", defaultValues?.full);

  const [padding, setPadding] = useComponentState(
    propKey + ".padding",
    defaultValues?.full
      ? `${defaultValues.top}px ${defaultValues.right}px ${defaultValues.bottom}px ${defaultValues.left}px`
      : `${defaultValues.top}px ${defaultValues.right}px`
  );

  return (
    <Section
      label={label}
      settings={[
        {
          label: showFull ? "h/v" : "full",
          action: () => {
            setShowFull(!showFull);
          },
        },
      ]}
    >
      <div className="flex gap-2 flex-col w-full">
        <div className="flex gap-2 w-full">
          {showFull ? (
            <>
              <div className="flex gap-2 w-full flex-col">
                {[
                  {
                    name: "left",
                    value: "padding-left",
                  },
                  {
                    name: "right",
                    value: "padding-right",
                  },
                ].map((side) => {
                  const values = padding.replaceAll("px", "").split(" ");

                  return (
                    <Input
                      type="number"
                      placeholder={side.name[0].toUpperCase() + side.name.slice(1)}
                      suffix="px"
                      value={values.length === 4 ? values[side.name === "left" ? 3 : 1] : values[1]}
                      onChange={(value) => {
                        const paddingArray = padding.split(" ");
                        if (side.name === "left") {
                          paddingArray[3] = value + "px";
                        } else {
                          paddingArray[1] = value + "px";
                        }

                        setPadding(paddingArray.join(" "));
                      }}
                    />
                  );
                })}
              </div>

              <div className="flex gap-2 w-full flex-col">
                {[
                  {
                    name: "top",
                    value: "padding-top",
                  },
                  {
                    name: "bottom",
                    value: "padding-bottom",
                  },
                ].map((side) => {
                  const values = padding.replaceAll("px", "").split(" ");
                  return (
                    <Input
                      type="number"
                      placeholder={side.name[0].toUpperCase() + side.name.slice(1)}
                      suffix="px"
                      value={values.length === 4 ? values[side.name === "top" ? 0 : 2] : values[0]}
                      onChange={(value) => {
                        const paddingArray = padding.split(" ");
                        if (side.name === "top") {
                          paddingArray[0] = value + "px";
                        } else {
                          paddingArray[2] = value + "px";
                        }

                        setPadding(paddingArray.join(" "));
                      }}
                    />
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <Input
                placeholder="Horizontal"
                type="number"
                suffix="px"
                value={parseInt(padding.split(" ")[1])}
                onChange={(value) => {
                  const paddingArray = padding.split(" ");
                  paddingArray[1] = value + "px";
                  paddingArray[3] = value + "px";
                  setPadding(paddingArray.join(" "));
                }}
              />
              <Input
                type="number"
                placeholder="Vertical"
                suffix="px"
                value={parseInt(padding.split(" ")[0])}
                onChange={(value) => {
                  const paddingArray = padding.split(" ");
                  paddingArray[0] = value + "px";
                  paddingArray[2] = value + "px";
                  setPadding(paddingArray.join(" "));
                }}
              />
            </>
          )}
        </div>
      </div>
    </Section>
  );
};
