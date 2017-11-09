from django.db import models

# Create your models here.

class mainexpress(models.Model):
    uuid = models.CharField(max_length=7)
    likes = models.IntegerField(default=0)
    message = models.CharField(max_length=200)
    lat = models.CharField(max_length=200)
    lon = models.CharField(max_length=200)
    dist = models.CharField(max_length=200)

    def __str__(self):
        retstring = self.uuid + ' ' + str(self.likes) + ' ' + self.message + ' ' + self.lat + ' ' + self.lon + ' dist: ' + str(self.dist)
        return retstring 

class pushedexpress(models.Model):
    uuid = models.CharField(max_length=7)
    pushed = models.ManyToManyField('mainexpress')

