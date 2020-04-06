Rails.application.routes.draw do
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end
  post "/graphql", to: "graphql#execute"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  # Disable devise routes until further notice
  devise_for :users, :path_names => {
                       :sign_in => "signin",
                       :sign_out => "signout",
                       :sign_up => "signup",
                     }

  # SESSIONS AND REGISTRATIONS
  get "/signin" => redirect("/users/signin")
  get "/signup" => redirect("/users/signup")
  get "/register" => redirect("/users/signup")

  root "listing#index"
  get "/listing", to: "listing#show"
end
