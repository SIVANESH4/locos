from django.contrib import admin

from .models import TechnicianProfile


@admin.register(TechnicianProfile)
class TechnicianProfileAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "category", "experience", "created_at")
    list_filter = ("category",)
    search_fields = ("user__email", "user__phone")
    ordering = ("-created_at",)