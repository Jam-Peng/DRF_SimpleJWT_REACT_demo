from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    # TokenObtainPairView,  刪除這個換成自定義的 views.MyTokenObtainPairView
    TokenRefreshView,
)

urlpatterns = [
    path('', views.getRoutes),

    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('products/', views.ProductList.as_view()),
    path('create_product/', views.ProductCreated.as_view()),
    path('products/<slug:category_slug>/<slug:product_slug>/', views.GetOneProduct.as_view()),
    path('products/<slug:category_slug>/', views.ProductsByCategory.as_view()),                  # 根據分類取的所有產品
    path('products/search/', views.search),
]