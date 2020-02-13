class SummonsController < ApplicationController
  def index
    summons = Summon.where(player_id: session[:id])
    render json: summons
  end

  def create
  end

  private

  def summon_params
    params.require(:summon).permit(:sacrifice)
  end
end
