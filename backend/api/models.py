from django.db import models

# Create your models here.

class Author(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Book(models.Model):
    name = models.CharField(max_length=100)
    author = models.ForeignKey(Author, related_name="books", on_delete=models.CASCADE)
    price = models.IntegerField()

    def __str__(self):
        return f"{self.name} written by {self.author.name}" 
