from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Product
from .products import products
from .serializes import ProductSerializer
from .serializes import UserSerializer


# Create your views here.
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self,attrs):
      data = super().validate(attrs)
      data['username'] = self.user.username
      data['email'] = self.user.email
        

      return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

def getRoutes(request):  
  return JsonResponse('texto', safe=False)

@api_view(['GET'])
def getUserProfile(request):
  user = request.user
  serailizer = UserSerializer(user, many=False)
  return Response(serailizer.data)


@api_view(['GET'])
def getProducts(request):
  products= Product.objects.all()
  serailizer = ProductSerializer(products, many=True)
  return Response(serailizer.data)


@api_view(['GET'])
def getProduct(request, pk):
  product= Product.objects.get(_id=pk)
  serializes = ProductSerializer(product,many=False)
  
  """  
  product= None
  for i in products:
    if i['_id']==pk:
      product=i
      break"""
  return Response(serializes.data)