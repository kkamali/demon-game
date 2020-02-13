class Affection < ApplicationRecord
  belongs_to :player
  belongs_to :demon
  belongs_to :summon
end
