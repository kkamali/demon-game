class SacrificesController < ApplicationController
  def index
    sacrifices = Sacrifice.all
    render json: sacrifices
  end
end
