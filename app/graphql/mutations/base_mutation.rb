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

    def is_admin?
      context[:current_user]&.is_admin?
    end
  end
end
