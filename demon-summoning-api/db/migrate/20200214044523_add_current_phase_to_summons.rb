class AddCurrentPhaseToSummons < ActiveRecord::Migration[5.2]
  def change
    add_column :summons, :current_phase, :integer
  end
end
