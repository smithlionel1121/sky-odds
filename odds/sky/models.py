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
    match = models.OneToOneField(Match, on_delete=models.CASCADE)
    time = models.TimeField()

    class Meta:
        verbose_name_plural = "Statistics"
