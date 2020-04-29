module Types
    class LocationType < Types::BaseObject
      field :id, ID, null: false
      field :longitude, String, null: false
      field :latitude, String, null: false 
    end
  end
  