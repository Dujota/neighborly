class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  #  Callbacks

  #  Assosiactions
  has_and_belongs_to_many :roles

  has_many :listings, -> { order "updated_at desc" }, dependent: :destroy

  # Validations
  validates :email, presence: true, uniqueness: true
end
