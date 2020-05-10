module Mutations
  class SignUp < BaseMutation
    description "User Create/ Sign up"
    # often we will need input types for specific mutation
    # in those cases we can define those input types in the mutation class itself
    class AuthProviderSignupData < Types::BaseInputObject
      argument :credentials, Types::AuthProviderCredentialsInput, required: false
    end

    argument :auth_provider, AuthProviderSignupData, required: false

    field :user, Types::UserType, null: true

    def resolve(auth_provider: nil)
      user = User.new(
        email: auth_provider&.dig(:credentials, :email),
        user_location: auth_provider.dig(:credentials, :user_location),
        password: auth_provider&.dig(:credentials, :password),
      )

      if user.save
        {
          user: user,
        }
      else
        { errors: user.errors.full_messages }
      end
    end
  end
end
