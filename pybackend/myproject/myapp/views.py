from django.shortcuts import render
from rest_framework.views import APIView
from django.http import HttpResponse
from django.http import JsonResponse
from pydub import AudioSegment
# from pydub.effects import equalize
import json
import os

# Create your views here.

class AudioEdit(APIView):
    def post(self,request):
        url=request.POST['url']
        bass=request.POST['bass']
        treble=request.POST['treble']
        volume=request.POST['volume']
        audio=AudioSegment.from_file('C:/Users/Acer/OneDrive/Desktop/Avishkar2023/server-side/react-app/public/audios/'+url)
        louder_audio=audio+int(volume)
        bassed_audio=audio.low_pass_filter(int(bass))
        trebled_audio=bassed_audio.high_pass_filter(int(treble))
        louder_audio=trebled_audio+int(volume)
        louder_audio.export('C:/Users/Acer/OneDrive/Desktop/Avishkar2023/server-side/react-app/public/editedaudios/'+url,format='wav')
        print(trebled_audio,bass,treble,volume)
        return JsonResponse({"message":"post output"})
    def get(self,request):
        return JsonResponse({"message":"get output"})