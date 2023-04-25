import React, { useState } from "react";

//@ts-ignore
import { useComponentState } from "host/hooks";

type ParentControlledProps = {
  value: boolean;
  onChange: (newValue: boolean) => void;
  label?: string;
  propKey?: never;
  defaultValue?: never;
};

type SelfControlledProps = {
  propKey: string;
  defaultValue: boolean;
  label: string;
  value?: never;
  onChange?: never;
};

type CheckboxProps = ParentControlledProps | SelfControlledProps;

export const Checkbox = ({
  propKey,
  label = "checkbox",
  defaultValue = false,
  value,
  onChange,
}: CheckboxProps) => {
  // const [checked, setChecked] = useComponentState(propKey, defaultValue);
  const [checked, setChecked] = useState<boolean>(defaultValue || false);

  return (
    <div className="flex items-center gap-3 ">
      <input
        className="hover:cursor-pointer"
        type="checkbox"
        checked={checked}
        onChange={(e) => {
          if (onChange) {
            onChange(e.target.checked);
          } else {
            setChecked(e.target.checked);
          }
        }}
      />
      <label className="text-sm font-medium text-gray-700">{label}</label>
    </div>
  );
};

<Checkbox value={false} onChange={() => {}} />;
