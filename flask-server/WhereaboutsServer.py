import twitter
from flask import Flask, jsonify, request
import json

app = Flask(__name__)

@app.route('/')
def hello_world():
    return "Nothing to see here"

# @app.route('/get_tweets/<string:query>', methods=['GET'])
# def get_tweets(query):
#     headers = request.headers
#     auth = []
#     auth.append(headers.get("consumer-key"))
#     auth.append(headers.get("consumer-secret-key"))
#     auth.append(headers.get("access-token"))
#     auth.append(headers.get("access-secret-token"))
#     if None in auth:
#         return jsonify({"message": "ERROR: Unauthorized"}), 401
#     if query[0] == '?':
#         query = query[1:]
#     if not 'count' in query:
#         query += '&count=100'
#     api = twitter.Api(consumer_key = auth[0],
#                       consumer_secret = auth[1],
#                       access_token_key = auth[2],
#                       access_token_secret = auth[3])
#     results = api.GetSearch(raw_query= "q=twitter%20&result_type=recent&since=2014-07-19&count=2", return_json=True)
#     statuses = results['statuses']

#     return jsonify(statuses)

@app.route('/get_tweets/<string:query>/<string:geo>', methods=['GET'])
def get_tweets(query, geo):
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
        query += '&count=3'
    api = twitter.Api(consumer_key = auth[0],
                      consumer_secret = auth[1],
                      access_token_key = auth[2],
                      access_token_secret = auth[3])
    if geo == 'none':
        print("Here1")
        results = api.GetSearch(raw_query = query, return_json=True)
    else:
        print("Here2")
        print(geo)
        #TODO: REMOVE TEMP_QUERY
        temp_query = 'q=CurbedNY%20OR%20NYCRobyn%20OR%20NYCGuitarSchool'
        results = api.GetSearch(raw_query = query, geocode=geo, return_json=True, count=5)
        print(results)
    res = {'entities': []}
    for item in results['statuses']:
        my_dict={}
        my_dict['created_at']=item['created_at']
        my_dict['twit_id_str']=item['id_str']
        my_dict['text']=item['text']
        my_dict['user_id_str']=item['user']['id_str']
        my_dict['user_screen_name']=item['user']['screen_name']
        my_dict['user_profile_image_url_https']=item['user']['profile_image_url_https']
        my_dict['geo']=item['geo']
        my_dict['coordinates']=item['coordinates']
        my_dict['place'] = item['place']
        if (my_dict['place'] or my_dict['coordinates'] or my_dict['geo']):
            res['entities'].append(my_dict)
    return jsonify(res)

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
    results = api.GetFriends(screen_name = twitname)
    fids = []
    for x in results:
        fids.append({"id_str" : x._json["id_str"], "screen_name" : x._json["screen_name"]})
    return jsonify(fids), 200


#example search: http://127.0.0.1:5000/get_tweets/q=twitter%20&result_type=recent&since=2014-07-19&count=100
#example get_friends: http://127.0.0.1:5000/get_friends/StreetFighter
