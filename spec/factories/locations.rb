FactoryBot.define do
  factory :location do
    lat { "MyString" }
    long { "MyString" }
    display_name { "MyString" }
    user { nil }
    listing { nil }
  end
end
