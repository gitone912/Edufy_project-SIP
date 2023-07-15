from rest_framework import serializers
from .models import Course, Playlist, Note, Dashboard, Videos


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'


class VideosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Videos
        fields = '__all__'


class PlaylistSerializer(serializers.ModelSerializer):
    all_videos = VideosSerializer(many=True, read_only=True)

    class Meta:
        model = Playlist
        fields = '__all__'


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'


class DashboardSerializer(serializers.ModelSerializer):
    courses = CourseSerializer(many=True, read_only=True)
    playlists = PlaylistSerializer(many=True, read_only=True)
    notes = NoteSerializer(many=True, read_only=True)
    videos = VideosSerializer(many=True, read_only=True)

    class Meta:
        model = Dashboard
        fields = '__all__'
