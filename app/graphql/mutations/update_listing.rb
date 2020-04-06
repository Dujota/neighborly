module Mutations
  class UpdateListing < BaseMutation
    description "Update an existing Listing"

    argument :id, ID, required: true
    argument :title, String, required: true
    argument :description, String, required: false
    argument :image_url, String, required: false

    field :listing, Types::ListingType, null: true

    def resolve(id:, title:, description: nil, image_url: nil)
      listing = Listing.find id
      listing.title = title if title
      listing.description = description if description
      listing.image_url = image_url if image_url

      if context[:current_ability].can?(:update, listing)
        if listing.save
          {
            listing: listing,

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
