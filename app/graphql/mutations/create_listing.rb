module Mutations
  class CreateListing < BaseMutation
    description "Create a new Listings"
    # arguments passed to the `resolve` method
    argument :title, String, required: true
    argument :description, String, required: true
    argument :image_url, String, required: false

    # return type from the mutation if you just want the object with the below line
    # type Types::ListingType

    field :listing, Types::ListingType, null: true

    # 2 required, one optional
    def resolve(title:, description:, image_url: nil)
      if context[:current_ability].can?(:create, Listing)
        listing = Listing.new(
          title: title,
          description: description,
          image_url: image_url,
          user: context[:current_user],
        )

        if listing.save
          # Successful creation, return the created object with no errors
          {
            listing: listing,
          }
        else
          # Failed save, return the errors to the client
          {
            errors: listing.errors.full_messages,
          }
        end
      end
    end
  end
end
