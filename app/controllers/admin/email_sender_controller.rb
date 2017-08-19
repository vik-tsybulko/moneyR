class Admin::EmailSenderController < Admin::BaseController

  def index
    @email_sender = EmailSender.singleton
  end

  def update
    @email_sender = EmailSender.singleton

    if @email_sender.update_attributes sender_params
      render json: { message: "Settings updated." }
    else
      render json: { errors: @email_sender.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def sender_params
    params.permit :address, :port, :domain, :authentication, :user_name, :password, :enable_starttls_auto
  end

end
