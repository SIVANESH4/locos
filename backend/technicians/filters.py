import django_filters

from .models import TechnicianProfile


class TechnicianFilter(django_filters.FilterSet):
    min_rating = django_filters.NumberFilter(
        field_name="average_rating",
        lookup_expr="gte"
    )

    class Meta:
        model = TechnicianProfile
        fields = ["category", "min_rating"]