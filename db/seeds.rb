puts 'Create admin ...'
User.create email: 'admin@gmail.com',
            password: 'secret',
            password_confirmation: 'secret',
            role_id: Role.get_admin.id