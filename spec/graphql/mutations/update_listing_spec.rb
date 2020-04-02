require "rails_helper"

RSpec.describe "MutationType::UpdateListing" do
  let!(:user) { create :user }
  let!(:new_listing) { create :listing }

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
                                        }).as_json
  end

  context "updates the listing" do
    it "does something" do
      binding.pry
      title = result["data"]["updateListing"]["listing"]["title"]
      expect(title).to eq("UPDATED TITLE")
    end

    it "sets description" do
      binding.pry
      description = result["data"]["updateListing"]["listing"]["description"]

      expect(description).to eq("WORKS AMAZING!")
    end
  end
end
