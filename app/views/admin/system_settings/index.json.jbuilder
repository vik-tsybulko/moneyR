json.system_setting do
  json.activity_sync_from_date @settings.activity_sync_from_date || Time.now
  json.activity_min_distance @settings.activity_min_distance || 0
end
