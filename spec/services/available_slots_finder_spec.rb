# frozen_string_literal: true

require 'rails_helper'

RSpec.describe AvailableSlotsFinder do
  let(:date) { '2022-12-09T20:04:27.901Z' }
  let(:date_of_day_before) { '2022-12-08T20:04:27.901Z' }
  let(:date_of_next_day) { '2022-12-10T20:04:27.901Z' }
  let(:twenty_minutes) { '20' }
  let(:hours) { '0' }
  let(:params) { { date:, minutes: twenty_minutes, hours: } }

  it 'returns all slots when no booking exists' do
    expect(described_class.call(params).length).to eq(96)
  end

  it 'returns all slots except the first one' do
    Booking.create(start: Date.parse(date).beginning_of_day, finish: Date.parse(date).beginning_of_day + 15.minutes)
    expect(described_class.call(params).length).to eq(95)
  end

  it 'returns all slots except the first one if booking from day before exists' do
    Booking.create(start: Date.parse(date_of_day_before).end_of_day,
                   finish: Date.parse(date_of_day_before).end_of_day + 15.minutes)
    expect(described_class.call(params).length).to eq(95)
  end

  it 'returns all slots except the last one if booking from next day exists' do
    Booking.create(start: Date.parse(date_of_next_day).beginning_of_day,
                   finish: Date.parse(date_of_next_day).beginning_of_day + 15.minutes)
    expect(described_class.call(params).length).to eq(95)
  end

  it 'returns all slots except the first two' do
    Booking.create(start: Date.parse(date).beginning_of_day, finish: Date.parse(date).beginning_of_day + 29.minutes)
    expect(described_class.call(params).length).to eq(94)
  end
end
