class Admin::AdminsController < Admin::BaseController

  load_and_authorize_resource :admin, class: 'User'

  def index
    page = params[:page].to_i
    page = 1 if page < 1
    per_page = params[:per_page].to_i
    per_page = 10 if per_page < 1

    query = User.search_query params.merge(role_ids:[Role.admin.id])
    count_query = User.search_query params.merge(role_ids:[Role.admin.id], count: true)

    @admins = User.find_by_sql(query.take(per_page).skip((page - 1) * per_page).to_sql)
    @count = User.find_by_sql(count_query.to_sql).count
  end

  def create
    @admin = User.new admin_params

    if @admin.save
      render json: { message: I18n.t('admin.messages.success_upsert') }
    else
      render json: { validation_errors: @admin.errors }, status: :unprocessable_entity
    end
  end

  def update
    if @admin.update_attributes admin_params
      render json: { message: I18n.t('admin.messages.success_upsert') }
    else
      render json: { validation_errors: @admin.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    if @admin.destroy
      render json: {ok: true}
    else
      render json: {errors: @admin.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show

  end

  private

  def admin_params
    allowed_params = params.permit :email, :password, :password_confirmation
    allowed_params[:role] = Role.admin
    allowed_params
  end

end