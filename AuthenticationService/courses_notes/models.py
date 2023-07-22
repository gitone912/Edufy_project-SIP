from django.db import models
from userAuth.models import MyUser


class Course(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    def __str__(self):
        return self.title


class Videos(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    codes = models.TextField(blank=True, null=True)
    video_link = models.CharField(max_length=255, blank=True, null=True)
    videoNumber = models.IntegerField(blank=True, null=True)
    
    def __str__(self):
        return self.title

class AllNotes(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField(blank=True, null=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    notes_link = models.CharField(max_length=255, blank=True, null=True)
    notesNumber = models.IntegerField(blank=True, null=True)
    def __str__(self):
        return self.title

class Playlist(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    all_videos = models.ManyToManyField(Videos, related_name='playlists', blank=True)
    color= models.CharField( max_length=50,blank=True, null=True)
    icon= models.CharField( max_length=50,blank=True, null=True)
    total_hours_playlist = models.CharField(max_length=50, blank=True, null=True)
    footerLabel = models.CharField(max_length=50, blank=True, null=True)
    
    def __str__(self):
        return self.title


class Note(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField(blank=True, null=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    all_notes = models.ManyToManyField(AllNotes, related_name='notes', blank=True)
    icon = models.CharField(max_length=50, blank=True, null=True)
    color = models.CharField(max_length=50, blank=True, null=True)
    def __str__(self):
        return self.title
    


class Dashboard(models.Model):
    user = models.OneToOneField(MyUser, on_delete=models.CASCADE, to_field='email')
    courses = models.ManyToManyField(Course, related_name='dashboards')
    playlists = models.ManyToManyField(Playlist, related_name='dashboards')
    notes = models.ManyToManyField(Note, related_name='dashboards')
    videos = models.ManyToManyField(Videos, related_name='dashboards')
    all_notes = models.ManyToManyField(AllNotes, related_name='dashboards')
    def __str__(self):
        return self.user.email

class UserProgress(models.Model):
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE, to_field='email')
    hours_watched = models.IntegerField(blank=True, null=True)
    playlists_completed = models.IntegerField(blank=True, null=True)
    def __str__(self):
        return self.user.email