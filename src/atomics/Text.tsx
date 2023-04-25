import React from "react";
import { Input } from "./Input";

type TextProps = {
  propKey: string;
  label: string;
  defaultValue?: string;
};

export const Text = ({ propKey, label, defaultValue = "Click Here" }: TextProps) => {
  return <Input type="text" placeholder={label} defaultValue={defaultValue} propKey={propKey} />;
};
