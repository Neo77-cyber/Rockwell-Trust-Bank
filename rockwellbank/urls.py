from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('signin/', views.signin, name='signin'),
    path('portfolio/', views.portfolio, name = 'portfolio'),
    path('transfer/', views.transfer, name = 'transfer'),
    path('profile/', views.profile, name='profile'),
    path('create-profile/', views.createprofile, name='createprofile'),
    path('update-income/', views.updatebalance, name = 'updatebalance'), 
    path('FAQ', views.FAQ, name='FAQ'),
    path('logout', views.logout, name = 'logout'),
    
      
]
