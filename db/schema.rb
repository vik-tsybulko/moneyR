# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170819111552) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "email_senders", id: :serial, force: :cascade do |t|
    t.string "address"
    t.string "port"
    t.string "domain"
    t.string "authentication"
    t.string "user_name"
    t.string "password"
    t.boolean "enable_starttls_auto"
  end

  create_table "roles", id: :serial, force: :cascade do |t|
    t.string "name"
  end

  create_table "sessions", id: :serial, force: :cascade do |t|
    t.string "token"
    t.integer "user_id"
    t.string "push_token"
    t.integer "device_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_sessions_on_user_id"
  end

  create_table "users", id: :serial, force: :cascade do |t|
    t.string "encrypted_password"
    t.string "salt"
    t.string "email"
    t.string "name"
    t.string "avatar_file_name"
    t.string "avatar_content_type"
    t.integer "avatar_file_size"
    t.datetime "avatar_updated_at"
    t.integer "role_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["role_id"], name: "index_users_on_role_id"
  end

end
