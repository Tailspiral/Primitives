// TODO: finish

import { ColorSetting, Input, Section, Select } from "./atomics";
import { Divider } from "./atomics/Divider";

type TypographyDefault = {
  fontFamily?: string;
  fontSize?: number;
  color?: string;
  fontWeight?: "normal" | "semi-bold" | "bold" | "bolder" | "lighter";
};

type TypographyProps = {
  label?: string;
  defaultValue?: TypographyDefault;
  propKey?: string;
};

/**
 *
 * `propKey` - the initial starting point for injection
 * e.g. `propKey="typography"` will inject `typography.fontFamily` etc.
 *
 * injections:
 * - `propKey.fontFamily`
 * - `propKey.fontSize`
 * - `propKey.fontWeight`
 * - `propKey.color`
 *
 */
export const Typography = ({
  propKey = "style",
  label = "Typography",
  defaultValue,
}: TypographyProps) => {
  const defaultValues: TypographyDefault = {
    fontFamily: "Arial",
    fontSize: 16,
    color: "#333",
    fontWeight: "normal",
    ...defaultValue,
  };

  return (
    <Section settings={[]} label={label}>
      <div className="flex gap-3 flex-col">
        <Select
          options={[
            { label: "Arial", value: "Arial" },
            { label: "Helvetica", value: "Helvetica" },
            { label: "Times New Roman", value: "Times New Roman" },
          ]}
          defaultValue="Arial"
          label="Font Family"
          propKey={propKey + ".fontFamily"}
        />
        <div className="flex gap-2">
          <Input
            propKey={propKey + ".fontSize"}
            defaultValue={defaultValues.fontSize as number}
            placeholder="Font Size"
            type="number"
            suffix="px"
          />
          <Select
            options={[
              { label: "Lighter", value: "lighter" },
              { label: "Normal", value: "normal" },
              { label: "Semi-Bold", value: "semibold" },
              { label: "Bold", value: "bold" },
              { label: "Bolder", value: "bolder" },
            ]}
            defaultValue="normal"
            label="Font Weight"
            propKey={propKey + ".fontWeight"}
          />
        </div>
        <ColorSetting
          defaultValue={defaultValues.color as string}
          label="Color"
          propKey={propKey + ".color"}
        />
      </div>
    </Section>
  );
};
