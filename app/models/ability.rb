# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new # guest user (not logged in)

    if !user.is_admin?
      # Annonymous User Permissions
      can :read, Listing

      if !user.new_record?
        # Add permisions here for returning users
        # we can use this to switch on new features for users after they sign up

        can [:create, :update, :destroy], Listing, user_id: user.id
      end
    else
      # - User is an admin
      can :manage, :all
    end
  end
end
