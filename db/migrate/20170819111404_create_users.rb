class CreateUsers < ActiveRecord::Migration[5.0]
  def change
      create_table :users do |t|
        t.string :encrypted_password
        t.string :salt
        t.string :email
        t.string :name
        t.attachment :avatar
        t.references :role

        t.timestamps
      end
  end
end