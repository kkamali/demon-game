class ChangeColumnName < ActiveRecord::Migration[5.2]
  def change
    rename_column :sacrifices, :type, :name
  end
end
