import { useState } from "react";
import { Input } from "./Input";
//@ts-ignore
import { useComponentState } from "host/hooks";
type NumberProps = {
  key: string;
  label?: string;
  defaultValue?: number;
  min?: number;
  max?: number;
  suffix?: string;
  step?: number;
};

export const Number = ({
  key,
  label = "Number",
  defaultValue = 0,
  min,
  suffix = "",
  max,
  step = 1,
}: NumberProps) => {
  //const [value, setValue] = useState(defaultValue);
  const [value, setValue] = useComponentState(key, defaultValue);

  const handleChange = (value: number) => {
    if (min && value < min) {
      setValue(min);
      return;
    }
    if (max && value > max) {
      setValue(max);
      return;
    }
    setValue(value);
  };

  return (
    <div className="flex gap-2  w-full">
      <Input
        type="number"
        suffix={suffix}
        value={value}
        placeholder={label}
        onChange={(value) => handleChange(value as number)}
      />
    </div>
  );
};
