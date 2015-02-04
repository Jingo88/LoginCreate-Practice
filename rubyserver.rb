require 'sinatra'
require 'json'
require 'bcrypt'

use Rack::Session::Pool, :cookie_only => false

my.password = BCrypt::Password.create("my password");

secret_password = ''

# json = ''
# File.open('secret.json', 'r') do |f|
#   f.each_line do |line|
#     json << line
#   end
# end
# json_hash = JSON.parse(json)

# secret_password = json_hash['password']


def authenticated?
  session[:valid_user] == true
end

get '/' do
  send_file 'index.html'
end

post '/session' do
  if params[:password] === secret_password
    session[:valid_user] = true
    redirect '/secret_page'
  else
    redirect '/'
  end
end

get '/secret_page' do
  if authenticated?
    return 'Hello! <a href = "http://localhost:4567/secret_page2">Secret Page 2</a>'
  else
    redirect '/'
  end
end

get '/secret_page2' do
  if authenticated?
    return 'Hello! <a href = "http://localhost:4567/secret_page">Secret Page</a>'
  else
    redirect '/'
  end
end