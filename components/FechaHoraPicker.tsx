// components/FechaHoraPicker.tsx
"use client";

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
    />
  );
}
