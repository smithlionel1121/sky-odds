import pyppeteer
import asyncio
from requests_html import AsyncHTMLSession
from django.db import models

# Create your models here.
import re
from requests_html import HTMLSession
from pyppeteer.errors import TimeoutError

# from .odds_calcs import combi_and_profit


class Match(models.Model):
    sky_url = models.URLField()
    home_odds = models.FloatField(null=True)
    draw_odds = models.FloatField(null=True)
    away_odds = models.FloatField(null=True)
    kick_off = models.TimeField(null=True)
    home_team = models.CharField(default="Home", max_length=150)
    away_team = models.CharField(default="Away", max_length=150)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Matches"

    def __str__(self):
        return f'({self.pk}) {self.home_team} v  {self.away_team}'

    def save(self, *args, **kwargs):
        sky = self.sky_url
        data_source = SkyScraping(sky)
        self.home_team, self.away_team = data_source.teams()
        super(Match, self).save(*args, **kwargs)


class Statistics(models.Model):
    match = models.ForeignKey(
        'sky.match', on_delete=models.CASCADE, related_name='statistics')
    home_odds = models.FloatField(null=True)
    draw_odds = models.FloatField(null=True)
    away_odds = models.FloatField(null=True)
    home_score = models.IntegerField(null=True)
    away_score = models.IntegerField(null=True)
    home_goals = models.CharField(blank=True, max_length=300)
    away_goals = models.CharField(blank=True, max_length=300)
    minutes = models.FloatField(null=True)

    # home_hedged_profit = models.FloatField(null=True)
    # draw_hedged_profit = models.FloatField(null=True)
    # away_hedged_profit = models.FloatField(null=True)
    # home_hedged_ratio = models.FloatField(null=True)
    # draw_hedged_ratio = models.FloatField(null=True)
    # away_hedged_ratio = models.FloatField(null=True)

    created_at = models.TimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Statistics"

    def save(self, *args, **kwargs):
        data_source = SkyScraping(self.match.sky_url)
        self.home_odds, self.draw_odds, self.away_odds = data_source.odds()
        self.minutes = data_source.time()
        self.home_score, self.away_score, self.home_goals, self.away_goals = data_source.score()

        # home_hedged_profit, home_hedged_ratio = combi_and_profit(
        #     self.match.home_odds, 1, self.draw_odds, self.away_odds)
        # draw_hedged_profit, draw_hedged_ratio = combi_and_profit(
        #     self.match.draw_odds, 1, self.home_odds, self.away_odds)
        # away_hedged_profit, away_hedged_ratio = combi_and_profit(
        #     self.match.away_odds, 1, self.home_odds, self.draw_odds)

        super(Statistics, self).save(*args, **kwargs)

    def __str__(self):
        return f"{str(self.match)} {self.minutes}"


async def get_post(your_query_url):
    new_loop = asyncio.new_event_loop()
    asyncio.set_event_loop(new_loop)
    session = AsyncHTMLSession()
    browser = await pyppeteer.launch({
        'ignoreHTTPSErrors': True,
        'headless': True,
        'handleSIGINT': False,
        'handleSIGTERM': False,
        'handleSIGHUP': False
    })
    try:
        session._browser = browser
        resp_page = await session.get(your_query_url)
        await resp_page.html.arender()
        await browser.close()
        return resp_page
    except TimeoutError:
        await browser.close()
        raise TimeoutError


class SkyScraping:
    def __init__(self, url):
        self.url = url

    @property
    def scrape(self):
        method_url = self.url

        r = asyncio.run(get_post(method_url))
        return r

    def scoreboard(self, f):
        def decorator_function(*args, **kwargs):
            scoreboard = self.scrape.html.find('.in-play-scoreboard__header')
            return f(self, scoreboard, *args, **kwargs)
        return decorator_function

    def odds(self):
        categories = self.scrape.html.find('._ty4a3m')
        odds_pattern = r"(?P<numerator>[0-9]+)/(?P<denominator>[0-9]+)"
        odds = []
        for category in categories:
            cat_name = category.find('._t0tx82', first=True).text
            if cat_name == 'Full Time Result':
                options = category.find('._rcu3iw')
                for option in options:
                    odds_fraction = re.search(odds_pattern, option.text)
                    odds_numerator, odds_denominator = odds_fraction.group(
                        'numerator'), odds_fraction.group('denominator')
                    odds_decimal = int(odds_numerator) / \
                        int(odds_denominator) + 1
                    odds.append(odds_decimal)
        return odds[0], odds[1], odds[2]

    def time(self):
        try:
            time = self.scrape.html.find(
                '.js-scoreboard__clock', first=True).text
            clock_pattern = r"(?P<minutes>[0-9]+):(?P<seconds>[0-9]+)"
            time_match = re.search(clock_pattern, time)
            time_mins = int(time_match.group('minutes'))
            time_secs = int(time_match.group('seconds'))
            time = round((time_mins + (time_secs / 60)), 2)
            return time
        except AttributeError:
            time = self.scrape.html.find(
                '.js-scoreboard__status', first=True).text
            return None

        else:
            return None

    def teams(self):
        home = self.scrape.html.find(
            '.in-play-scoreboard__fixture-team--home', first=True)
        home_team = home.find(
            '.in-play-scoreboard__team-name', first=True).text

        home_data = home.find('.in-play-scoreboard__meta-list-li')
        home_goals = "".join(x.text for x in home_data)

        away = self.scrape.html.find(
            '.in-play-scoreboard__score-team-away', first=True)
        away_team = away.find(
            '.in-play-scoreboard__team-name', first=True).text
        return home_team, away_team

    def score(self):
        home = self.scrape.html.find(
            '.in-play-scoreboard__fixture-team--home', first=True)
        home_score = self.scrape.html.find(
            '.js-scoreboard__score-home', first=True).text
        home_data = home.find('.in-play-scoreboard__meta-list-li')
        home_goals = "".join(x.text for x in home_data)

        away = self.scrape.html.find(
            '.in-play-scoreboard__score-team-away', first=True)
        away_score = away.find('.js-scoreboard__score-away', first=True).text
        away_data = away.find('.in-play-scoreboard__meta-list-li')
        away_goals = "".join(x.text for x in away_data)
        return home_score, away_score, home_goals, away_goals
