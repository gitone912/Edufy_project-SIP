from rest_framework import serializers
from .models import Course, Playlist, Note, Dashboard, Videos, AllNotes


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'


class VideosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Videos
        fields = '__all__'

class AllNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = AllNotes
        fields = '__all__'


class PlaylistSerializer(serializers.ModelSerializer):
    all_videos = VideosSerializer(many=True, read_only=True)

    class Meta:
        model = Playlist
        fields = '__all__'


class NoteSerializer(serializers.ModelSerializer):
    all_notes = AllNotesSerializer(many=True, read_only=True)
    class Meta:
        model = Note
        fields = '__all__'


class DashboardSerializer(serializers.ModelSerializer):
    courses = CourseSerializer(many=True)
    playlists = PlaylistSerializer(many=True)
    notes = NoteSerializer(many=True)
    videos = VideosSerializer(many=True)
    all_notes = AllNotesSerializer(many=True)

    class Meta:
        model = Dashboard
        fields = '__all__'


class UpdateDashboardSerializer(serializers.ModelSerializer):
    courses = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all(), many=True)
    playlists = serializers.PrimaryKeyRelatedField(queryset=Playlist.objects.all(), many=True)
    notes = serializers.PrimaryKeyRelatedField(queryset=Note.objects.all(), many=True)
    videos = serializers.PrimaryKeyRelatedField(queryset=Videos.objects.all(), many=True)
    all_notes = serializers.PrimaryKeyRelatedField(queryset=AllNotes.objects.all(), many=True)

    class Meta:
        model = Dashboard
        fields = '__all__'