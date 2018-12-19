import xmltodict
from math import radians, cos, sin, asin, sqrt

def haversine(lon1, lat1, lon2, lat2):
    """
    Calculate the great circle distance between two points 
    on the earth (specified in decimal degrees)
    """
    # convert decimal degrees to radians 
    lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])

    # haversine formula 
    dlon = lon2 - lon1 
    dlat = lat2 - lat1 
    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
    c = 2 * asin(sqrt(a)) 
    r = 6371 # Radius of earth in kilometers. Use 3956 for miles
    return c * r


with open('Afternoon_Run_20181218.gpx') as fd:
    doc = xmltodict.parse(fd.read())
    

with open('run.csv','wb') as f:
    f.write("lat, lon, time, ele, pLat, pLon, distance" + "\n")
    for r in doc['gpx']['trk']['trkseg']['trkpt']:
        #print r.get('@lat'), r.get('@lon'), r.get('time'), r.get('ele')

        cLat = float(r.get('@lat'))
        cLon = float(r.get('@lon'))

        index = doc['gpx']['trk']['trkseg']['trkpt'].index(r)

        pLat = 0
        pLon = 0
        distance = 0

        if index > 0: 
        	pLat = float(doc['gpx']['trk']['trkseg']['trkpt'][index-1].get('@lat'))
        	pLon = float(doc['gpx']['trk']['trkseg']['trkpt'][index-1].get('@lon'))
        	distance = haversine(cLon, cLat, pLon, pLat)
        	#print pLon

        f.write(str(r.get('@lat')) + "," + str(r.get('@lon')) + "," + str(r.get('time')) + "," + str(r.get('ele')) + "," + str(pLat) + "," + str(pLon) + "," + str(distance))
        f.write('\n')
    f.close()
