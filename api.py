#testing python code to see how to get the proper data from National Weather Service-US
import requests
import json
import pandas as pd

params = {
    "limit" : 2
}
res = requests.get('https://api.weather.gov/stations', params=params)

data = res.json()

"""def jprint(data):
    text = json.dumps(data, sort_keys = True, indent = 4)
    print(text)

jprint(res.json())"""

dict = {}

for i in range(len(data['features'])):
    dict['coords'] = data['features'][i]['geometry']['coordinates']
    dict['place'] = data['features'][i]['properties']['name']
    print( data['features'][i]['geometry']['coordinates'])
    
df = pd.DataFrame().from_dict(dict)
print(df)