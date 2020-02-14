class FixColumnNameInDialogue < ActiveRecord::Migration[5.2]
  def change
    rename_column :dialogues, :affection_level, :phase
  end
end
