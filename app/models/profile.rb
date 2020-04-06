class Profile < ApplicationRecord
  belongs_to :user, optional: true
  validates_presence_of :first_name, :last_name

  # Attribut Reader
  def full_name
    "#{first_name} #{last_name}".strip
  end

  #
  def full_name=(name)
    write_attribute(:first_name, name.split(" ", 2)[0])
    write_attribute(:last_name, name.split(" ", 2)[1])
  end
end
