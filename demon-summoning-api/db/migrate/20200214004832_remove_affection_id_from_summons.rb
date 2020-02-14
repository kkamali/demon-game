class RemoveAffectionIdFromSummons < ActiveRecord::Migration[5.2]
  def change
    remove_column :summons, :affection_id, :integer
  end
end
