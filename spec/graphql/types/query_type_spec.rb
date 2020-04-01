require "rails_helper"

RSpec.describe "Types::QueryType" do
  describe "Listings" do
    let!(:listings) { create_pair(:listing) }

    let(:query) do
      %(
        query{
          listings{
            title
          }
        }
      )
    end

    subject(:result) do
      NeighbourlySchema.execute(query).as_json
    end

    it "returns all listings" do
      expect(result.dig(
        "data", "items"
      )).to match_array(listings.map { |listing| { title: listing.title } })
    end
  end
end
