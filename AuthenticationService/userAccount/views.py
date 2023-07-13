from rest_framework import generics
from .models import UserProfile
from .serializers import UserProfileSerializer
from rest_framework.response import Response

class UserProfileListCreateView(generics.ListCreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

class UserProfileRetrieveView(generics.RetrieveAPIView):
    serializer_class = UserProfileSerializer

    def post(self, request, *args, **kwargs):
        # Extract the email ID from the request
        email = request.data.get('email')

        # Retrieve the UserProfile instance based on the email ID
        try:
            user_profile = UserProfile.objects.get(user__email=email)
            serializer = self.get_serializer(user_profile)
            return Response(serializer.data)
        except UserProfile.DoesNotExist:
            return Response({'error': 'User profile Id not found.'}, status=404)