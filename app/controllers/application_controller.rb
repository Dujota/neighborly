class ApplicationController < ActionController::Base
  include SessionsHelper
  before_action :load_authorization_into_gon

  def load_authorization_into_gon
    if user_signed_in?
      gon.push({
        current_user_id: current_user.id,
        current_user_full_name: current_user.full_name,
        current_user_role_names: current_user.role_names,
        current_user_email: current_user.email,
        current_user_location: current_user.user_location,
      })
    end
  end
end
