class Api::BaseController < ApplicationController

  before_action :set_default_response_format, :reject_blank_params
  skip_before_action :verify_authenticity_token

  protected

  def reject_blank_params
    params.reject! { |_,v| v.blank? }
  end

  def set_default_response_format
    request.format = :json
  end

  rescue_from Exception, with: :catch_exceptions

  private

  def catch_exceptions(e)

    logger.error e.message
    logger.error e.backtrace.join("\n")

    case e.class.name
      when 'ActiveRecord::RecordNotFound'
        render json: {errors: ['Record not found.']}, status: :not_found
      when 'ArgumentError'
        render json: {errors: [e.message]}, status: :unprocessable_entity
      when 'Net::SMTPSyntaxError'
        render json: {errors: ['Emails is not configured.']}, status: :unprocessable_entity
      when 'ActiveRecord::StatementInvalid'
        render json:{errors:[e.message]},status: :unprocessable_entity
      when 'ActiveRecord::RecordInvalid'
        render json:{errors:[e.message]},status: :unprocessable_entity
      else
        render json: {errors: [e.message]}, status: 500
    end
  end
end