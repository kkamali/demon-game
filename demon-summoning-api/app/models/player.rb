class Player < ApplicationRecord
  has_many :summons
  has_many :affections
end
