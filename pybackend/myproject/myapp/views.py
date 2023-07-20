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
        audio1=AudioSegment.from_file('C://Users/Acer/OneDrive/Desktop/Avishkar2023/server-side/react-app/public/audios/'+file1)
        audio2=AudioSegment.from_file('C://Users/Acer/OneDrive/Desktop/Avishkar2023/server-side/react-app/public/mixaudios/'+id+'_'+file2)
        max_len=max(len(audio1),len(audio2))
        audio1 = audio1._spawn(audio1.raw_data + b'\x00' * (max_len - len(audio1)))
        audio2 = audio2._spawn(audio2.raw_data + b'\x00' * (max_len - len(audio2)))
        audio1 = audio1.set_frame_rate(44100)
        audio2 = audio2.set_frame_rate(44100)
        audio1 = audio1.set_channels(2)
        audio2 = audio2.set_channels(2)

        combine=audio1.overlay(audio2)
        # samples1 = np.array(audio1.get_array_of_samples())
        # samples2 = np.array(audio2.get_array_of_samples())
        # mixed_samples = samples1 + samples2
        print(combine)

        print("kjh",file1,"jhgc",file2,"jhgv",id)
        return JsonResponse({"message":"post output"})
    def get(self,request):
        return JsonResponse({"message":"get output"})