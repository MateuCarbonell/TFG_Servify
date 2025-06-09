"use client";

import { MiddlewareReturn } from "@floating-ui/core";
import { MiddlewareState } from "@floating-ui/dom";
import { MiddlewareReturn } from "@floating-ui/core";
import { MiddlewareState } from "@floating-ui/dom";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  value: Date | null;
  onChange: (date: Date | null) => void;
};

export default function FechaHoraPicker({ value, onChange }: Props) {
  return (
    <DatePicker
      selected={value}
      onChange={onChange}
      showTimeSelect
      timeIntervals={15}
      dateFormat="Pp"
      minDate={new Date()}
      placeholderText="Selecciona fecha y hora"
      className="w-full px-3 py-2 border rounded-md shadow-sm text-sm"
      popperClassName="z-50 datepicker-popper"
      popperPlacement="top-start"
      popperModifiers={[
        {
          name: "preventOverflow",
          options: {
            altAxis: false,
          },
          fn: function (state: MiddlewareState): MiddlewareReturn | Promise<MiddlewareReturn> {
            throw new Error("Function not implemented.");
          }
        },
        {
          name: "flip",
          options: {
            fallbackPlacements: [], // ❌ No permitas que se voltee
          },
          fn: function (state: MiddlewareState): MiddlewareReturn | Promise<MiddlewareReturn> {
            throw new Error("Function not implemented.");
          }
        },
      ]}
    />
  );
}
