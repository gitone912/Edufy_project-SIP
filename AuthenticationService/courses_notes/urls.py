from django.urls import path, include
from rest_framework import routers
from .views import (
    CourseViewSet,
    PlaylistViewSet,
    NoteViewSet,
    DashboardViewSet,
    VideosViewSet,
    AllNotesViewSet,
    find_dashboard_id_by_email,
    update_dashboard,
    weeklyProgressViewSet,
    MonthlyUserProgressViewSet
)

router = routers.DefaultRouter()
router.register(r'courses', CourseViewSet)
router.register(r'playlists', PlaylistViewSet)
router.register(r'notes', NoteViewSet)
router.register(r'dashboards', DashboardViewSet)
router.register(r'videos', VideosViewSet)
router.register(r'all_notes', AllNotesViewSet)
router.register(r'weekly_progress', weeklyProgressViewSet)
router.register(r'monthly_progress', MonthlyUserProgressViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('find_dashboard_id_by_email/', find_dashboard_id_by_email, name='find_dashboard_id_by_email'),
    path('dashboard/update/<int:dashboard_id>/', update_dashboard, name='update_dashboard'),
    
]
