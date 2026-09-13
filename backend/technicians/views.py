from django.db.models import Avg
from rest_framework import generics

from .filters import TechnicianFilter
from .models import TechnicianProfile
from .serializers import TechnicianProfileSerializer

class TechnicianProfileCreateView(generics.CreateAPIView):
    serializer_class = TechnicianProfileSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        if self.request.user.role != self.request.user.Role.TECHNICIAN:
            from rest_framework.exceptions import PermissionDenied

            raise PermissionDenied(
                "Only technicians can create technician profiles."
            )

        serializer.save(user=self.request.user)

class TechnicianProfileDetailView(generics.RetrieveUpdateAPIView):
    serializer_class = TechnicianProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return TechnicianProfile.objects.filter(
            user=self.request.user
        )

class TechnicianProfileListView(generics.ListAPIView):
    serializer_class = TechnicianProfileSerializer
    filterset_class = TechnicianFilter

    def get_queryset(self):
        return TechnicianProfile.objects.annotate(
            average_rating=Avg(
                "user__technician_jobs__review__rating"
            )
        )