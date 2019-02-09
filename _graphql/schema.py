# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals

import graphene

from .users.query import Query as UserQuery
from .users.mutations import Mutations as UserMutations


class Query(
        UserQuery,
        graphene.ObjectType
    ):
    pass

class Mutations(
        UserMutations,
        graphene.ObjectType
    ):
    pass

schema = graphene.Schema(query=Query, mutation=Mutations)