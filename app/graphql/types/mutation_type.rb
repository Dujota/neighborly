module Types
  class MutationType < Types::BaseObject
    field :create_listing, mutation: Mutations::CreateListing
  end
end
