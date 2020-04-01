module Mutations

  # BaseMutation < GraphQL::Schema::RelayClassicMutation  <-- default, replaced with simpler Simple mutation
  class BaseMutation < GraphQL::Schema::Mutation

    # ENABLE OPTIONS BELOW IF USING RelayClassicMutation

    # argument_class Types::BaseArgument
    # field_class Types::BaseField
    # input_object_class Types::BaseInputObject
    # object_class Types::BaseObject

    # place all general mutation helpershere
  end
end
