class PlayersController < ApplicationController
  def start
    player = player.find_by(name: params[:name])
    if player.nil?
      player = Player.create(name: params[:name])
    end
    render json: player, except: [:created_at, :updated_at]
  end

  private

  def player_params
    params.require(:player).permit(:name)
  end
end
