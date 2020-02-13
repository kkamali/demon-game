class Summon < ApplicationRecord
  belongs_to :player
  belongs_to :demon
end
