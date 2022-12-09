Rails.application.routes.draw do
  root "bookings#index"
  namespace :api do
    namespace :v1 do
      resources :bookings, only: [:index]
      get 'bookings/available_slots', to: 'bookings#available_slots'
    end
  end
end
