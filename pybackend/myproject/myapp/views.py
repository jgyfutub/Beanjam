from django.shortcuts import render
from rest_framework.views import APIView
from django.http import HttpResponse
from django.http import JsonResponse
from pydub import AudioSegment
import librosa
import wave
import matplotlib.pyplot as plt
import wave
import sys
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
        audio=AudioSegment.from_file("C:/Users/Acer/OneDrive/Desktop/Avishkar2023/server-side/react-app/public/mixedaudios/"+file1)
        audio.export("C:/Users/Acer/OneDrive/Desktop/Avishkar2023/server-side/react-app/public/audios/"+file2,format='wav')
        print(file1,file2)
        return JsonResponse({"message":"post output"})
    def get(self,request):
        return JsonResponse({"message":"get output"})

class GraphView(APIView):
    def post(self,request):
        file=request.POSt['audio']

        y, sr = librosa.load(file)
        loudness = librosa.feature.rmse(y=y)
        spectral_centroid = librosa.feature.spectral_centroid(y=y, sr=sr)
        spectral_bandwidth = librosa.feature.spectral_bandwidth(y=y, sr=sr)
        frames = range(len(loudness[0]))
        t = librosa.frames_to_time(frames, sr=sr)

        return JsonResponse({"message":"post output"})
    def get(self,request):
        return JsonResponse({"message":"get output"})

class CropViewImage(APIView):
    def post(self,request):
        file=request.POST['url']
        filename=request.POST['filename']
        audio=AudioSegment.from_file('C:/Users/Acer/OneDrive/Desktop/Avishkar2023/server-side/react-app/public/audios/'+filename)
        time=len(audio)
        wav=wave.open(file,'rb')
        n_samples = wav.getnframes()
        signal_wave = wav.readframes(n_samples)
        sample_freq = wav.getframerate()
        t_audio = n_samples/sample_freq
        signal_array = np.frombuffer(signal_wave, dtype=np.int16)
        l_channel = signal_array[0::2]
        times = np.linspace(0, n_samples/sample_freq, num=n_samples)
        plt.figure(figsize=(15, 5))
        plt.plot(times, l_channel)
        plt.savefig("C:/Users/Acer/OneDrive/Desktop/Avishkar2023/server-side/react-app/public/cropplots/"+filename.split(".")[0]+'.png')
        print(file)
        return JsonResponse({"message":"post output","time":time})
    def get(self,request):
        return JsonResponse({"message":"get output"})

class CropAudio(APIView):
    def post(self,request):
        file=request.POST['file']
        array=request.POST['array']
        print(file,int(array.split(",")[1]),int(array.split(",")[0]))
        audio=AudioSegment.from_file('C:/Users/Acer/OneDrive/Desktop/Avishkar2023/server-side/react-app/public/audios/'+file)
        crop=audio[int(array.split(",")[0]):int(array.split(",")[1])]
        print(crop)
        crop.export("C:/Users/Acer/OneDrive/Desktop/Avishkar2023/server-side/react-app/public/cropaudios/"+file,format='wav')
        return JsonResponse({"message":"post output"})
    def get(self,request):
        return JsonResponse({"message":"get output"})

class PostCropAudio(APIView):
    def post(self,request):
        file=request.POST['file']
        audio=AudioSegment.from_file("C:/Users/Acer/OneDrive/Desktop/Avishkar2023/server-side/react-app/public/cropaudios/"+file)
        audio.export("C:/Users/Acer/OneDrive/Desktop/Avishkar2023/server-side/react-app/public/audios/"+file,format='wav')
        print(file)
        return JsonResponse({"message":"post output"})
    def get(self,request):
        return JsonResponse({"message":"get output"})