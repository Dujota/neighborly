module Mutations
  class CreateListing < BaseMutation
    # arguments passed to the `resolve` method
    argument :title, String, required: true
    argument :description, String, required: true
    argument :image_url, String, required: false

    # return type from the mutation if you just want the object with the below line
    # type Types::ListingType

    field :errors, [String], null: false
    field :listing, Types::ListingType, null: true

    # 2 required, one optional
    def resolve(title:, description:, image_url: nil)
      listing = Listing.new(
        title: title,
        description: description,
        image_url: image_url,

        #TODO: CHANGE ME!!!!!! FOR DEV ONLY
        user: context[:current_user] || User.find(3),
      )

      if listing.save
        # Successful creation, return the created object with no errors
        {
          listing: listing,
          errors: [],
        }
      else
        # Failed save, return the errors to the client
        { listing: nil,
          errors: listing.errors.full_messages }
      end
    end
  end
end
