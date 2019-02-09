# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals

import json
import string

def check_password_strength(password):
    return (len(password) >= 8 and
        any(c.isdigit() for c in password) and
        any(c.isupper() for c in password) and
        any(c.islower() for c in password) and
        any(c in string.punctuation+' ' for c in password))
