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
  after_create do
  
    if user_location.starts_with?("{")
        coords = JSON.parse(user_location)
        url = "https://us1.locationiq.com/v1/reverse.php?key=2081a07b6ccffd&lat="+coords["latitude"].to_s+"&lon="+coords["longitude"].to_s+"&format=json"
    else
        url = "https://us1.locationiq.com/v1/search.php?key=2081a07b6ccffd&q="+user_location+"&format=json"
    end

    uri = URI(url)
    response = Net::HTTP.get(uri)
    res = JSON.parse(response)

    user_location.starts_with?("{") ? resTarget = res : resTarget = res[0]

    lat = resTarget["lat"]
    long = resTarget["lon"]
    display_name = resTarget["display_name"]

    self.locations.create({lat: lat, long: long, display_name: display_name})
    
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
