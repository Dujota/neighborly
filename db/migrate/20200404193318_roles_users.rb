class RolesUsers < ActiveRecord::Migration[6.0]
  class CreateRolesUsersTable < ActiveRecord::Migration[4.2]
    def up
      # create a join table with no id assigned to the entries
      create_table :roles_users, :id => false do |t|
        t.integer :role_id
        t.integer :user_id
      end
    end

    def down
      drop_table :roles_users
    end
  end
end
