from django.db import models

# Create your models here.


class Match(models.Model):
    sky_url = models.URLField()
    home_odds = models.FloatField(null=True)
    draw_odds = models.FloatField(null=True)
    away_odds = models.FloatField(null=True)
    kick_off = models.TimeField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Matches"


class Statistics(models.Model):
    match = models.ForeignKey(
        Match, on_delete=models.CASCADE, related_name='statistics')
    home_odds = models.FloatField(null=True)
    draw_odds = models.FloatField(null=True)
    away_odds = models.FloatField(null=True)
    time = models.TimeField()

    class Meta:
        verbose_name_plural = "Statistics"
