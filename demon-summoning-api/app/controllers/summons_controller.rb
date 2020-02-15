require 'pry'
class SummonsController < ApplicationController
  def index
    summons = Summon.where(player_id: params[:player_id])
    render json: summons, include: [:demon]
  end

  def create
    sacrifice = Sacrifice.find_by(name: params[:sacrifice])
    demon = sacrifice.demon
    summon = demon.summons.create(player_id: params[:player_id], current_phase: "introduction", affection_level: 0)
    render json: summon, include: [:demon], except: [:created_at]
  end

  def update
    summon = Summon.find(params[:summon][:id])
    summon.update(affection_level: params[:summon][:affection_level], current_phase: params[:summon][:current_phase])
    render json: summon
  end

  private

  def summon_params
    params.require(:summon).permit(:player_id, :sacrifice, :affection_level, :current_phase)
  end
end
