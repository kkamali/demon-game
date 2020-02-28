class Demon < ApplicationRecord
  has_many :summons
  has_many :sacrifices
  has_many :players, through: :summons
  has_many :dialogues
end
