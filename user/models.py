# -*- coding: utf-8 -*-

from django.contrib import admin
from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):


    def __str__(self):
        return "{}".format(self.get_full_name())
