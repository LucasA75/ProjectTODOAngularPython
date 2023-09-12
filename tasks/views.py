from django.shortcuts import get_object_or_404
from requests import Response
from rest_framework import viewsets, views
from rest_framework.decorators import action
from users.models import User
from rest_framework import status
from .serializer import TaskSerializer
from .models import Task
from django.views import View
import json
from rest_framework.response import Response
# Create your views here.
class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()


class TaskListView(viewsets.ViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()
    def ListTasksbyID(self, request, *args, **kwargs):
        try:
          id = kwargs.get('id')
          tasks = Task.objects.filter(ownerTask=id)
          serializer = TaskSerializer(tasks,many=True)
          return Response(serializer.data)
        except Task.DoesNotExist: 
           return Response({"error": "No se encontraron elementos coincidentes"},status=status.HTTP_404_NOT_FOUND)