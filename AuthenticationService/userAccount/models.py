from django.db import models
from userAuth.models import MyUser

#create a model unique for every user and store the data like adress skills they like etc

class UserProfile(models.Model):
    user = models.OneToOneField(MyUser, on_delete=models.CASCADE, to_field='email')
    about= models.CharField(max_length=100, default='')
    description = models.TextField(max_length=500, blank=True)
    location = models.CharField(max_length=100, default='')
    skills = models.CharField(max_length=100, default='')
    image = models.ImageField(upload_to='profile_image', blank=True)
    mobile_number = models.CharField(max_length=10, default='')
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.user.name

class Posts(models.Model):
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE, to_field='email')
    post_image = models.ImageField(upload_to='post_image', blank=True)
    post = models.TextField(max_length=500, blank=True,null=True)
    post_id = models.IntegerField(primary_key=True, default=0)

    def __str__(self):
        return self.user.name

class Likes(models.Model):
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE, to_field='email')
    post = models.ForeignKey(Posts, on_delete=models.CASCADE, related_name='likes')

class Comments(models.Model):
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE, to_field='email')
    post = models.ForeignKey(Posts, on_delete=models.CASCADE, related_name='comments')
    comment = models.TextField(max_length=500, blank=True,null=True)

    def __str__(self):
        return self.comment

