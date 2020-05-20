from django.shortcuts import render
from rest_framework import viewsets, permissions
from .serializers import MatchSerializer
from .models import Match
# Create your views here.


class MatchViewSet(viewsets.ModelViewSet):
    queryset = Match.objects.all()
    serializer_class = MatchSerializer

    permission_classes = [
        permissions.AllowAny
    ]
