# frozen_string_literal: true

class Booking < ApplicationRecord
  before_create :set_uuid

  private

  def set_uuid
    self.id = SecureRandom.uuid
  end
end
