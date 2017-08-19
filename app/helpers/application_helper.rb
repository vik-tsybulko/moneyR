module ApplicationHelper
  def paperclip_url(paperclip_attachment, style = nil)
    return nil unless paperclip_attachment
    if Paperclip::Attachment.default_options[:storage] == :s3
      paperclip_attachment.exists? ? 'http:' + paperclip_attachment.try(:url, style) : nil
    else
      paperclip_attachment.exists? ? "#{ ENV['HOST'] }#{ paperclip_attachment.try(:url, style)}" : nil
    end
  end
end
