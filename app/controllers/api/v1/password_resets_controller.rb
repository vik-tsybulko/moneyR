class Api::V1::PasswordResetsController < Api::BaseController

  skip_before_action :authenticate_user

  def create
    @user = User.find_by_email params[:email]
    if @user
      @user.send_password_reset
      render json: {message: 'Password reset instructions sent!'}
    else
      render json: {errors: ['User with given email not found!']}, status: :unprocessable_entity
    end
  end

  def update
    @user = User.find_by_reset_password_token params[:code]

    if @user
      if @user.update_attributes password: params[:new_password], password_confirmation: params[:new_password]
        render json: {message: 'Password successfully restored!'}
      else
        render json: {errors: @user.errors.full_messages}, status: :unprocessable_entity
      end
    else
      render json: {errors: ['User with given token not found.']}, status: :unprocessable_entity
    end
  end
end
