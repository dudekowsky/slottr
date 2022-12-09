import React from 'react';
import RangePicker from './RangePicker'

const App = () => {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    fetch('/api/v1/bookings/available_slots')
    .then((res) => res.json())
    .then((data) => setData(data.slots));
  }, []);

  const mapSlots = (slots) => {
    return slots.map((slot) => (<p>{slot}</p>))
  };
  return (
    <>
      <RangePicker/>
      <div>
        {mapSlots(data)}
      </div>
    </>

  );
};

export default App;