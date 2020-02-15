Rails.application.routes.draw do
  resources :affections, only: [:only, :update]
  resources :dialogues, only: [:show]
  resources :summons, only: [:create]  do
    resources :dialogues, only: [:show]
  end
  resources :sacrifices, only: [:index]
  resources :players, only: [:update] do
    resources :summons, only: [:index]
  end
  post '/start', to: 'players#start'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
