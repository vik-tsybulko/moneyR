class UserMailer  < ActionMailer::Base

  def confirmation_instructions(user_id)
    @user = User.find(user_id)
    mail(:to =>  @user.email, :from => EmailSender.singleton.user_name, :subject => "Welcome to URHQ")
  end

  def password_reset(user_id)
    @user = User.find(user_id)
    mail(to: @user.email, from: EmailSender.singleton.user_name, subject: 'URHQ: password recovery.')
  end

end
