class UpdatesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "updates_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
