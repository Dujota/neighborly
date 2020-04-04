module Types
  class MutationType < Types::BaseObject
    # User
    field :sign_up, mutation: Mutations::SignUp
    field :sign_in, mutation: Mutations::SignIn

    # Listing
    field :create_listing, mutation: Mutations::CreateListing
    field :update_listing, mutation: Mutations::UpdateListing
    field :delete_listing, mutation: Mutations::DeleteListing
  end
end
