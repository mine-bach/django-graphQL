import graphene
import string
import random
import json

from django.core.mail import EmailMultiAlternatives, BadHeaderError

from graphene_django.forms.mutation import DjangoModelFormMutation
from graphene_django.filter import DjangoFilterConnectionField
from graphene_django.types import DjangoObjectType

from _graphql.helpers import input_from_django_form
from .email_style import buttonStyle
from .form import UserInformationsForm, UserAuthenticationForm
from floral.settings import WEBSITE_URL, EMAIL_HOST_USER

from user.models import User
from .query import UserNode

import graphql_jwt

UserInformationsInput = input_from_django_form('UserInformationsInput', UserInformationsForm)
UserAuthenticationInput = input_from_django_form('UserAuthenticationInput', UserAuthenticationForm)

class SaveUserInformation(graphene.Mutation):
    class Arguments:
        input = graphene.Argument(UserInformationsInput, required=True)

    errors = graphene.String()

    def mutate(self, info, **kwargs):
        errors = None

        input = kwargs.get('input')
        form = UserInformationsForm(input)
        
        if form.is_valid():
            form.save()
        else:
            errors = form.errors.as_json()
        return SaveUserInformation(errors=errors)


class CheckUserAuthentication(graphene.Mutation):
    class Arguments:
        input = graphene.Argument(UserAuthenticationInput, required=True)
    
    errors = graphene.String()

    def mutate(self, info, **kwargs):
        errors = None
        input = kwargs['input']
        form = UserAuthenticationForm(input)
        
        if not form.is_valid():
            errors = form.errors.as_json()
        return CheckUserAuthentication(errors=errors)


class Mutations(graphene.AbstractType):

    save_user_information = SaveUserInformation.Field()
    check_user_authentication = CheckUserAuthentication.Field()
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()