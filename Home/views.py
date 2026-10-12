from django.shortcuts import render

def HOMEPAGE(request):
    return render(request,'Home/index.html')
