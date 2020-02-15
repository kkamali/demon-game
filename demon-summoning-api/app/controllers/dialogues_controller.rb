require 'pry'
class DialoguesController < ApplicationController
  def show
    summon = Summon.find(params[:summon_id])
    dialogue = Dialogue.where(demon_id: summon.demon.id, phase: summon.current_phase)
    render json: dialogue
  end
end
