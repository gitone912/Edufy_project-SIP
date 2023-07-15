from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import (
    CourseViewSet,
    PlaylistViewSet,
    NoteViewSet,
    DashboardViewSet
)

router = DefaultRouter()
router.register(r'courses', CourseViewSet)
router.register(r'playlists', PlaylistViewSet)
router.register(r'notes', NoteViewSet)
router.register(r'dashboards', DashboardViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
