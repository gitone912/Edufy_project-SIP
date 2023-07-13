from django.urls import path
from .views import UserProfileListCreateView , UserProfileRetrieveView

urlpatterns = [
    path('userprofiles/', UserProfileListCreateView.as_view(), name='userprofile-list-create'),
    path('getuserprofile/', UserProfileRetrieveView.as_view(), name='user-profile'),

]
