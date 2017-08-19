class ApplicationController < ActionController::Base

  include SessionsHelper

  before_action :set_locale
  before_action :authenticate_user

  protect_from_forgery with: :exception

  rescue_from Exception, with: :catch_exceptions

  def authenticate_user
    respond_with_errors unless current_session
  end

  private

  def respond_with_errors
    render json: {errors: ['Access Denied!'] }, status: :unauthorized
  end

  def catch_exceptions(e)
    logger.error e.message
    logger.error e.backtrace.join("\n")

    case e.class.name
      when 'ActiveRecord::RecordNotFound'
        render json: {errors: [e.message]}, status: :not_found
      when 'ArgumentError'
        render json: {errors: [e.message]}, status: :unprocessable_entity
      else
        render json: {errors: [e.message]}, status: 499
    end
  end

  def set_locale
    locale = params[:locale] || cookies[:locale ] || 'en'
    locale = 'en' unless %w(en).include?(locale)
    I18n.locale = locale
    cookies.permanent[:locale] = I18n.locale
  end

  def default_url_options(options={})
    { locale: I18n.locale }
  end
end
