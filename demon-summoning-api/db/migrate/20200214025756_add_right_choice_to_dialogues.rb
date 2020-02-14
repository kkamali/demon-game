class AddRightChoiceToDialogues < ActiveRecord::Migration[5.2]
  def change
    add_column :dialogues, :right, :string
    add_column :dialogues, :wrong, :string
  end
end
