from rest_framework import serializers
from .models import Book,Author
from django.contrib.auth.models import User



class RegisterUserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length=200)
    email = serializers.EmailField()
    password = serializers.CharField(max_length=100, write_only=True)

    class Meta:
        model = User
        fields = ["username", "email", "password"]

    def validate(self, data):
        """Validate username and email before creating user."""
        if User.objects.filter(username=data['username']).exists():
            raise serializers.ValidationError({"username": "This username is already taken."})

        if User.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError({"email": "This email is already registered."})

        return data

    def create(self, validated_data):
        """Create a new user with a hashed password."""
        return User.objects.create_user(**validated_data)


class LoginUserSerializer(serializers.Serializer):

    username=serializers.CharField(max_length=200)
    password=serializers.CharField(max_length=100)

    
class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model=Author
        fields=["name"]
class BookSerializer(serializers.ModelSerializer):
    author=AuthorSerializer()
    class Meta:

        model=Book
        fields=["name","author","price"]
    def create(self, validated_data):
        author_data = validated_data.pop("author")
        author, _ = Author.objects.get_or_create(**author_data)  
        book = Book.objects.create(author=author, **validated_data)
        return book
    
