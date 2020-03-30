module Types
  class UserType < Types::BaseObject
    field :id, ID, null: false
    field :email, String, null: false

    def full_name
      # `object` references the user instance
      #  for profile [object.first_name, object.last_name].compact.join(" ")

      "check the profile of #{object.email}"
    end
  end
end
