from django.contrib import admin

from .models import Job


@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "customer",
        "technician",
        "status",
        "created_at",
    )

    list_filter = ("status",)

    search_fields = (
        "customer__email",
        "technician__email",
        "description",
    )

    ordering = ("-created_at",)