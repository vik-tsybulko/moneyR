class Admin::SystemSettingsController < Admin::BaseController

  def index
    @settings = SystemSetting.first_or_create
  end

  def create
    @settings = SystemSetting.first_or_create

    if @settings.update_attributes system_setting_params
      render json: { message: I18n.t('system_setting.messages.success_upsert') }
    else
      render json: { validation_errors: @settings.errors }, status: :unprocessable_entity
    end
  end

  private

  def system_setting_params
    params.require(:system_setting).permit :activity_sync_from_date, :activity_min_distance
  end

end
