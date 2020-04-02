require "rails_helper"

RSpec.describe "MutationType::CreateListing" do
  let!(:user) { create :user }
  let(:mutation) do
    %(
      mutation{
        createListing(title:"MY TEST MUTATION", description:"PASSES WITH FLYING COLORS"){
         listing {
           title
           description
           user{
             id
           }
         }
        }
      }
    )
  end

  subject(:result) do
    NeighbourlySchema.execute(mutation, context: {
                                          current_user: user,
                                        }).as_json
  end

  context "creates new Listing" do
    #TODO: Refactor - DRY up with before each block

    it "sets title" do
      title = result["data"]["createListing"]["listing"]["title"]

      expect(title).to eq("MY TEST MUTATION")
    end

    it "sets description" do
      description = result["data"]["createListing"]["listing"]["description"]

      expect(description).to eq("PASSES WITH FLYING COLORS")
    end

    it "assigned to the user who created it" do
      listing_user = result["data"]["createListing"]["listing"]["user"]["id"]

      expect(listing_user.to_i).to eq(user[:id])
    end
  end
end
