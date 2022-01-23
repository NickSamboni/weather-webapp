import pymongo as mongo
import requests
import json
from pymongo import MongoClient, InsertOne
from geojson import Feature, Point

try:
    connection = MongoClient('mongodb://127.0.0.1:27017')
    print("Connected successfully!!!")
except:
    print("Could not connect to MongoDB")

db = connection["weather_app_testing"]
Collection = db["data"]

"""states = ['WA','OR','AK','MT','ID','NV','AZ',
'WY','UT','CO','NM','HI','ND','SD','NE','KS','OK',
'TX','MN','IA','MO','AR','LA','WI','IL','MS','MI',
'IN','KY','TN','AL','OH','WV','GA','FL','ME','VT',
'NH','NJ','PA','VA','NC','SC','MA','RI','CT','DE',
'MD','NY'];"""

response_API = requests.get('https://api.weather.gov/stations?state=NY')
data = response_API.text
parse_json = json.loads(data)

stations_id = []
list_of_dict = []
for x in parse_json['observationStations']:
    observationStations = [x]
    stations_id.append(observationStations[0][33:40])

for x in stations_id:
    response_API2 = requests.get('https://api.weather.gov/stations/'+x+'/observations/latest')
    if(response_API2.status_code == 200):
        parse_json = json.loads(response_API2.text)
        _type =  parse_json['geometry']['type']
        coordenates = parse_json['geometry']['coordinates']

        timestamp = parse_json['properties']['timestamp']
        elevation = parse_json['properties']['elevation']['value']
        temperature = parse_json['properties']['temperature']['value']
        WindDir = parse_json['properties']['windDirection']['value']
        WindSpeed = parse_json['properties']['windSpeed']['value']
        seaLevelPressure = parse_json['properties']['seaLevelPressure']['value']
        visibility = parse_json['properties']['visibility']['value']
        maxTemp24h = parse_json['properties']['maxTemperatureLast24Hours']['value']
        minTemp24h = parse_json['properties']['minTemperatureLast24Hours']['value']
        humidity = parse_json['properties']['relativeHumidity']['value']
        p = Point(coordenates, _type)
        jsonobj = {
            "geometry": p,
            "Elevation": elevation,
            "temperature": temperature,
            "windDirection": WindDir,
            "windSpeed": WindSpeed,
            "seaLevelPressure": seaLevelPressure,
            "timestamp": timestamp,
            "visibility": visibility,
            "maxTemp24h":maxTemp24h,
            "minTemp24h":minTemp24h,
            "humidity": humidity,
        }
        json.dumps(jsonobj)
        list_of_dict.append(jsonobj)
        #fea = Feature(geometry=p,properties={})
with open('json_data.json', 'a') as outfile:
    json.dump(list_of_dict, outfile)