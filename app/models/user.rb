class User < ApplicationRecord
  include ApplicationHelper

  has_many :sessions, dependent: :destroy
  belongs_to :role
  attr_accessor :password, :password_confirmation
  has_attached_file :avatar,
                    styles: { medium: '500x500>', thumb: '100x100>' },
                    default_url: '/images/missing.png',
                    path: ":rails_root/public/system/users/:id/avatars/:style/:filename",
                    url: "/system/users/:id/avatars/:style/:filename"

  validates_attachment_size :avatar, less_than: 20.megabytes, unless: Proc.new {|model| model.avatar }
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/
  validates :password, presence: true, confirmation: true, length: {within: 6..40}, if: :validate_password?
  validates :password_confirmation, presence: true, if: :validate_password?
  validates :email, uniqueness: { case_sensitive: false, message: 'This email address is already registered.'},
                    format: { with: /.*\@.*\..*/, message: 'is incorrect'},
                    presence: true

  before_save       :encrypt_password
  before_validation :downcase_email
  # after_create      :send_email_confirmation_instructions
  before_destroy    :validate_destroy

  Role::NAMES.each do |name_constant|
    define_method("get_#{name_constant}?") { self.role.try(:name) == name_constant.to_s }
  end

  def to_json
    {
        id: id,
        email: email,
        name: name,
        role: role.name,
        avatar:  paperclip_url(avatar)
    }
  end

  def authenticate(password)
    self.encrypted_password == encrypt(password)
  end

  def self.search_query(params)
    users = User.arel_table
    roles = Role.arel_table

    q = users.group(users[:id], roles[:id])

    if params[:count]
      q.project('COUNT(*)')
    else
      q.project('users.*', roles[:name].as('role_name'))
    end

    q.join(roles, Arel::Nodes::OuterJoin).on(users[:role_id].eq(roles[:id]))

    if User.column_names.include?(params[:sort_column]) && %w(asc desc).include?(params[:sort_type])
      q.order(users[params[:sort_column]].send(params[:sort_type] == 'asc' ? :asc : :desc))
    elsif 'role_name' == params[:sort_column] && %w(asc desc).include?(params[:sort_type])
      q.order(roles[:name].send(params[:sort_type] == 'asc' ? :asc : :desc))
    else
      q.order(users[:id].desc)
    end

    q.where(users[:id].eq(params[:id])) if params[:id].present?
    q.where(users[:email].matches("%#{params[:email]}%")) if params[:email].present?
    q.where(roles[:id].in(params[:role_ids])) if params[:role_ids].present?

    q
  end

  def validate_destroy
    if self.admin? && User.where(role_id: Role.admin.id).count == 1
      self.errors.add :base, 'Can not remove last admin.'
      throw :abort
      false
    elsif User.count == 1

      self.errors.add :base, 'Can not remove last user.'
      throw :abort
      false
    end
  end

  def send_email_confirmation_instructions
    unless social?
      self.update_attribute :confirmation_token, SecureRandom.random_number(999999)
      UserMailer.confirmation_instructions(self.id).deliver_now
    end
  end

  def send_password_reset
    self.update_attribute :reset_password_token, SecureRandom.random_number(999999)
    UserMailer.password_reset(self.id).deliver_now
  end

  def social?
    facebook_id || strava_id
  end

  private

  def validate_password?
    new_record? || !password.nil? || !password_confirmation.nil?
  end

  def downcase_email
    self.email = self.email.downcase if self.email
  end

  def encrypt_password
    self.salt = make_salt if salt.blank?
    self.encrypted_password = encrypt(self.password) if self.password
  end

  def encrypt(string)
    secure_hash("#{string}--#{self.salt}")
  end

  def make_salt
    secure_hash("#{Time.now.utc}--#{self.password}")
  end

  def secure_hash(string)
    Digest::SHA2.hexdigest(string)
  end
end
