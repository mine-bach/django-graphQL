import graphene
from graphene_django.types import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from user.models import User
from django.contrib.auth import get_user

class UserNode(DjangoObjectType):
    class Meta:
        model = User

    pk = graphene.Int()
    username = graphene.String()
    def resolve_username(self, info):
        return self.__str__()


class Query(object):
    users = graphene.List(UserNode)
    def resolve_users(self, info):
        return User.objects.all()

    auth = graphene.Field(UserNode)
    def resolve_auth(self, info):
        auth_user = info.context.user
        if auth_user:
            return auth_user
        return None