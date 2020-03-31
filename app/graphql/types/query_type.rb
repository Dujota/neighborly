module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :listings,
          [Types::ListingType],
          null: false,
          description: "Returns all the listings in neighbourly"

    def listings
      Listing.all
    end
  end
end
