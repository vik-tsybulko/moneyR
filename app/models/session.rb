class Session < ApplicationRecord
  belongs_to :user
  before_create :generate_token
  before_create :remove_same_device_sessions
  before_create :remove_expired_sessions
  validates :user_id, presence: true

  def self.destroy_expired
    where("updated_at < ?", Time.now - 24.hour).destroy_all
  end

  private

  def generate_token
    self.token = encrypt
  end

  def encrypt
    secure_hash("#{Time.now.utc - (rand(1000).hours)}--#{self.user.email}--#{self.user.salt}")
  end

  def secure_hash(string)
    Digest::SHA2.hexdigest(string)
  end

  def remove_same_device_sessions
    Session.where(device_type: self.device_type, push_token: self.push_token).where.not(device_type: nil).destroy_all
  end

  def remove_expired_sessions
    Session.destroy_expired
  end
end