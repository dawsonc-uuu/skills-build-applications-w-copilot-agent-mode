"""octofit_tracker URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework.response import Response
from rest_framework.decorators import api_view
import os
from . import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet, basename='user')
router.register(r'teams', views.TeamViewSet, basename='team')
router.register(r'activities', views.ActivityViewSet, basename='activity')
router.register(r'leaderboard', views.LeaderboardViewSet, basename='leaderboardentry')
router.register(r'workouts', views.WorkoutViewSet, basename='workout')


# API root that uses the CODESPACE_NAME env var when available to construct absolute URLs
@api_view(['GET'])
def codespace_api_root(request, format=None):
    codespace = os.environ.get('CODESPACE_NAME')
    if codespace:
        base = f"https://{codespace}-8000.app.github.dev"
    else:
        # fallback to request host
        scheme = 'https' if request.is_secure() else 'http'
        base = f"{scheme}://{request.get_host()}"

    return Response(
        {
            'users': f"{base}/api/users/",
            'teams': f"{base}/api/teams/",
            'activities': f"{base}/api/activities/",
            'leaderboard': f"{base}/api/leaderboard/",
            'workouts': f"{base}/api/workouts/",
        }
    )

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', codespace_api_root, name='api-root'),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
