ActionMailer::Base.delivery_method = :smtp
ActionMailer::Base.perform_deliveries = true
ActionMailer::Base.raise_delivery_errors = true
ActionMailer::Base.default :charset => 'utf-8'

begin
  @settings = EmailSender.singleton

  ActionMailer::Base.smtp_settings = {
    :address => @settings.address,
    :port => @settings.port,
    :domain => @settings.domain,
    :authentication => @settings.authentication,
    :user_name => @settings.user_name,
    :password => @settings.password,
    :enable_starttls_auto => @settings.enable_starttls_auto
  }

rescue

end
