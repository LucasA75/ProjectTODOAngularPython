from django.db import models

from users.models import User

# Create your models here.
class Task(models.Model):

    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    done= models.BooleanField(default=False)
    ownerTask = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False, related_name="tasks")

    def __str__(self):
        return self.title