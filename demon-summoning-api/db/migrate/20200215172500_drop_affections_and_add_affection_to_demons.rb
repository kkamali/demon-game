class DropAffectionsAndAddAffectionToDemons < ActiveRecord::Migration[5.2]
  def change
    drop_table :affections
    add_column :demons, :affection_level, :integer
  end
end
