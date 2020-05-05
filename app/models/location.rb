class Location < ApplicationRecord
  belongs_to :user, optional: true
  belongs_to :listing, optional: true
end
