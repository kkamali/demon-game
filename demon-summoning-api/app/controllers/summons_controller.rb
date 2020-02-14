require 'pry'
class SummonsController < ApplicationController
  def index
    summons = Summon.where(player_id: params[:player_id])
    render json: summons, include: [:demon, :affection]
  end

  def create
    sacrifice = Sacrifice.find_by(name: params[:sacrifice])
    demon = sacrifice.demon
    summon = demon.summons.create(player_id: params[:player_id], current_phase: 0)
    summon.affection = demon.affections.create(player_id: params[:player_id], amount: 0)
    render json: summon, include: [:demon], except: [:created_at]
  end

  private

  def summon_params
    params.require(:summon).permit(:player_id, :sacrifice)
  end
end
