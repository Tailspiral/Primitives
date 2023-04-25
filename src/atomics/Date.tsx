import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { Calendar } from "primereact/calendar";
import { useState } from "react";
//@ts-ignore
import styles from "./Date.module.css";
//@ts-ignore
import { useComponentState } from "host/hooks";

type DateProps = {
  propKey: string;
  value: string;
  defaultValue: string;
};

export const DateSetting = ({ propKey, value, defaultValue }: DateProps) => {
  const [date, setDate] = useComponentState(propKey, defaultValue);

  return (
    <Calendar
      value={date}
      style={{
        height: "45px",
      }}
      className={styles.date}
      onChange={(e) => {
        if (typeof e.value === "string") {
          setDate(new Date(e.value));
        } else {
          setDate(e.value as Date);
        }
      }}
      showIcon
    />
  );
};
