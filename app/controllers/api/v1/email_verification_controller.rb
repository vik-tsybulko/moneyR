class Api::V1::EmailVerificationController < Api::V1::BaseController

  skip_before_action :authenticate_user

  def create
    @user = User.find_by_confirmation_token(params[:code])
    if params[:code].present? && @user
      @user.update_attribute :confirmed, true
      render json: {message: ["User verified."]}
    else
      render json: {errors: ["Can't find user by given code."]}, status: :unprocessable_entity
    end
  end

  def resend
    @user = User.find_by(email: params[:email], confirmed: [false, nil])
    if @user
      @user.send_email_confirmation_instructions
      render json: {message: ["Email verification instructions sent."]}
    else
      render json: {errors: ["Can't find unconfirmed user by given email."]}, status: :unprocessable_entity
    end
  end
end