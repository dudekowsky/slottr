# frozen_string_literal: true

class Booking < ApplicationRecord
  before_create :set_uuid

  validate :has_no_overlap

  private

  def has_no_overlap
    return unless Booking.where('finish > ?', start).where('start <= ?', finish).any?

    errors.add(:base, 'Booking has overlap with existing booking!')
  end

  def set_uuid
    self.id = SecureRandom.uuid
  end
end
