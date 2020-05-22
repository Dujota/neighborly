class User < ApplicationRecord
  require "net/http"
  require "json"
  require "openssl"
  OpenSSL::SSL::VERIFY_PEER = OpenSSL::SSL::VERIFY_NONE

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  #  Assosiactions
  has_one :profile, autosave: true
  has_and_belongs_to_many :roles
  has_many :listings, -> { order "updated_at desc" }, dependent: :destroy
  has_many :locations, dependent: :destroy

  # Validations
  validates :email, presence: true, uniqueness: true

  # Delegation Methods
  delegate :first_name, :first_name=,
           :last_name, :last_name=,
           :phone_number, :phone_number=,
           :full_name, :full_name=,
           :location, :location=,
           to: :profile

  #  Allows user to receive a hash with nested attributes to populate profile
  accepts_nested_attributes_for :profile

  # Before Creating a User, run a method for locationIQ
  before_create do
    #Check the value of self.user_location
    #If self.user_location starts with '{' then it is holding the users coords
    #Might need to check if nil first?
    if user_location.starts_with?("{")
      get_location_name(user_location)
    else
      get_coords(user_location)
    end
  end

  #API call to locationIQ
  def get_coords(location_name)
    #Call api with the location coords to return the coords / set the lat long values for locations
    url = "https://us1.locationiq.com/v1/search.php?key=2081a07b6ccffd&q="+location_name+"&format=json"
    uri = URI(url)
    response = Net::HTTP.get(uri)
    res = JSON.parse(response)
    lat = res[0]["lat"]
    long = res[0]["lon"]
    display_name = res[0]["display_name"]
    #Set locations lat long and display_name with the above values
  end

  def get_location_name(location_coords)
    #Call api with the location name to return the name / set the name value for the locations
    coords = JSON.parse(location_coords)
    url = "https://us1.locationiq.com/v1/reverse.php?key=2081a07b6ccffd&lat="+coords["latitude"].to_s+"&lon="+coords["longitude"].to_s+"&format=json"
    uri = URI(url)
    response = Net::HTTP.get(uri)
    res = JSON.parse(response)
    lat = res["lat"]
    long = res["lon"]
    display_name = res["display_name"]
    #Set locations lat long and display_name with the above values
  end

  # USER AUTHORITY METHODS
  def add_role(role)
    self.roles << role
  end

  def add_role_by_role_name(role_name)
    self.roles << Role.find_by_name(role_name)
  end

  def role_names
    roles.map { |role| role.name }
  end

  def is_admin?
    is_role_by_name?(:admin)
  end

  def is_role?(role)
    self.roles.include?(role)
  end

  def is_role_by_name?(role_name)
    self.roles.include?(Role.find_by_name(role_name))
  end

  # Profile Method
  def find_or_build_profile
    if profile.nil?
      build_profile
    end
    profile
  end
end
