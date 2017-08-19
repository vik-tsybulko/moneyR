class Api::V1::UsersController < Api::V1::BaseController

  skip_before_action :authenticate_user, only: [:create]

  def create
    @user = User.new user_params
    if @user.save
      sign_in user: @user, device_type: params[:device_type], push_token: params[:push_token]
      render json: {
          session_token: current_session.token,
          user: @user.to_json,
          message: 'Registration successful.'
      }
    else
      render json: { errors: @user.errors.full_messages }, status: 422
    end
  end

  def profile
    render json: { user: current_user.to_json }
  end

  def update
    @user = current_user

    if user_params[:password].present? && !@user.authenticate(params[:current_password])
      render json: { errors: ['Wrong current password.'] }, status: :unprocessable_entity and return
    end

    if @user.update_attributes user_params
      render json: {user: @user.to_json }
    else
      render json: {errors: @user.errors.full_messages}, status: :unprocessable_entity
    end
  end

  private

  def user_params
    allowed_params = params.permit :email, :password, :avatar, :first_name, :last_name, :avatar
    allowed_params[:role] = Role.athlet
    allowed_params[:password_confirmation] = allowed_params[:password]

    allowed_params
  end
end