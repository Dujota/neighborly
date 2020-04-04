module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :listings,
          # [Type] represents a list of Types
          [Types::ListingType],
          null: false,
          description: "Returns all the listings in neighbourly"

    def listings
      # Not Ideal, but preload users with Listings to solve N+1, look at batch loading.
      Listing.includes(:user)
    end

    field :listing,
          # Singular Type
          Types::ListingType,
          null: true,
          description: "Returns a listing in neighbourly based on an id" do
      argument :id, ID, required: true
    end

    def listing(id:)
      Listing.find id
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
