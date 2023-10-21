from django.http import JsonResponse
from rest_framework.decorators import api_view

from app import decorator, models, serializers
from pulse import constants as const


@api_view(['GET'])
def get_challenge(request, challenge_id):
    challenge = models.PPChallenge.objects.filter(challenge_id=challenge_id).first()
    challenge_serializer = serializers.ChallengeSerializer(challenge, many=False).data
    response = {
        'data': challenge_serializer,
        'message': "Fetched challenge details successfully!",
        'statusCode': const.SUCCESS_STATUS_CODE,
    }
    return JsonResponse(response)


@api_view(['POST'])
@decorator.valid_json
def create_challenge(request):
    response = {}
    data = request.input_data
    if not data.get('challenge_id', None) or not data.get('user_address'):
        response['statusCode'] = const.PARAMETER_VALIDATION
        response['message'] = const.PARAMETER_MISSING_OR_INVALID_MESSAGE
        return JsonResponse(response)
    challenge, created = models.PPChallenge.objects.get_or_create(challenge_id=data.get('challenge_id'), user_address=data.get('user_address'))
    challenge.steps = data.get('steps', 0)
    challenge.save()
    challenge_serializer = serializers.ChallengeSerializer(challenge, many=False).data
    response = {
        'data': challenge_serializer,
        'message': "Challenge created or updated successfully!",
        'statusCode': const.SUCCESS_STATUS_CODE,
    }
    return JsonResponse(response)