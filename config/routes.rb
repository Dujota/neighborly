Rails.application.routes.draw do
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end
  post "/graphql", to: "graphql#execute"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  # Disable devise routes until further notice
  devise_for :users

  root "listing#index"
  get "/listingInfo/:id", to: "listing#show"
end
