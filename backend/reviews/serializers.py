from rest_framework import serializers

from .models import Review
from jobs.models import Job


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = [
            "id",
            "job",
            "rating",
            "comment",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "created_at",
            "updated_at",
        ]

    def validate_job(self, job):
        user = self.context["request"].user

        if job.customer != user:
            raise serializers.ValidationError(
                "You can only review your own jobs."
            )

        if job.status != Job.Status.COMPLETED:
            raise serializers.ValidationError(
                "You can only review completed jobs."
            )

        if Review.objects.filter(job=job).exists():
            raise serializers.ValidationError(
                "This job has already been reviewed."
            )

        return job