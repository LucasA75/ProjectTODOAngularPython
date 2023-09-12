from django.urls import path, include
from rest_framework import routers
from users import views
from rest_framework.documentation import include_docs_urls

router = routers.DefaultRouter()
router.register(r"users", views.UserView, "users")


urlpatterns = [
    path("api/v1/", include(router.urls)),
    path("docs/", include_docs_urls(title = "User API") ),
    path('user/', views.UserView.as_view({'get': 'list'})),
    path('api/v1/validate/', views.UserView.as_view({'post': 'verifyValidUser'}))
]

