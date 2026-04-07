from rest_framework import serializers
from .models import User, Team, Activity, LeaderboardEntry, Workout


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'created_at']


class TeamSerializer(serializers.ModelSerializer):
    members = UserSerializer(many=True, read_only=True)

    class Meta:
        model = Team
        fields = ['id', 'name', 'members', 'created_at']


class ActivitySerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    team = serializers.PrimaryKeyRelatedField(queryset=Team.objects.all(), allow_null=True, required=False)

    class Meta:
        model = Activity
        fields = ['id', 'user', 'team', 'type', 'duration_minutes', 'distance_km', 'timestamp']


class LeaderboardEntrySerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    team = serializers.PrimaryKeyRelatedField(queryset=Team.objects.all(), allow_null=True, required=False)

    class Meta:
        model = LeaderboardEntry
        fields = ['id', 'user', 'team', 'score', 'rank', 'timestamp']


class WorkoutSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Workout
        fields = ['id', 'user', 'title', 'description', 'duration_minutes', 'date']
