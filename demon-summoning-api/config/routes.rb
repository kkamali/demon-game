Rails.application.routes.draw do
  resources :affections, only: [:only, :edit]
  resources :dialogues, only: [:show]
  resources :summons, only: [:index, :create]
  resources :players, only: [:show, :create]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
