# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals

import graphene
from django.conf import settings
from django.contrib.auth import get_user as auth_get_user
from graphene_django.forms.converter import convert_form_field


class GraphqlRuntimeError(Exception):
    """
    This exception is used when we want to catch an error
    that should not append. It can spot programming errors
    on frontend size. We want to raise this error and create
    a 500 error to alert us but we want to keep it quite
    when we run the tests
    """
    pass


def input_from_django_form(name, Form, optional_fields=None):
    fields = {i: convert_form_field(j) for i, j in Form.base_fields.items()}
    if optional_fields is None:
        optional_fields = {}
    for (field_name, field_value) in optional_fields.items():
        fields[field_name] = field_value
    return type(str(name), (graphene.InputObjectType,), fields)

def get_user(context):
    from django.utils.functional import LazyObject
    if settings.TESTING:
        user = context.user
        if isinstance(user, LazyObject):
            return user._wrapped  # pylint: disable=W0212
        return user
    return auth_get_user(context)


