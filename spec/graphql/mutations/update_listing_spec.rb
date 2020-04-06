require "rails_helper"

RSpec.describe "MutationType::UpdateListing" do
  let!(:user) { create :user }
  let!(:new_listing) { create :listing, { user: user } }

  let(:current_ability) do
    Ability.new(user)
  end

  let(:mutation) do
    %(
      mutation{
        updateListing(id: "#{new_listing.id}", title:"UPDATED TITLE", description:"WORKS AMAZING!"){
         listing {
           title
           description
         }
        }
      }
    )
  end

  subject(:result) do
    NeighbourlySchema.execute(mutation, context: {
                                          current_user: user,
                                          current_ability: current_ability,
                                        }).as_json
  end

  context "updates the listing" do
    it "does something" do
      title = result.dig("data", "updateListing", "listing", "title")
      expect(title).to eq("UPDATED TITLE")
    end

    it "sets description" do
      description = result.dig("data", "updateListing", "listing", "description")

      expect(description).to eq("WORKS AMAZING!")
    end
  end
end
