module Mutations

  # BaseMutation < GraphQL::Schema::RelayClassicMutation  <-- default, replaced with simpler Simple mutation
  class BaseMutation < GraphQL::Schema::Mutation

    # ENABLE OPTIONS BELOW IF USING RelayClassicMutation

    # argument_class Types::BaseArgument
    # field_class Types::BaseField
    # input_object_class Types::BaseInputObject
    # object_class Types::BaseObject

    # place all general mutation helpershere

    def is_owner?(resource = nil)
      resource.try(:user) == context[:current_user]
    end

    # TODO: ADD A ROLE TABLE AND CONTROL WITH THAT
    def is_admin?
      # context[:current_user].try(:email) == "admin@user.com"

      true #return true during development until we have a sign in mechanism
    end
  end
end
