FactoryBot.define do
  factory :role do
    name { "test_role" }
    description { "Some Random Role" }

    factory :admin_role do
      name { "admin" }
      description { "Admin role" }
    end
  end
end
