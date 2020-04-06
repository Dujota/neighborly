FactoryBot.define do
  factory :profile do
    sequence(:first_name) { |n| "FirstName-#{n}" }
    sequence(:last_name) { |n| "LastName#{n}" }
    phone_number { "416-123-4567" }
    user
  end
end
