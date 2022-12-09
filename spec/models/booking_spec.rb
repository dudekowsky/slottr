# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Booking, type: :model do
  it 'does not create 2 overlapping bookings' do
    expect(Booking.count).to eq 0
    Booking.create(start: Date.today.beginning_of_day, finish: Date.today.beginning_of_day + 20.minutes)
    expect(Booking.count).to eq 1
    expect do
      Booking.create(start: Date.today.beginning_of_day + 19.minutes,
                     finish: (Date.today.beginning_of_day + 30.minutes))
    end.not_to(change { Booking.count })
  end
end
