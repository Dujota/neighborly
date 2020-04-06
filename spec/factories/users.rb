FactoryBot.define do
  factory :user do
    # Use sequence to make sure that the value is unique
    sequence(:email) { |n| "user-#{n}@example.com" }
    password { "123456" }
  end

  factory :admin_user do
    after(:build) do |user|
      user.add_role(build(:admin_role))
    end
  end
end
