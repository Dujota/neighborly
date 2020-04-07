class ListingsController < ApplicationController
  def index
  end

  def listing
    @id = params[:id] if params[:id]
  end
end
