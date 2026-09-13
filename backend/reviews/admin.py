from django.contrib import admin

from .models import Review


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "job",
        "rating",
        "created_at",
    )

    list_filter = ("rating",)

    search_fields = (
        "job__customer__email",
        "job__technician__email",
        "comment",
    )

    ordering = ("-created_at",)