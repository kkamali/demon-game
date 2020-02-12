class Demon < ApplicationRecord
  has_many :summons
  has_many :sacrifices
  has_many :affections
  has_many :players, through: :affections
end
