# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-09-29 00:15
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appinter', '0007_auto_20170929_0005'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pushedexpress',
            name='pushed',
            field=models.ManyToManyField(to='appinter.mainexpress'),
        ),
    ]
