import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function RangePicker() {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <>
      <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
      <div>
        <span>Hours</span>
        <input type="number" id="slot_duration_hours" min="0" max="23" pattern="[0-9]+" />
      </div>
      <div>
        <span>Minutes</span>
        <input type="number" id="slot_duration_minutes" min="0" max="59" pattern="[0-9]+" />
      </div>
    </>
  );
};