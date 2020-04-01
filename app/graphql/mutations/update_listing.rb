module Mutations
  class UpdateListing < BaseMutation
    argument :id, ID, required: true
    argument :title, String, required: true
    argument :description, String, required: false
    argument :image_url, String, required: false

    field :errors, [String], null: false
    field :listing, Types::ListingType, null: true

    def resolve(id:, title:, description: nil, image_url: nil)
      listing = Listing.find id
      listing.title = title if title
      listing.description = description if description
      listing.image_url = image_url if image_url

      if listing.save
        {
          listing: listing,
        }
      else
        {
          errors: listings.errors.full_messages,
        }
      end
    end
  end
end
