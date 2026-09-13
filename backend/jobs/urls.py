from django.urls import path

from .views import (
    JobCreateView,
    JobListView,
    JobStatusUpdateView,
    JobCancelView,
)


urlpatterns = [
    path("", JobListView.as_view(), name="job-list"),
    path("create/", JobCreateView.as_view(), name="job-create"),
    path(
        "<int:pk>/status/",
        JobStatusUpdateView.as_view(),
        name="job-status-update",
    ),
    path(
        "<int:pk>/cancel/",
        JobCancelView.as_view(),
        name="job-cancel",
    ),
]