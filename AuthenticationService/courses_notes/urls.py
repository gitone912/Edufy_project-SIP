from django.urls import path, include
from rest_framework import routers
from .views import (
    CourseViewSet,
    PlaylistViewSet,
    NoteViewSet,
    DashboardViewSet,
    VideosViewSet,
)

router = routers.DefaultRouter()
router.register(r'courses', CourseViewSet)
router.register(r'playlists', PlaylistViewSet)
router.register(r'notes', NoteViewSet)
router.register(r'dashboards', DashboardViewSet)
router.register(r'videos', VideosViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
