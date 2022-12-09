class AvailableSlotsFinder
  DELTA_MINUTES = 15

  def self.call(params)
    new(params).call
  end

  def initialize(params)
    @params = params
    @date = Date.parse params[:date]
    @duration = ActiveSupport::Duration.parse("P0Y0M0DT#{params[:hours]}H#{params[:minutes]}M")
    @beginning_of_day = @date.beginning_of_day
    @end_of_day = @date.end_of_day
  end

  def call
    slots = []
    slot_delta_time = ActiveSupport::Duration.parse("PT#{DELTA_MINUTES}M")

    (1.day.in_minutes / DELTA_MINUTES).to_i.times do |i|
      slots << @beginning_of_day + (i * slot_delta_time)
    end

    existing_bookings = Booking.where('finish > ?', @beginning_of_day).where('start <= ?', @end_of_day + @duration)

    slots.reject do |slot|
      existing_bookings.any? { |booking| booking.finish > slot && booking.start < (slot + @duration) }
    end
  end
end
