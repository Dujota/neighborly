module Mutations
  class CreateUser < BaseMutation

    # often we will need input types for specific mutation
    # in those cases we can define those input types in the mutation class itself
    class AuthProviderSignupData < Types::BaseInputObject
      argument :credentials, Types::AuthProviderCredentialsInput, required: false
    end

    argument :auth_provider, AuthProviderSignupData, required: false

    field :errors, [String], null: false
    field :user, Types::UserType, null: true

    def resolve(auth_provider: nil)
      user = User.new(
        email: auth_provider&.dig(:credentials, :email),
        password: auth_provider&.dig(:credentials, :password),
      )

      if user.save
        {
          user: user,
          errors: [],
        }
      else
        { errors: user.errors.full_messages }
      end
    end
  end
end
