import os
import json

def get_albums():
    data = {}
    os.chdir("/Users/jonnybland/Dropbox/Blog/Albums/covers")
    directory = os.listdir(os.getcwd())
    count = 0
    for f in directory:
    # Hidden files in mac
        if not f.startswith('.'):
            count +=1
            filepath = "covers/" + f
            idno = count
            data[idno] = filepath
            json_data = json.dumps(data)
    return data