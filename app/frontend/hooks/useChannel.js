import React from "react";

// // Needed for @rails/actioncable
// global.addEventListener = () => {};
// global.removeEventListener = () => {};

export default function useChannel(actionCable) {
  const [connected, setConnected] = React.useState(false);
  const [subscribed, setSubscribed] = React.useState(false);
  const channelRef = React.useRef();

  React.useEffect(() => {
    return () => {
      unsubscribe();
    };
  }, []);

  const send = (type, payload) => {
    if (subscribed && !connected) throw "useChannel - ERROR: not connected";
    if (!subscribed) throw "useChannel - ERROR: not subscribed";
    try {
      channelRef.current.perform(type, payload);
    } catch (e) {
      throw "useChannel - ERROR: " + e;
    }
  };

  const unsubscribe = () => {
    setSubscribed(false);
    if (channelRef.current) {
      console.log(
        "useChannel - INFO: Unsubscribing from " + channelRef.current.identifier
      );
      actionCable.subscriptions.remove(channelRef.current);
      channelRef.current = null;
    }
  };

  const subscribe = (data, callbacks) => {
    console.log(`useChannel - INFO: Connecting to ${data.channel}`);
    const channel = actionCable.subscriptions.create(data, {
      received: (x) => {
        if (callbacks.received) callbacks.received(x);
      },
      initialized: () => {
        console.log("useChannel - INFO: Init " + data.channel);
        setSubscribed(true);
        if (callbacks.initialized) callbacks.initialized();
      },
      connected: () => {
        console.log("useChannel - INFO: Connected to " + data.channel);
        setConnected(true);
        if (callbacks.connected) callbacks.connected();
      },
      disconnected: () => {
        console.log("useChannel - INFO: Disconnected");
        setConnected(false);
        if (callbacks.disconnected) callbacks.disconnected();
      },
    });
    channelRef.current = channel;
  };

  return { subscribe, unsubscribe, send };
}
