class CreateEmailSender < ActiveRecord::Migration[5.0]
  def change
    create_table :email_senders do |t|
      t.string :address
      t.string :port
      t.string :domain
      t.string :authentication
      t.string :user_name
      t.string :password
      t.boolean :enable_starttls_auto
    end
  end
end
