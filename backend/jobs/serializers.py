from rest_framework import serializers

from .models import Job


class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = [
            "id",
            "customer",
            "technician",
            "description",
            "status",
            "service_address",
            "latitude",
            "longitude",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "customer",
            "created_at",
            "updated_at",
        ]

    def validate_status(self, value):
        if not self.instance:
            return value

        current_status = self.instance.status

        allowed_transitions = {
            Job.Status.PENDING: [
                Job.Status.ACCEPTED,
                Job.Status.REJECTED,
            ],
            Job.Status.ACCEPTED: [
                Job.Status.IN_PROGRESS,
            ],
            Job.Status.IN_PROGRESS: [
                Job.Status.COMPLETED,
            ],
            Job.Status.COMPLETED: [],
            Job.Status.REJECTED: [],
            Job.Status.CANCELLED: [],
        }

        if value not in allowed_transitions[current_status]:
            raise serializers.ValidationError(
                f"Cannot change status from {current_status} to {value}."
            )

        return value