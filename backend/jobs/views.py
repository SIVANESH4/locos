from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Job
from .serializers import JobSerializer


class JobCreateView(generics.CreateAPIView):
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        if self.request.user.role != self.request.user.Role.CUSTOMER:
            from rest_framework.exceptions import PermissionDenied

            raise PermissionDenied(
                "Only customers can create jobs."
            )

        serializer.save(customer=self.request.user)


class JobListView(generics.ListAPIView):
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        return Job.objects.filter(
            customer=user
        ) | Job.objects.filter(
            technician=user
        )

class JobStatusUpdateView(generics.UpdateAPIView):
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.role != self.request.user.Role.TECHNICIAN:
            return Job.objects.none()

        return Job.objects.filter(
            technician=self.request.user
        )

class JobCancelView(generics.UpdateAPIView):
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Job.objects.filter(
            customer=self.request.user
        )

    def perform_update(self, serializer):
        job = serializer.instance

        if job.status not in [
            Job.Status.PENDING,
            Job.Status.ACCEPTED,
        ]:
            from rest_framework.exceptions import ValidationError

            raise ValidationError(
                "This job cannot be cancelled."
            )

        serializer.save(status=Job.Status.CANCELLED)