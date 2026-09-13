from rest_framework import serializers

from .models import TechnicianProfile


class TechnicianProfileSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source="user.email", read_only=True)
    phone = serializers.CharField(source="user.phone", read_only=True)
    average_rating = serializers.FloatField(read_only=True)

    class Meta:
        model = TechnicianProfile
        fields = [
            "id",
            "email",
            "phone",
            "category",
            "bio",
            "experience",
            "latitude",
            "longitude",
            "address",
            "profile_picture",
            "average_rating",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "email",
            "phone",
            "average_rating",
            "created_at",
            "updated_at",
        ]