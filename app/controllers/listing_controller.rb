class ListingController < ApplicationController
  def index
  end

  def show
    @id = params[:id]
    render :listing_details
  end
end
