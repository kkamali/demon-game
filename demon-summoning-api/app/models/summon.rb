class Summon < ApplicationRecord
  belongs_to :player
  belongs_to :demon
  has_one :affection
  has_many :dialogues, through: :demon
end
