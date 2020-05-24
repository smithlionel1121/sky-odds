from rest_framework import serializers

from .models import Match, Statistics


class MatchSerializer(serializers.HyperlinkedModelSerializer):
    statistics = serializers.HyperlinkedRelatedField(
        view_name='statistic-detail', read_only=True, many=True)

    class Meta:
        model = Match
        fields = "__all__"


class StatisticsSerializer(serializers.HyperlinkedModelSerializer):
    match = serializers.ReadOnlyField(source='match.sky_url')

    class Meta:
        model = Statistics
        fields = '__all__'
