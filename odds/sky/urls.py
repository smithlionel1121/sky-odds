from rest_framework import routers
from .views import MatchViewSet

router = routers.DefaultRouter()
router.register('api/match', MatchViewSet)

urlpatterns = router.urls
