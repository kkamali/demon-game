class AddAffectionToSummonsNotDemons < ActiveRecord::Migration[5.2]
  def change
    remove_column :demons, :affection_level
    add_column :summons, :affection_level, :integer
  end
end
