import React, { useCallback, useReducer, useState } from "react";
import { Input, Section, Select } from "./atomics";
import { Divider } from "./atomics/Divider";
import { DeepPartial } from "./utils";
//@ts-ignore
import { useComponentState } from "host/hooks";
// TODO: finish

type DimensionsDefault = {
  widthType: "fit" | "fixed" | "fill";
  heightType: "fit" | "fixed" | "fill";
  width: string;
  actualWidth: string;
  height: string;
  actualHeight: string;
  widthSuffix: string;
  heightSuffix: string;
};
type DimensionProps = {
  propKey: string;
  label?: string;
  defaultValue: DeepPartial<DimensionsDefault>;
};

type ReducerAction = {
  type: "set" | "reset";
  payload: {
    [key: string]: any;
  };
};

const reducer = (state: DimensionsDefault, action: ReducerAction) => {
  let tempState: any = { ...state };

  switch (action.type) {
    case "set":
      const entries = Object.entries(action.payload);
      entries.forEach(([key, value]) => {
        if (key === "widthType" && value === "fill") {
          if (!tempState.actualWidth) tempState.actualWidth = tempState.width;
          tempState.width = "100%";
          tempState.widthType = "fill";
        } else if (key === "heightType" && value === "fill") {
          if (!tempState.actualHeight) tempState.actualHeight = tempState.height;
          tempState.height = "100%";
          tempState.heightType = "fill";
        } else if (key === "heightType" && value === "fit") {
          if (!tempState.actualHeight) tempState.actualHeight = tempState.height;
          tempState.height = "minContent";
          tempState.heightType = "fit";
        } else if (key === "widthType" && value === "fit") {
          if (!tempState.actualWidth) tempState.actualWidth = tempState.width;
          tempState.width = "minContent";
          tempState.widthType = "fit";
        } else if (key === "widthType" && value === "fixed") {
          if (tempState.actualWidth) tempState.width = tempState.actualWidth;
          tempState.actualWidth = null;
          tempState.widthType = "fixed";
        } else if (key === "heightType" && value === "fixed") {
          if (tempState.actualHeight) tempState.height = tempState.actualHeight;
          tempState.actualHeight = null;
          tempState.heightType = "fixed";
        } else {
          tempState[key] = value;
        }
      });
      return tempState;
    case "reset":
      return action.payload;
    default:
      return state;
  }
};
const useComponentReducer = (reducer: any, key: string, initialState: any) => {
  //@ts-ignore
  const [state, setState] = useComponentState(key, initialState);

  const dispatch = (action: ReducerAction) => {
    const newState = reducer(state, action);
    console.log("newState", newState);
    setState(newState);
  };

  return [state, dispatch];
};

/**
 *
 * `propKey` - the initial starting point for injection
 * e.g. `propKey="dimensions"` will result in dimensions.width, dimensions.height, etc.
 *
 * injections:
 * - `propKey.heighttype`
 * - `propKey.widthtype`
 * - `propKey.height`
 * - `propKey.width`
 *
 */
export const Dimensions = ({ propKey, label = "Dimensions", defaultValue }: DimensionProps) => {
  // const [state, dispatch] = useComponentReducer(reducer, propKey, {
  //   widthType: "fit",
  //   heightType: "fit",
  //   width: "0px",
  //   actualWidth: "0px",
  //   actualHeight: "0px",
  //   height: "0px",
  //   widthSuffix: "px",
  //   heightSuffix: "px",
  //   ...defaultValue,
  // });

  const defaultValues = {
    widthType: "fit",
    heightType: "fit",
    width: "0px",
    actualWidth: "0px",
    actualHeight: "0px",
    height: "0px",
    widthSuffix: "px",
    heightSuffix: "px",
    ...defaultValue,
  };

  const [widthType, setWidthType] = useComponentState(
    propKey + ".widthType",
    defaultValue.widthType
  );
  const [heightType, setHeightType] = useComponentState(
    propKey + ".heightType",
    defaultValue.heightType
  );
  const [width, setWidth] = useComponentState(propKey + ".width", defaultValues.width);
  const [height, setHeight] = useComponentState(propKey + ".height", defaultValues.height);
  const [actualWidth, setActualWidth] = useComponentState(
    propKey + ".actualWidth",
    defaultValues.actualWidth
  );
  const [actualHeight, setActualHeight] = useComponentState(
    propKey + ".actualHeight",
    defaultValues.actualHeight
  );
  const [widthSuffix, setWidthSuffix] = useComponentState(
    propKey + ".widthSuffix",
    defaultValues.widthSuffix
  );
  const [heightSuffix, setHeightSuffix] = useComponentState(
    propKey + ".heightSuffix",
    defaultValues.heightSuffix
  );

  /*

  const [state, dispatch] = useReducer(reducer, {
    widthType: "fit",
    heightType: "fit",
    width: 0,
    height: 0,
    widthSuffix: "px",
    heightSuffix: "px",
    ...defaultValue,
  });
  */

  return (
    <Section settings={[]} label={label}>
      <div className="flex gap-2 flex-col">
        <div className="flex gap-2">
          <Select
            options={[
              { label: "Fit", value: "fit" },
              { label: "Fixed", value: "fixed" },
              { label: "Fill", value: "fill" },
            ]}
            label="Height Type"
            //value={state.heightType}
            value={heightType.replace("px", "")}
            //onChange={(value) => dispatch({ type: "set", payload: { heightType: value } })}
            onChange={(value) => {
              if (value === "fill") {
                if (!actualHeight) setActualHeight(height);
                setHeight("100%");
                setHeightType("fill");
              }

              if (value === "fit") {
                if (!actualHeight) setActualHeight(height);
                setHeight("min-content");
                setHeightType("fit");
              }

              if (value === "fixed") {
                if (actualHeight) setHeight(actualHeight);
                setActualHeight(null);
                setHeightType("fixed");
              }
            }}
          />

          <Select
            options={[
              { label: "Fit", value: "fit" },
              { label: "Fixed", value: "fixed" },
              { label: "Fill", value: "fill" },
            ]}
            label="Width Type"
            //value={state.widthType}
            //onChange={(value) => dispatch({ type: "set", payload: { widthType: value } })}
            value={widthType.replace("px", "")}
            onChange={(value) => {
              if (value === "fill") {
                if (!actualWidth) setActualWidth(width);

                setWidth("100%");
                setWidthType("fill");
              }

              if (value === "fit") {
                if (!actualWidth) setActualWidth(width);
                setWidth("min-content");
                setWidthType("fit");
              }

              if (value === "fixed") {
                if (actualWidth) setWidth(actualWidth);
                setActualWidth(null);
                setWidthType("fixed");
              }
            }}
          />
        </div>
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Height"
            //value={state.height.replace("px", "")}
            //suffix={state.heightSuffix}
            //disabled={state.heightType !== "fixed"}
            //onChange={(value) => dispatch({ type: "set", payload: { height: value + "px" } })}
            value={height.replace("px", "")}
            suffix={heightSuffix}
            disabled={heightType !== "fixed"}
            onChange={(value) => setHeight(value + "px")}
          />
          <Input
            type="number"
            placeholder="Width"
            //value={state.width.replace("px", "")}
            //suffix={state.widthSuffix}
            //disabled={state.widthType !== "fixed"}
            //onChange={(value) => dispatch({ type: "set", payload: { width: value + "px" } })}
            value={width.replace("px", "")}
            suffix={widthSuffix}
            disabled={widthType !== "fixed"}
            onChange={(value) => setWidth(value + "px")}
          />
        </div>
      </div>
    </Section>
  );
};
