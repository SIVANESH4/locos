from django.db import models
from accounts.models import User
from categories.models import Category


class TechnicianProfile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="technician_profile"
    )

    category = models.ForeignKey(
        Category,
        on_delete=models.PROTECT,
        related_name="technicians"
    )

    bio = models.TextField(blank=True)
    experience = models.PositiveIntegerField(default=0)

    latitude = models.DecimalField(
        max_digits=9,
        decimal_places=6,
        null=True,
        blank=True
    )

    longitude = models.DecimalField(
        max_digits=9,
        decimal_places=6,
        null=True,
        blank=True
    )

    address = models.TextField(blank=True)

    profile_picture = models.ImageField(
        upload_to="technician_profiles/",
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    