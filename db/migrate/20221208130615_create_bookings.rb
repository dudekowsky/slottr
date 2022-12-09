class CreateBookings < ActiveRecord::Migration[7.0]
  def change
    create_table :bookings, id: false do |t|
      t.string :id, primary_key: true # use UUIDs

      t.datetime :start
      t.datetime :finish
    end
  end
end
