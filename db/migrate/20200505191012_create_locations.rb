class CreateLocations < ActiveRecord::Migration[6.0]
  def change
    create_table :locations do |t|
      t.string :lat
      t.string :long
      t.string :display_name
      t.references :user, null: true, foreign_key: true
      t.references :listing, null: true, foreign_key: true

      t.timestamps
    end
  end
end
