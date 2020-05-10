module Types
  class UserType < Types::BaseObject
    field :id, ID, null: false
    field :email, String, null: false
    field :user_location, String, null: true
    field :is_admin, Boolean, null: true

    def is_admin
      # `object` references the user instance
      #  for profile [object.first_name, object.last_name].compact.join(" ")

      object.is_admin?
    end
  end
end
