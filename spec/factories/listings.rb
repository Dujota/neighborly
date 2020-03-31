FactoryBot.define do
  factory :listing do
    sequence(:title) { |n| "listing-#{n}" }
    user
  end
end
