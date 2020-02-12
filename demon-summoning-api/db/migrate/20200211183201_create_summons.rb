class CreateSummons < ActiveRecord::Migration[5.2]
  def change
    create_table :summons do |t|
      t.references :player, foreign_key: true
      t.references :demon, foreign_key: true

      t.timestamps
    end
  end
end
