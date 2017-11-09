from django.shortcuts import render
import json
from django.http import JsonResponse
from math import radians, cos, sin, asin, sqrt
from decimal import Decimal
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from .models import mainexpress
from .models import pushedexpress
# Create your views here.

def like(request, expressMsg):
    message = ''
    for achar in expressMsg:
        if achar == '+':
            message = message + ' '
        else:
            message = message + achar

    express_set = mainexpress.objects.filter(message=message)

    for a in express_set:
        a.likes = a.likes + 1
        a.save()

    return HttpResponse(express_set[0].likes)


def postReq(request, expressString):
    uuid = expressString[:7]
    expressString = expressString[8:]

    lat = ''
    lon = ''
    message = ''

    counter = 0

    #to get latitude
    for achar in expressString:
        if achar != '+':
            lat = lat + achar
            counter = counter + 1
        else:
            counter = counter + 1
            break

    if lat[0]=='0':
        return HttpResponse("Please enable location services")

    expressString = expressString[counter:]
    counter = 0

    #to get longitude
    for achar in expressString:
        if achar != '+':
            lon = lon + achar
            counter = counter + 1
        else:
            counter = counter + 1
            break

    expressString = expressString[counter:]

    #to get message
    for bchar in expressString:
        if bchar == '+':
            message = message + ' '
        else:
            message = message + bchar

    a = mainexpress()
    a.uuid = uuid
    a.likes = 0
    a.message = message
    a.lat = lat
    a.lon = lon
    dist = Decimal(0.0)
    a.dist = dist
    a.save()

    b = pushedexpress()
    b.uuid = uuid
    b.save()
    b.pushed.add(a)
    b.save()

    stringResponse = uuid + ' ' + str(lat) + ' ' + str(lon) + ' ' + message + ' ' + str(a.dist)

    return HttpResponse(stringResponse)

class tosort():
    uuid = ''
    lat = 0.0
    lon = 0.0
    likes = 0
    message = ''
    dist = 0.0

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
    km = 6367 * c
    km = km * 0.621371
    return km

def getReq(request, devInfo):
    uuid = devInfo[:7]
    devInfo = devInfo[8:]

    counter = 0
    lat = ''
    for achar in devInfo:
        if achar != '+':
            lat = lat + achar
            counter = counter + 1
        else:
            counter = counter + 1
            break

    if lat[0] == '0':
        lolwalist = []
        return JsonResponse(lolwalist, safe=False)
    

    devInfo = devInfo[counter:]
    lon = ''

    for bchar in devInfo:
        if bchar != '+':
            lon = lon + bchar
        else:
            break

    wholelist = list(mainexpress.objects.all())

    newlist = []

    for item in wholelist:
        a = tosort()
        a.uuid = item.uuid
        a.lat = float(item.lat)
        a.lon = float(item.lon)
        a.message = item.message
        a.likes = item.likes
        a.dist = haversine(a.lon, a.lat, float(lon), float(lat))
        newlist.append(a)

    portedlist = sorted(newlist, key=lambda x: x.dist, reverse=False)


    userlist = list(pushedexpress.objects.filter(uuid=uuid))

    pushedlist = []

    sortedlist = []

    if len(userlist) == 0:
        b = pushedexpress()
        b.uuid = uuid
        b.save()
        userlist.append(b);
        sortedlist = portedlist
    else:
        pushedlist = list(userlist[0].pushed.all())

        for toka in portedlist:
            present = 0
            for popa in pushedlist:
                if toka.message == popa.message:
                    present = 1
            if present == 0:
                sortedlist.append(toka)

    #PUSH TO pushedexpress
    counter = 0
    boop = 0
    for item in sortedlist:
        if boop == 1:
            break

        for daalde in wholelist:
            if daalde.message == item.message:
                if len(userlist) > 0:
                    userlist[0].pushed.add(daalde)
                    counter = counter + 1
                    if counter == 5:
                        boop = 1


    retlist = []
    counter = 0;
    for dictitem in sortedlist:
        b = {}
        b["likes"] = str(dictitem.likes)
        b["message"] = str(dictitem.message)
        b["dist"] = str(dictitem.dist)
        retlist.append(b)
        counter = counter + 1
        if counter == 5:
            break



#    finaljson = json.dumps(retlist, safe=False)

    return JsonResponse(retlist, safe=False)
