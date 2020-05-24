from django.shortcuts import render
from rest_framework import viewsets, permissions
from .serializers import MatchSerializer, StatisticsSerializer
from .models import Match, Statistics
# Create your views here.


class MatchViewSet(viewsets.ModelViewSet):
    queryset = Match.objects.all()
    serializer_class = MatchSerializer

    permission_classes = [
        permissions.AllowAny
    ]


class StatisticsViewSet(viewsets.ModelViewSet):
    queryset = Statistics.objects.all()
    serializer_class = StatisticsSerializer

    permission_classes = [
        permissions.AllowAny
    ]
