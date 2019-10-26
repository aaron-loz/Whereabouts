import twitter
from flask import Flask, jsonify, request
import json

app = Flask(__name__)

@app.route('/')
def hello_world():
    return "Nothing to see here"

@app.route('/get_tweets/<string:query>', methods=['GET'])
def get_tweets(query):
    headers = request.headers
    auth = []
    auth.append(headers.get("consumer-key"))
    auth.append(headers.get("consumer-secret-key"))
    auth.append(headers.get("access-token"))
    auth.append(headers.get("access-secret-token"))
    if None in auth:
        return jsonify({"message": "ERROR: Unauthorized"}), 401
    if query[0] == '?':
        query = query[1:]
    if not 'count' in query:
        query += '&count=100'
    api = twitter.Api(consumer_key = auth[0],
                      consumer_secret = auth[1],
                      access_token_key = auth[2],
                      access_token_secret = auth[3])
    results = api.GetSearch(raw_query= query, return_json=True)
    statuses = results['statuses']

    return jsonify(statuses)


@app.route('/get_friends/<string:twitname>', methods=['GET'])
def get_friends(twitname):
    headers = request.headers
    auth = []
    auth.append(headers.get("consumer-key"))
    auth.append(headers.get("consumer-secret-key"))
    auth.append(headers.get("access-token"))
    auth.append(headers.get("access-secret-token"))
    if None in auth:
        return jsonify({"message": "ERROR: Unauthorized"}), 401
    
    api = twitter.Api(consumer_key = auth[0],
                      consumer_secret = auth[1],
                      access_token_key = auth[2],
                      access_token_secret = auth[3])
    results = api.GetFriends(screen_name = twitname, skip_status = True, include_user_entities = False)
    fids = []
    for x in results:
        fids.append(x._json["screen_name"])
    return jsonify(fids), 200


#example search: http://127.0.0.1:5000/get_tweets/q=twitter%20&result_type=recent&since=2014-07-19&count=100
#example get_friends: http://127.0.0.1:5000/get_friends/StreetFighter
