class CreateSacrifices < ActiveRecord::Migration[5.2]
  def change
    create_table :sacrifices do |t|
      t.string :type
      t.references :demon, foreign_key: true

      t.timestamps
    end
  end
end
