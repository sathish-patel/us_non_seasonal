from django.test import TestCase
from django.test.testcases import SimpleTestCase

class TestURL(SimpleTestCase):
    def test_url_resolved(self):
        assert 1==2
