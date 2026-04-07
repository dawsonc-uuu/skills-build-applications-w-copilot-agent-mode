from django.db import models


class User(models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} <{self.email}>"


class Team(models.Model):
    name = models.CharField(max_length=150)
    members = models.ManyToManyField(User, related_name='teams', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Activity(models.Model):
    ACTIVITY_TYPES = [
        ('run', 'Run'),
        ('bike', 'Bike'),
        ('swim', 'Swim'),
        ('workout', 'Workout'),
        ('other', 'Other'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='activities')
    team = models.ForeignKey(Team, on_delete=models.SET_NULL, null=True, blank=True, related_name='activities')
    type = models.CharField(max_length=50, choices=ACTIVITY_TYPES, default='other')
    duration_minutes = models.PositiveIntegerField(null=True, blank=True)
    distance_km = models.FloatField(null=True, blank=True)
    timestamp = models.DateTimeField()

    def __str__(self):
        return f"{self.user} - {self.type} @ {self.timestamp}"


class LeaderboardEntry(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='leaderboard_entries')
    team = models.ForeignKey(Team, on_delete=models.SET_NULL, null=True, blank=True, related_name='leaderboard_entries')
    score = models.FloatField(default=0.0)
    rank = models.PositiveIntegerField(null=True, blank=True)
    timestamp = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user} - {self.score}"


class Workout(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='workouts')
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    duration_minutes = models.PositiveIntegerField(null=True, blank=True)
    date = models.DateField()

    def __str__(self):
        return f"{self.title} ({self.user})"
