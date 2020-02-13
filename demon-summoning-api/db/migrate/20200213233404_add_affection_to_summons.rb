class AddAffectionToSummons < ActiveRecord::Migration[5.2]
  def change
    add_reference :affections, :summon, foreign_key: true
  end
end
