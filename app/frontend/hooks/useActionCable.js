import React from "react";
import { createConsumer } from "@rails/actioncable";

export default function useActionCable(url) {
  const actionCable = React.useMemo(() => createConsumer(url), []);

  React.useEffect(() => {
    return () => {
      console.log("Disconnect Action Cable");
      actionCable.disconnect();
    };
  }, []);

  return { actionCable };
}
