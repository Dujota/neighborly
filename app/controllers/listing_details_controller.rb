class ListingDetailsController < ApplicationController
    def index
        # find listing based on ID and share with view
        @id = params[:id]
    end
end
 