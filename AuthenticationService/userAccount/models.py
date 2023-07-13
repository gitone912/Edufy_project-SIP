from django.db import models
from userAuth.models import MyUser

#create a model unique for every user and store the data like adress skills they like etc

class UserProfile(models.Model):
    user = models.OneToOneField(MyUser, on_delete=models.CASCADE, to_field='email')
    user_cart_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.user.name
