class CreateAffections < ActiveRecord::Migration[5.2]
  def change
    create_table :affections do |t|
      t.integer :amount
      t.references :player, foreign_key: true
      t.references :demon, foreign_key: true

      t.timestamps
    end
  end
end
