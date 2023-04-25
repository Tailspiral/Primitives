// TODO: finish

import { Input, Section, Select } from "./atomics";
import { Divider } from "./atomics/Divider";
//@ts-ignore
import { useComponentState } from "host/hooks";
type LayoutDefault = {
  spacing?: "packed" | "between";
  gap?: number;
  direction?: "horizontal" | "vertical";
};
type LayoutProps = {
  propKey: string;
  defaultValue: LayoutDefault;
};

/**
 *
 * `propKey` - the initial starting point for injection
 * e.g. `propKey="layout"` will inject `layout.left`, `layout.right`, etc.
 *
 * injections:
 * - `propKey.spacing`
 * - `propKey.gap`
 * - `propKey.direction`
 *
 */
export const Layout = ({ propKey, defaultValue }: LayoutProps) => {
  const defaultValues: LayoutDefault = {
    spacing: "packed",
    gap: 10,
    direction: "horizontal",
    ...defaultValue,
  };

  return (
    <Section label="Layout" settings={[]}>
      <div className="flex gap-2 flex-col w-full">
        <div className="flex gap-2 w-full h-full justify-center  items-center">
          <div className="flex gap-2 w-2/3 flex-col  h-fit">
            <Select
              options={[
                { label: "Horizontal", value: "horizontal" },
                { label: "Vertical", value: "vertical" },
              ]}
              defaultValue={defaultValues.direction as "horizontal" | "vertical"}
              label="Direction"
              propKey={propKey + ".direction"}
            />
            <Select
              options={[
                { label: "Packed", value: "packed" },
                { label: "Between", value: "between" },
              ]}
              defaultValue={defaultValues.spacing as "packed" | "between"}
              label="Spacing"
              propKey={propKey + ".spacing"}
            />
            <Input
              propKey={propKey + ".gap"}
              defaultValue={defaultValues.gap as number}
              placeholder="Gap"
              suffix="px"
            />
          </div>
          <div className="flex w-1/3 justify-center items-center">
            <div className="w-[180px] h-[180px] bg-black"></div>
          </div>
        </div>
      </div>
    </Section>
  );
};
