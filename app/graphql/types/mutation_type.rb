module Types
  class MutationType < Types::BaseObject
    field :create_listing, mutation: Mutations::CreateListing
    field :update_listing, mutation: Mutations::UpdateListing
  end
end
