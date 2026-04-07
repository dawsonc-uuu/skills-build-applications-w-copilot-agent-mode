from django.test import TestCase
from .models import User, Team


class SimpleModelTests(TestCase):
    def test_create_user_and_team(self):
        u = User.objects.create(name='Test User', email='test@example.com')
        t = Team.objects.create(name='Team Alpha')
        t.members.add(u)
        self.assertEqual(u.teams.count(), 1)
        self.assertEqual(t.members.count(), 1)
