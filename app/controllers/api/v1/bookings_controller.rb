# frozen_string_literal: true

module Api
  module V1
    class BookingsController < ApplicationController
      def create
        Booking.create!(create_params)
        ActionCable.server.broadcast('updates_channel', { body: 'slots-updated'})
        render json: {}
      end

      def available_slots
        render json: { slots: AvailableSlotsFinder.call(available_params) }
      end

      private

      def create_params
        params.require(:booking).permit(:start, :finish)
      end

      def available_params
        params.require('date_and_duration').permit(:date, :hours, :minutes)
      end
    end
  end
end
