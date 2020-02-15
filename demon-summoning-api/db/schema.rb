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

ActiveRecord::Schema.define(version: 2020_02_15_181726) do

  create_table "demons", force: :cascade do |t|
    t.string "name"
    t.string "title"
    t.string "personality"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "dialogues", force: :cascade do |t|
    t.string "dialogue"
    t.string "phase"
    t.integer "demon_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "right"
    t.string "wrong"
    t.index ["demon_id"], name: "index_dialogues_on_demon_id"
  end

  create_table "players", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "sacrifices", force: :cascade do |t|
    t.string "name"
    t.integer "demon_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["demon_id"], name: "index_sacrifices_on_demon_id"
  end

  create_table "summons", force: :cascade do |t|
    t.integer "player_id"
    t.integer "demon_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "current_phase"
    t.integer "affection_level"
    t.index ["demon_id"], name: "index_summons_on_demon_id"
    t.index ["player_id"], name: "index_summons_on_player_id"
  end

end
