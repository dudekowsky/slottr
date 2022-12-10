import React from 'react';
import RangePicker from './RangePicker'
import { toast, Toaster } from 'react-hot-toast';
import useActionCable from '../hooks/useActionCable';
import useChannel from '../hooks/useChannel';
import './App.css'

const App = () => {
  const [slots, setSlots] = React.useState([]);
  const [dateAndDuration, setDateAndDuration] = React.useState({
    date: new Date(),
    minutes: "15",
    hours: "0"
  })
  const [selectedSlot, setSelectedSlot] = React.useState('')
  const callbackRef = React.useRef(true)
  const {actionCable} = useActionCable(`ws://${window.location.host}/cable`)
  const {subscribe, unsubscribe, send} = useChannel(actionCable)

  React.useEffect(() => {
    subscribe({channel: 'UpdatesChannel'}, {
      received: (x) => {
        getAvailableSlots()
      }
    })
    return () => {
      unsubscribe()
    }
  }, [])

  React.useEffect(() => {
    if (callbackRef.current) {
      getAvailableSlots()
      callbackRef.current = null
    }
  })

  function setDateAndDurationWithHook(state) {
    setDateAndDuration(state)
    callbackRef.current = state
  }
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
    .then((res) => {
      setSlots(res.slots)
      if (res.slots.indexOf(selectedSlot) == -1) {
        setSelectedSlot('')
      }
    });
  }

  function selectSlot(event) {
    const slot = event.target.defaultValue
    if (slot != selectedSlot) {
      setSelectedSlot(slot)
    } else {
      setSelectedSlot('')
    }
  }

  function mapSlots(slots) {
    return slots.map((slot) => {
      const date = new Date(slot)
      return (
        <label key={slot} className={(slot == selectedSlot) ? "slot selected" : "slot"}>
          <input key={slot} className="slotcheckbox" checked={slot === selectedSlot} type="checkbox" onChange={selectSlot} value={slot}/>
          {date.toISOString().substring(11, 16)}
        </label>
      )})
  };

  function bookSlot() {
    const start = new Date(selectedSlot)
    const minutes = dateAndDuration.minutes
    const hours = dateAndDuration.hours
    const finish = new Date(start.getTime() + (3600 * 1000 * hours) + (60 * 1000 * minutes) )

    const url = '/api/v1/bookings/';
    const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        'X-CSRF-Token': csrf
      },
      body: JSON.stringify({
        start: selectedSlot,
        finish: finish
      }),
    }
    fetch(url, options)
    .then(function(response) {
      if (!response.ok) {
          throw Error(response.statusText);
      }
      return response;
    }).then(function(response) {
        toast.success('Successfully booked!');
    }).catch(function(error) {
        toast.error('Booking did not work');
    })
    .then(() => {
      setSelectedSlot('')
      getAvailableSlots()
    })
  }

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false}/>
      <div className="container">
        <div className="controls">
          <RangePicker dateAndDuration={dateAndDuration} setDateAndDuration={setDateAndDurationWithHook}/>
          <button className="book-button" disabled={selectedSlot == ''} onClick={bookSlot}>Book now!</button>
        </div>
        <div className="slotpicker">
          Step 2: Select a start time
          <div className="slotscontainer">
            {mapSlots(slots)}
          </div>
        </div>
      </div>
    </>

  );
};

export default App;