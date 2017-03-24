import exifread
import json
import os

#Python script used to get the gps points from the photos

def get_data(data,key):
    if key in data:
        return data[key]
    return None

def _convert_to_degrees(value):
    # convert the GPS coordinates stored in the EXIF to degress in float format
    d = float(value.values[0].num) / float(value.values[0].den)
    m = float(value.values[1].num) / float(value.values[1].den)
    s = float(value.values[2].num) / float(value.values[2].den)
    return d + (m/60.0) + (s/3600.0)


data = []
json_data = {}

# tell what the current path is
print "Current path:",
print os.getcwd()

# Ask the path to the folder of images
path = raw_input("Folder path: ")
#path = "desktop/images"
os.chdir(path)
dir = os.listdir(os.getcwd())
count = 0

def convert_lat_lng(data, ref):
    if ref == 'S' or ref == 'W':
        return 0-data
    return data

for foto in dir:
    # Hidden files in mac
    if not foto.startswith('.'):
        gpsData = {} #need to create a new object at every photo, ya doink
        count = count + 1
        
        #get the exif tags
        tags = exifread.process_file(open(foto, 'rb'))
        
        print foto
        
        #set the gps data from the tags
        gps_latitude = get_data(tags, 'GPS GPSLatitude')
        gps_latitude_ref = get_data(tags, 'GPS GPSLatitudeRef')
        gps_longitude = get_data(tags, 'GPS GPSLongitude')
        gps_longitude_ref = get_data(tags, 'GPS GPSLongitudeRef')
        
        if gps_longitude != None:
        
            #data for the json
            gpsData["id"] = count
            gpsData["imageName"] = foto
            gpsData["lat"] = convert_lat_lng(_convert_to_degrees(gps_latitude), str(gps_latitude_ref))
            gpsData["lng"] = convert_lat_lng(_convert_to_degrees(gps_longitude), str(gps_longitude_ref))
            data.append(gpsData)

print count,
print "photos processed"
#json_data = json.dumps(data, indent=4, sort_keys=True)
		
#convert the gps lat and long to numbers - the minus is based on the N and E (both +ve)

with open('../photo_gps.js', 'w') as out:
     json.dump(data, out, sort_keys=True, indent=4, separators=(',', ': '))
   


        


