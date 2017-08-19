json.owner do
  json.id @current_user.id
  json.first_name @current_user.first_name
  json.last_name @current_user.last_name
  json.avatar @current_user.avatar.present? ? @current_user.avatar : @current_user.avatar_string
end

json.activities @activities.each do |activity|
  json.id activity.id
  json.name activity.name
  json.description activity.description
  json.distance activity.distance
  json.moving_time activity.moving_time
  json.elapsed_time activity.elapsed_time
  json.total_elevation_gain activity.total_elevation_gain
  json.elev_high activity.elev_high
  json.elev_low activity.elev_low
  json.type activity.activity_type
  json.start_date activity.start_date
  json.start_latitude activity.start_latitude
  json.start_longitude activity.start_longitude
  json.end_latitude activity.end_latitude
  json.end_longitude activity.end_longitude
  json.photos activity['photos'].map do |photo|
    json.file photo['link_500']
  end
  json.race_title activity.race_title
  json.race_name activity.race_name
  json.report activity.report
  json.website activity.website

  user = User.new({
      id: activity.user_id,
      avatar_file_name: activity['user_avatar_file_name'],
      avatar_content_type: activity['user_avatar_content_type'],
      avatar_file_size: activity['user_avatar_file_size'],
      avatar_string: activity['user_avatar_strava']
                  })

  json.user_id activity.user_id
  json.user_first_name activity['user_first_name']
  json.user_last_name activity['user_last_name']
  json.user_email activity['user_email']
  json.user_avatar user.avatar.present? ? user.avatar : user.avatar_string
  json.race_title activity.race_title
  json.race_name activity.race_name
  json.report activity.report
  json.website activity.website

  json.created_at activity.created_at
  json.updated_at activity.updated_at
end
json.count @count