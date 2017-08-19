class Api::V1::SessionsController < Api::BaseController

  skip_before_action :authenticate_user, except: [:destroy]

  def create
    @user = User.find_by_email login_params[:email]
    if @user && @user.authenticate(login_params[:password])
      sign_in user: @user, device_type: params[:device_type], push_token: params[:push_token]
      render json: { session_token: current_session.token, user: @user.to_json}
    else
      render json: { errors: ['Wrong login/password combination.'] }, status: 422
    end
  end

  def facebook
    # begin
      fb_user = FbGraph2::User.me(params[:access_token]).fetch(fields: [:first_name,:last_name, :email])
    # rescue Exception => e
    #   render json: {errors: [e.message]}, status: 422 and return
    # end

    if @user = User.find_by_email(fb_user.email)
      @user.facebook_id = fb_user.id
      @user.save
      sign_in user: @user, device_type: params[:device_type], push_token: params[:push_token]
      render json: { session_token: current_session.token, user: @user.to_json} and return
    end

    @user = User.find_by_facebook_id fb_user.id
    if @user
      sign_in user: @user, device_type: params[:device_type], push_token: params[:push_token]
      render json: { session_token: current_session.token, user: @user.to_json}
    else
      @user = User.new email: fb_user.email,
                       facebook_id: fb_user.id,
                       first_name: fb_user.first_name,
                       last_name: fb_user.last_name,
                       confirmed: true

      @user.avatar_from_url "https://graph.facebook.com/v2.7/#{fb_user.id}/picture?width=1000"
      @user.role = ['client', 'trainer'].include?(params[:user_type]) ? Role.send(params[:user_type]) : nil

      if @user.save
        sign_in user: @user, device_type: params[:device_type], push_token: params[:push_token]
        render json: { session_token: current_session.token, user: @user.to_json}
      else
        render json: { errors: @user.errors.full_messages }, status: 422
      end
    end
  end

  def destroy
    sign_out
    render json: {ok: true}
  end

  private

  def login_params
    params.permit(:email, :password)
  end

  def logout_params
    params.permit(:session_token)
  end

end