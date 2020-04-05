module Mutations
  class DeleteListing < BaseMutation
    description "Removes a Listing"

    argument :id, ID, required: true

    field :errors, [String], null: false
    field :listing, Types::ListingType, null: true

    def resolve(id:)
      # Check for ability before the delete
      listing = Listing.find id

      if context[:current_ability].can?(:destroy, listing)
        if listing.destroy
          {
            listing: listing,
            errors: [],
          }
        else
          {
            errors: listings.errors.full_messages,
          }
        end
      else
        raise GraphQL::ExecutionError, "Unauthorized operation"
      end

      # Record Not Found
    rescue ActiveRecord::RecordInvalid => e
      GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(", ")}")
    rescue ActiveRecord::RecordNotFound => e
      GraphQL::ExecutionError.new("Listing no longer exists")
    end
  end
end
