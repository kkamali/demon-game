class SummonsController < ApplicationController
  def index
    summons = Summon.where(player_id: session[:id])
    render json: summons
  end
end
