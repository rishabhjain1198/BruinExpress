# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-09-28 23:50
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appinter', '0004_auto_20170928_1748'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='mainexpress',
            name='lat',
        ),
        migrations.RemoveField(
            model_name='mainexpress',
            name='lon',
        ),
        migrations.AlterField(
            model_name='pushedexpress',
            name='pushed',
            field=models.ManyToManyField(to='appinter.mainexpress'),
        ),
    ]
