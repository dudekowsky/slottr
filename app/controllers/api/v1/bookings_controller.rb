class Api::V1::BookingsController < ApplicationController
  def index
    @bookings = Booking.all
    render json: @bookings
  end

  def create
    Booking.create!(create_params)
  end

  def available_slots
    slots = []
    delta_minutes = 15
    slot_delta_time = ActiveSupport::Duration.parse("PT#{delta_minutes}M")
    (1440 / delta_minutes).times do |i|
      slots << Time.zone.today.beginning_of_day + (i * slot_delta_time)
    end

    render json: { slots: slots }
  end

  private

  def create_params
    params.permit(:booking).require(:start_at, :end_at)
  end

  def available_params
    params.permit(:booking).require(:date, :duration)
  end
end
