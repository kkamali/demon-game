class CreateDialogues < ActiveRecord::Migration[5.2]
  def change
    create_table :dialogues do |t|
      t.string :dialogue
      t.integer :affection_level
      t.references :demon, foreign_key: true

      t.timestamps
    end
  end
end
