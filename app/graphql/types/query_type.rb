module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :listings,
          [Types::ListingType],
          null: false,
          description: "Returns all the listings in neighbourly"

    def listings
      Listing.includes(:user)
    end

    field :listing, Types::ListingType, null: false do
      argument :id, ID, required: true
    end

    def listing(id:)
      listing.find(id)
    end

    field :me,
          Types::UserType,
          null: true,
          description: "the current user"

    def me
      context[:current_user]
    end
  end
end
