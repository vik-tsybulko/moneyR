class Admin::BaseController < ApplicationController

  # before_action :only_admins

  private

  def only_admins
    render json: {errors: ['Access denied !']}, status: :unauthorized and return unless current_user.admin?
  end
end