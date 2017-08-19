json.email_sender do
  json.address @email_sender.address.to_s
  json.port @email_sender.port.to_s
  json.domain @email_sender.domain.to_s
  json.authentication @email_sender.authentication.to_s
  json.user_name @email_sender.user_name.to_s
  json.enable_starttls_auto !!@email_sender.enable_starttls_auto
end
