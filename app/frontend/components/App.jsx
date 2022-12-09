import React from 'react';
import RangePicker from './RangePicker'

const App = () => {
  const [slots, setSlots] = React.useState([]);
  const [dateAndDuration, setDateAndDuration] = React.useState({
    date: new Date(),
    minutes: "15",
    hours: "0"
  })

  function getAvailableSlots() {
    const url = '/api/v1/bookings/available_slots';
    const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        'X-CSRF-Token': csrf
      },
      body: JSON.stringify({
        date_and_duration: dateAndDuration
      }),
    }
    fetch(url, options)
    .then((res) => res.json())
    .then((res) => setSlots(res.slots));
  }

  function mapSlots(slots) {
    return slots.map((slot, index) => (<p key={index}>{slot}</p>))
  };

  function logDate() {
    console.log(dateAndDuration)
  }

  return (
    <>
      <RangePicker dateAndDuration={dateAndDuration} setDateAndDuration={setDateAndDuration}/>
      <div>
        <button onClick={() => logDate()}>Log Date</button>
        <button onClick={() => getAvailableSlots()}>Get slots</button>
        {mapSlots(slots)}
      </div>
    </>

  );
};

export default App;