from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response


class HealthCheckView(APIView):
	"""Simple health check endpoint for the API."""

	permission_classes = []

	def get(self, request):
		return Response({"status": "ok"})
