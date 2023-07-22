import json
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from .models import Course, Playlist, Note, Dashboard, Videos, AllNotes
from .serializers import (
    CourseSerializer,
    PlaylistSerializer,
    NoteSerializer,
    DashboardSerializer,
    VideosSerializer,
    AllNotesSerializer,
    UpdateDashboardSerializer
)
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


class VideosViewSet(viewsets.ModelViewSet):
    queryset = Videos.objects.all()
    serializer_class = VideosSerializer


class PlaylistViewSet(viewsets.ModelViewSet):
    queryset = Playlist.objects.all()
    serializer_class = PlaylistSerializer


class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer


class DashboardViewSet(viewsets.ModelViewSet):
    queryset = Dashboard.objects.all()
    serializer_class = DashboardSerializer

class AllNotesViewSet(viewsets.ModelViewSet):
    queryset = AllNotes.objects.all()
    serializer_class = AllNotesSerializer

@csrf_exempt
@require_POST
def find_dashboard_id_by_email(request):
    try:
        data = json.loads(request.body)
        email = data.get('email', None)
        if email:
            dashboard = get_object_or_404(Dashboard, user__email=email)
            # Assuming Dashboard model has an 'id' field that you want to retrieve
            response_data = {
                'dashboard_id': dashboard.id
            }
            return JsonResponse(response_data)
        else:
            return JsonResponse({"error": "Email parameter is missing."}, status=400)
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON payload."}, status=400)
    except Dashboard.DoesNotExist:
        return JsonResponse({"error": "No dashboard found for the given email."}, status=404)
    
@csrf_exempt
@require_POST
def update_dashboard(request, dashboard_id):
    try:
        data = json.loads(request.body)
        dashboard = get_object_or_404(Dashboard, id=dashboard_id)
        serializer = UpdateDashboardSerializer(dashboard, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON payload."}, status=400)
    except Dashboard.DoesNotExist:
        return JsonResponse({"error": "No dashboard found for the given ID."}, status=404)
    

