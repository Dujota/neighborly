module Mutations
  class SignIn < BaseMutation
    description "Sign in User"

    argument :credentials, Types::AuthProviderCredentialsInput, required: false

    field :token, String, null: true
    field :user, Types::UserType, null: true

    def resolve(credentials: nil)
      # Initial Basic Validation
      return GraphQL::ExecutionError.new("Login Credentials Required") unless credentials

      user = User.find_for_database_authentication(email: credentials[:email])

      # If authentication fails
      return GraphQL::ExecutionError.new("User with #{email} not registered on this application") unless user

      # Check that the password for the fetched user, matches the one provided by mutation
      if user.valid_password?(credentials[:password])
        context[:current_user] = user

        # use Ruby on Rails - ActiveSupport::MessageEncryptor, to build a token
        crypt = ActiveSupport::MessageEncryptor.new(Rails.application.credentials.secret_key_base.byteslice(0..31))
        token = crypt.encrypt_and_sign("user-id:#{user.id}")

        {
          user: user,
          token: token,
        }
      else
        { errors: user.errors.full_messages }
      end
    end
  end
end
