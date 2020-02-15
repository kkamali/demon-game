class ChangePhaseIntegerToStringAgain < ActiveRecord::Migration[5.2]
  def change
    change_column :dialogues, :phase, :string
  end
end
