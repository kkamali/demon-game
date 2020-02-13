Rails.application.routes.draw do
  resources :affections, only: [:only, :update]
  resources :dialogues, only: [:show]
  resources :summons, only: [:index, :create]
  resources :sacrifices, only: [:index]
  resources :players, only: [:update]
  post '/start', to: 'players#start'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
