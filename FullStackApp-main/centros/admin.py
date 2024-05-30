from django.contrib import admin
from .models import tutor, schedule, employee, class_group, stablishments, announcements, complaint, child, tutor_child

# Register your models here.

admin.site.register(tutor)
admin.site.register(schedule)
admin.site.register(employee)
admin.site.register(class_group)
admin.site.register(stablishments)
admin.site.register(announcements)
admin.site.register(complaint)
admin.site.register(child)
admin.site.register(tutor_child)


