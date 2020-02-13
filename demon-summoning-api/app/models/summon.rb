class Summon < ApplicationRecord
  belongs_to :player
  belongs_to :demon
  has_one :affection
end
