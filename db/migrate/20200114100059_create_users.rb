class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :name,               null: false, unique: true, index: true
      t.string :email,              null: false, default: "",  unique: true
      t.string :encrypted_password, null: false, default: "",  unique: true
      
      t.string   :reset_password_token
      t.datetime :reset_password_sent_at
      t.datetime :remember_created_at
      
      t.timestamps null: false


    end

    add_index :users, :email
    add_index :users, :reset_password_token
  end
end
