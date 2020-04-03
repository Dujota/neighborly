require "rails_helper"

RSpec.describe "MutationType::SignUp" do
  let(:mutation) do
    %(
      mutation{
        signUp(
          authProvider:{
            credentials:{
              email:"test@example.com"
              password:"123456"
            }
          }
        ){
          user{
            id
            email
          }
          errors
        }
      }
    )
  end

  subject(:result) do
    NeighbourlySchema.execute(mutation).as_json
  end

  context "creates a new user" do
    it "returns the new user created" do
      email = result.dig("data", "signUp", "user", "email")

      expect(email).to eq("test@example.com")
    end
  end
end
