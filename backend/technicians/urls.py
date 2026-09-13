from django.urls import path

from .views import (
    TechnicianProfileCreateView,
    TechnicianProfileDetailView,
)


urlpatterns = [
    path(
        "",
        TechnicianProfileListView.as_view(),
        name="technician-profile-list",
    ),
    path(
        "profile/",
        TechnicianProfileCreateView.as_view(),
        name="technician-profile-create",
    ),
    path(
        "profile/<int:pk>/",
        TechnicianProfileDetailView.as_view(),
        name="technician-profile-detail",
    ),
]