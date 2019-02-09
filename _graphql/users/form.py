# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import re

from django import forms
from django.contrib.auth.models import Group
from django.db.models import Q

from user.models import User
from _graphql.utils import check_password_strength
from django.contrib.auth import authenticate

import graphql_jwt 

class UserInformationsForm(forms.ModelForm):

    class Meta:
        model = User
        fields = (
            'first_name',
            'last_name',
            'email')

    first_name = forms.CharField(label=u'Prénom')
    last_name = forms.CharField(label=u"Nom")
    email = forms.EmailField(label=u"Adresse email", required=True)

    password = forms.CharField(required=False)
    password_confirmation = forms.CharField(required=False) 

    def clean(self):
        email = self.cleaned_data['email']
        qs = User.objects.filter(Q(username=email) | Q(email=email))
        if self.instance.id:
            qs = qs.exclude(id=self.instance.id)
        if qs.exists():
            self.add_error('email', u"Un utilisateur existe déjà avec cet email.")
        password1 = self.cleaned_data.get("password")
        password2 = self.cleaned_data.get("password_confirmation")
        if password1: 
            if password1 != password2:
                self.add_error('password', u"Les mots de passe ne sont pas identiques.")
                self.add_error('password_confirmation', u"Les mots de passe ne sont pas identiques.")
            if not check_password_strength(password1):
                self.add_error('password', u"Le mot de passe n'est pas assez robuste.")
        return self.cleaned_data

    def save(self):
        self.instance.username = self.instance.email
        user = super(UserInformationsForm, self).save()
        password = self.cleaned_data.get("password")
        user.set_password(password)
        user.save()
        return user

class UserAuthenticationForm(forms.ModelForm):

    class Meta:
        model = User
        fields = (
            'email',
            'password')

    email = forms.EmailField(label=u"Adresse email", required=True)
    password = forms.CharField(required=True)

    def clean(self):
        email = self.cleaned_data['email']
        password = self.cleaned_data['password']

        user = User.objects.filter(email=email).first()
        if not user:
            self.add_error('email', u"E-mail inconnu. Merci de vérifier votre e-mail ou de vous enregistrer")
        else: 
            if not user.check_password(password):
                self.add_error('password', u"Le mot de passe est incorrect") # TODO : CHange message errors
        return self.cleaned_data