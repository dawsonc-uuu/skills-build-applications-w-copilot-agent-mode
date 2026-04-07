from django.core.management.base import BaseCommand
from django.utils import timezone

from ...models import User, Team, Activity, LeaderboardEntry, Workout


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        self.stdout.write('Starting database population...')

        # Clear existing data
        self.stdout.write('Deleting existing data...')
        Workout.objects.all().delete()
        LeaderboardEntry.objects.all().delete()
        Activity.objects.all().delete()
        Team.objects.all().delete()
        User.objects.all().delete()

        # Create teams
        self.stdout.write('Creating teams...')
        marvel = Team.objects.create(name='marvel')
        dc = Team.objects.create(name='dc')

        # Create users (super heroes)
        self.stdout.write('Creating users...')
        marvel_heroes = [
            {'name': 'Iron Man', 'email': 'ironman@marvel.test'},
            {'name': 'Captain America', 'email': 'cap@marvel.test'},
            {'name': 'Thor', 'email': 'thor@marvel.test'},
            {'name': 'Hulk', 'email': 'hulk@marvel.test'},
        ]
        dc_heroes = [
            {'name': 'Batman', 'email': 'batman@dc.test'},
            {'name': 'Superman', 'email': 'superman@dc.test'},
            {'name': 'Wonder Woman', 'email': 'wonderwoman@dc.test'},
            {'name': 'Flash', 'email': 'flash@dc.test'},
        ]

        users = []
        for u in marvel_heroes:
            users.append(User.objects.create(name=u['name'], email=u['email']))
        for u in dc_heroes:
            users.append(User.objects.create(name=u['name'], email=u['email']))

        # Assign users to teams
        self.stdout.write('Assigning team members...')
        for u in users:
            if u.email.endswith('@marvel.test'):
                marvel.members.add(u)
            else:
                dc.members.add(u)

        # Create sample activities
        self.stdout.write('Creating activities...')
        now = timezone.now()
        activities = []
        for u in users:
            activities.append(
                Activity(
                    user=u,
                    team=marvel if u.email.endswith('@marvel.test') else dc,
                    type='run',
                    duration_minutes=30,
                    distance_km=5.0,
                    timestamp=now,
                )
            )
        Activity.objects.bulk_create(activities)

        # Create leaderboard entries
        self.stdout.write('Creating leaderboard entries...')
        leaderboard = []
        rank = 1
        for u in users:
            leaderboard.append(
                LeaderboardEntry(user=u, team=marvel if u.email.endswith('@marvel.test') else dc, score=100.0 - rank, rank=rank)
            )
            rank += 1
        LeaderboardEntry.objects.bulk_create(leaderboard)

        # Create workouts
        self.stdout.write('Creating workouts...')
        workouts = []
        for u in users:
            workouts.append(
                Workout(user=u, title='Sample Workout', description='Auto-generated workout', duration_minutes=45, date=now.date())
            )
        Workout.objects.bulk_create(workouts)

        # Final counts
        self.stdout.write('Population complete:')
        self.stdout.write(f'Users: {User.objects.count()}')
        self.stdout.write(f'Teams: {Team.objects.count()}')
        self.stdout.write(f'Activities: {Activity.objects.count()}')
        self.stdout.write(f'Leaderboard entries: {LeaderboardEntry.objects.count()}')
        self.stdout.write(f'Workouts: {Workout.objects.count()}')
