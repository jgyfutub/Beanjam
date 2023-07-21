from django.shortcuts import render
from rest_framework.views import APIView
from django.http import HttpResponse
from django.http import JsonResponse
from pydub import AudioSegment
import librosa
import numpy as np
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
class MixAudios(APIView):
    def post(self,request):
        file1=request.POST['audio']
        id=request.POST['id']
        file2=request.POST['audiomix']
        audio1=AudioSegment.from_file('C://Users/Acer/OneDrive/Desktop/Avishkar2023/server-side/react-app/public/editedaudios/'+file1)
        audio2=AudioSegment.from_file('C://Users/Acer/OneDrive/Desktop/Avishkar2023/server-side/react-app/public/mixaudios/'+id+'_'+file2)
        samples=audio1.overlay(audio2)
        samples.export("C:/Users/Acer/OneDrive/Desktop/Avishkar2023/server-side/react-app/public/mixedaudios/"+id+"_"+file1.split(".")[0]+"_"+file2,format='wav')
        print(samples)

        print("kjh",file1,"jhgc",file2,"jhgv",id)
        return JsonResponse({"message":"post output","imageurl":"C:/Users/Acer/OneDrive/Desktop/Avishkar2023/server-side/react-app/public/mixedaudios/"+id+"_"+file1.split(".")[0]+"_"+file2})
    def get(self,request):
        return JsonResponse({"message":"get output"})
    
class PostAudio(APIView):
    def post(self,request):
        file1=request.POST['syncedaudio']
        file2=request.POST['audio']
        print(file1,file2)
        return JsonResponse({"message":"post output"})
    def get(self,request):
        return JsonResponse({"message":"get output"})
