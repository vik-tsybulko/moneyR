class EmailSender < ApplicationRecord

  after_save :update_system_settings

  validates_presence_of :address, :port, :domain, :authentication, :user_name, :password

  def self.singleton
    EmailSender.first_or_create
  end

  private

  def update_system_settings
    ActionMailer::Base.smtp_settings = {
        :address => self.address,
        :port => self.port,
        :domain => self.domain,
        :authentication => self.authentication,
        :user_name => self.user_name,
        :password => self.password,
        :enable_starttls_auto => self.enable_starttls_auto
    }
  end

end
