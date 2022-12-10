# frozen_string_literal: true

class Booking < ApplicationRecord
  before_create :set_uuid

  validate :has_no_overlap
  validate :finish_after_start

  private

  def finish_after_start
    return unless finish < start

    errors.add(:base, 'Finish has to be later than start')
  end

  def has_no_overlap
    return unless Booking.where('finish > ?', start).where('start <= ?', finish).any?

    errors.add(:base, 'Booking has overlap with existing booking!')
  end

  def set_uuid
    self.id = SecureRandom.uuid
  end
end
