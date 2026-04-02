from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import HttpResponse  # ✅ ADD THIS

# ✅ home view
def home(request):
    return HttpResponse("Backend is running 🚀")

urlpatterns = [
    path('', home),  # ✅ ADD THIS LINE
    path('django-admin/', admin.site.urls),
    path('api/auth/', include('apps.users.urls')),
    path('api/', include('apps.portfolio.urls')),
]

# ✅ static/media (only needed for DEBUG=True)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
