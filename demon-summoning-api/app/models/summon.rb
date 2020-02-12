class Summon < ApplicationRecord
  belongs_to :player
  belongs_to :demon
  has_many :sacrifices
end
