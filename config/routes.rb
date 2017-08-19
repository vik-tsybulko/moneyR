Rails.application.routes.draw do
  resources :country_flags, only: [:index]
  root to: 'pages#index'

  scope '(:locale)' do

    resources :sessions, only: [:create] do
      collection do
        delete :destroy
        get :check
      end
    end

    resources :email_sender, only: :index do
      collection do
        put :update
      end
    end

    namespace :api do
      namespace :v1 do
        post :login, to: 'sessions#create'
        post :signup, to: 'users#create'
        delete :logout, to: 'sessions#destroy'
        get :profile, to: 'users#profile'

        resources :users, only: [] do
          collection do
            put :update
          end
        end

        resources :email_verification, only: [:create] do
          collection do
            post :resend
          end
        end

        resources :password_resets, only: [:create] do
          collection do
            put :update
          end
        end
      end
    end
  end

  mount TryApi::Engine => '/developers'
end
