class ListingsController < ApplicationController
  def index
  end

  def listing
    @id = params[:id] if params[:id]
    @edit = params[:edit] if params[:edit]
  end
end
