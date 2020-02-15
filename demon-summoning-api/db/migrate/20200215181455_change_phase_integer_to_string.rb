class ChangePhaseIntegerToString < ActiveRecord::Migration[5.2]
  def change
    change_column :summons, :current_phase, :string
  end
end
