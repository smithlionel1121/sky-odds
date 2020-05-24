from rest_framework import routers
from .views import MatchViewSet, StatisticsViewSet

router = routers.DefaultRouter()
router.register(r'match', MatchViewSet)
router.register(r'statistics', StatisticsViewSet)

urlpatterns = router.urls
