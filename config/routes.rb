# frozen_string_literal: true

Rails.application.routes.draw do
  root 'bookings#index'
  namespace :api do
    namespace :v1 do
      resources :bookings, only: [:index, :create]
      post 'bookings/available_slots', to: 'bookings#available_slots'
    end
  end
end
