# frozen_string_literal: true

Rails.application.routes.draw do
  mount ActionCable.server => '/cable'
  resources :updates, only: %i(index create)

  root 'bookings#index'
  namespace :api do
    namespace :v1 do
      resources :bookings, only: %i[index create]
      post 'bookings/available_slots', to: 'bookings#available_slots'
    end
  end
end
