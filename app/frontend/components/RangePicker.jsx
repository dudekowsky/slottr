import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function RangePicker(props) {
  function updateDate(date) {
    const newDateAndDuration = { ...props.dateAndDuration };
    newDateAndDuration.date = date;
    props.setDateAndDuration(newDateAndDuration);
  }

  function updateMinutes(event) {
    const newDateAndDuration = { ...props.dateAndDuration };
    newDateAndDuration.minutes = event.target.value;
    props.setDateAndDuration(newDateAndDuration);
  }

  function updateHours(event) {
    const newDateAndDuration = { ...props.dateAndDuration };
    newDateAndDuration.hours = event.target.value;
    props.setDateAndDuration(newDateAndDuration);
  }
  return (
    <>
      <label>Step 1: Select a date and duration</label>
      <div className="rangepicker">
        <DatePicker
          selected={props.dateAndDuration.date}
          onChange={(date) => updateDate(date)}
        />
        <div className="timepicker">
          <div className="hourspicker">
            <span>Hours:</span>
            <input
              type="number"
              id="slot_duration_hours"
              value={props.dateAndDuration.hours}
              min="0"
              max="23"
              pattern="[0-9]+"
              onChange={updateHours}
            />
          </div>
          <div className="minutespicker">
            <span>Minutes:</span>
            <input
              type="number"
              id="slot_duration_minutes"
              value={props.dateAndDuration.minutes}
              min="0"
              max="59"
              pattern="[0-9]+"
              onChange={updateMinutes}
            />
          </div>
        </div>
      </div>
    </>
  );
}
