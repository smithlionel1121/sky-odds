from rest_framework import serializers

from .models import Match, Statistics


class MatchSerializer(serializers.HyperlinkedModelSerializer):
    statistics = serializers.HyperlinkedRelatedField(
        view_name='statistics-detail', read_only=True, many=True)

    class Meta:
        model = Match
        fields = "__all__"


class StatisticsSerializer(serializers.HyperlinkedModelSerializer):
    sky = serializers.ReadOnlyField(source='match.sky_url')
    #ref = serializers.HyperlinkedIdentityField(view_name='statistics-detail')

    class Meta:
        model = Statistics
        fields = '__all__'
