# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-09-28 17:47
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appinter', '0002_auto_20170928_1743'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pushedexpress',
            name='pushed',
            field=models.ManyToManyField(to='appinter.mainexpress'),
        ),
    ]