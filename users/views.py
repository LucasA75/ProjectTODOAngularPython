from django.forms import model_to_dict
from rest_framework import views
from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.decorators import action
from users.models import User
from .serializer import UserSerializer

# Create your views here.
class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    
    def verifyValidUser(self, request):
        try:
            result = User.objects.get(username=request.data.get('username'), password=request.data.get('password'))
            user_dict = model_to_dict(result, fields=['id', 'username'])
            serializer = UserSerializer(data=[user_dict],many=True)
            if serializer.is_valid():
                print(serializer.data)
            return Response(serializer.data[0], status=status.HTTP_202_ACCEPTED)

        except User.DoesNotExist:
            return Response({"error": "No se encontraron elementos coincidentes"}, status=status.HTTP_404_NOT_FOUND)

