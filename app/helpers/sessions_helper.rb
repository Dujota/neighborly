module SessionsHelper

  # Check role on the session user
  def admin?
    current_user.nil? ? false : current_user.is_role_by_name?(:admin)
  end

  def current_user_has_permission_to(controller, action)
    current_user.nil? ? false : current_user.has_permission_to(controller, action)
  end
end
