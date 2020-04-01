module Mutations

  # BaseMutation < GraphQL::Schema::RelayClassicMutation  <-- default, replaced with simpler Simple mutation
  class BaseMutation < GraphQL::Schema::Mutation
    argument_class Types::BaseArgument
    field_class Types::BaseField
    input_object_class Types::BaseInputObject
    object_class Types::BaseObject
  end
end
