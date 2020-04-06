module Mutations
  class DeleteListing < BaseMutation
    description "Removes a Listing"

    argument :id, ID, required: true

    field :listing, Types::ListingType, null: true

    def resolve(id:)
      # Check for ability before the delete
      listing = Listing.find id

      if !authorize_user(:destroy, listing)
        raise GraphQL::ExecutionError, "Unauthorized operation"
      end

      if listing.destroy
        {
          listing: listing,
        }
      else
        {
          errors: listings.errors.full_messages,
        }
      end

      # Record Not Found
    rescue ActiveRecord::RecordInvalid => e
      GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(", ")}")
    rescue ActiveRecord::RecordNotFound => e
      GraphQL::ExecutionError.new("Listing no longer exists")
    end
  end
end
