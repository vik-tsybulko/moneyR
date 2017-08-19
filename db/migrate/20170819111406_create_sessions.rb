class CreateSessions < ActiveRecord::Migration[5.0]
  def change
    create_table :sessions do |t|
      t.string :token
      t.references :user
      t.string :push_token
      t.integer :device_type

      t.timestamps
    end
  end
end