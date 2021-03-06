# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-09-28 01:47
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='mainExpress',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('uuid', models.CharField(max_length=7)),
                ('likes', models.IntegerField(default=0)),
                ('message', models.CharField(max_length=200)),
                ('lat', models.CharField(max_length=200)),
                ('lon', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='pushedExpress',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('userid', models.CharField(max_length=7)),
                ('pushed', models.ManyToManyField(to='appinter.mainExpress')),
            ],
        ),
    ]
