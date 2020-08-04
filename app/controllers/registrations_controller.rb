class RegistrationsController < Devise::RegistrationsController

  # When we creatre a new user through /signup, it will build the profile for us
  def new
    # initialize an empty user object.
    # Devise::RegistrationsController build_resource
    build_resource({})

    resource.build_profile
    set_form_defaults
    yield resource if block_given?
  end

  private

  def sign_up_params
    params.require(resource_name).permit(
      :email, :user_location, :password, :password_confirmation,
      profile_attributes: [:first_name, :last_name, :location, :phone_number],
    )
  end

  def set_form_defaults
    resource.profile.first_name = params[:first_name]
    resource.profile.last_name = params[:last_name]
    resource.profile.location = params[:location]
    resource.profile.phone_number = params[:last_name]
    resource.email = params[:email]
  end

  # The two methods below allow us to control the flow after a sign up by redirecting to a specifc path, like onboarding documentation (IE how to use or some other page)
  #
  # The second method allows us to sned a user to a confirmation pending page (comes from Devise Views)
  #
  #
  # def after_sign_up_path_for(resource)
  #   onboarding_path
  # end

  # def after_inactive_sign_up_path_for(resource)
  #   confirmations_pending_path
  # end
end
