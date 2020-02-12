Rails.application.routes.draw do
  resources :affections
  resources :dialogues
  resources :sacrifices
  resources :summons
  resources :demons
  resources :players
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
