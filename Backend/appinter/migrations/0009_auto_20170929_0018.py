# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-09-29 00:18
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appinter', '0008_auto_20170929_0015'),
    ]

    operations = [
        migrations.AddField(
            model_name='mainexpress',
            name='dist',
            field=models.CharField(default=0, max_length=200),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='pushedexpress',
            name='pushed',
            field=models.ManyToManyField(to='appinter.mainexpress'),
        ),
    ]
