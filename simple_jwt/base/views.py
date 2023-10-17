from django.shortcuts import render
from django.http import Http404
from django.db.models import Q
from .serializers import ProductSerializer, CategorySerializer
from .models import Category, Product

from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

# 驗證使用者
from rest_framework.decorators import permission_classes         
from rest_framework.permissions import IsAuthenticated

# Simple JWT 
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    

@api_view(['GET'])
def getRoutes(request):
    routes = [
        'GET | api/v1/',
        'POST | api/v1/token/',
        'POST | api/v1/token/refresh/',

        'GET | api/v1/products/',
        'POST | api/v1/create_product/',
        'GET PUT DELETE | api/v1/products/<slug:category_slug>/<slug:product_slug>/',
        'GET | api/v1/products/<slug:category_slug>/',
        'POST | api/v1/products/search/',
    ]
    return Response(routes)

# 測試使用者驗證路徑
# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def getNotes(request):
#     user = request.user
#     notes = user.note_set.all()
#     serializer = NoteSerializer(notes, many=True)
#     return Response(serializer.data, status=status.HTTP_200_OK)

# =================  使用類別 APIView 寫法  ================= #
# 取得全部產品
class ProductList(APIView):
    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

# 建立產品
class ProductCreated(APIView):
    def post(self, request):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 


# 取得、更新、刪除單一產品
class GetOneProduct(APIView):
    def get_product(self, category_slug, product_slug):
        try:
            return Product.objects.filter(category__slug=category_slug).get(slug=product_slug)
        except Product.DoesNotExist:
            raise Http404
        
    def get(self, request, category_slug, product_slug):
        product = self.get_product(category_slug, product_slug)
        serializer = ProductSerializer(product)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, category_slug, product_slug):
        product = self.get_product(category_slug, product_slug)
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, category_slug, product_slug):
        product = self.get_product(category_slug, product_slug)
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# 根據分類取得所有產品 
class ProductsByCategory(APIView):
    def get_category(self, category_slug):
        try:
            return Category.objects.get(slug=category_slug)
        except Category.DoesNotExist:
            raise Http404
        
    def get(self, request, category_slug):
        category = self.get_category(category_slug)
        serializer = CategorySerializer(category)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

# 搜尋
@api_view(['POST'])
def search(request):
    query = request.data.get('query', '')

    if query:
        products = Product.objects.filter(Q(name__icontains=query) | Q(description__icontains=query))
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
    else:
        return Response({"products": []})
