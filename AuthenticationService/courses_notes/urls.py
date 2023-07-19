from django.urls import path, include
from rest_framework import routers
from .views import (
    CourseViewSet,
    PlaylistViewSet,
    NoteViewSet,
    DashboardViewSet,
    VideosViewSet,
    AllNotesViewSet
)

router = routers.DefaultRouter()
router.register(r'courses', CourseViewSet)
router.register(r'playlists', PlaylistViewSet)
router.register(r'notes', NoteViewSet)
router.register(r'dashboards', DashboardViewSet)
router.register(r'videos', VideosViewSet)
router.register(r'all_notes', AllNotesViewSet)


urlpatterns = [
    path('', include(router.urls)),
]
