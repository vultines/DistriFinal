from django.urls import include, path
from rest_framework import routers
from centros import views

#api versioning

router = routers.DefaultRouter()
router.register(r'tutor', views.tutorView, 'tutor')
router.register(r'employee', views.employeeView, 'employee')
router.register(r'child', views.childView, 'child')
router.register(r'tutor_child', views.tutor_childView, 'tutor_child')
router.register(r'class_group', views.class_groupView, 'class_group')
router.register(r'stablishments', views.stablishmentsView, 'stablishments')
router.register(r'schedule', views.scheduleView, 'schedule')
router.register(r'announcements', views.announcementsView, 'announcements')
router.register(r'complaint', views.complaintView, 'complaint')

urlpatterns = [
    path('api/v1/', include(router.urls))
]