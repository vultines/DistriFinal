from django.db import models

# Create your models here.


class tutor(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=60, blank=True)
    secondName = models.CharField(max_length=60,blank=True, null=True)
    lastName = models.CharField(max_length=60, blank=True)
    secondLastName = models.CharField(max_length=60,blank=True, null=True)
    phone = models.IntegerField(default=0)
    email = models.CharField(max_length=50, default=0)
    password = models.CharField(max_length=16, default=0)
    ci = models.CharField(max_length=20, default=0)
    status = models.IntegerField(default=1)
    def __str__(self):
        return self.name

class schedule(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    creationDate = models.DateField(auto_now_add=True)
    dateOfLastUpdate = models.DateField(null=True, blank=True, auto_now=True)
    status = models.IntegerField(default=1)
    def __str__(self):
        return self.name

class employee(models.Model):
    id = models.AutoField(primary_key=True)
    role = models.IntegerField()
    name = models.CharField(max_length=60, blank=True)
    secondName = models.CharField(max_length=60,blank=True, null=True)
    lastName = models.CharField(max_length=60, blank=True)
    secondLastName = models.CharField(max_length=60,blank=True, null=True)
    phone = models.IntegerField(default=0)
    email = models.CharField(max_length=50, default=0)
    password = models.CharField(max_length=16, default=0)
    ci = models.CharField(max_length=20, default=0)
    schedule_id = models.ForeignKey(schedule, on_delete=models.CASCADE)
    status = models.IntegerField(default=1)
    def __str__(self):
        return self.name

class class_group(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    classroom = models.CharField(max_length=50)
    employee_id = models.ForeignKey(employee, on_delete=models.CASCADE)
    numberOfChildren = models.IntegerField()
    class_group_status = models.IntegerField(default=1)
    class_user = models.IntegerField()

    def __str__(self):
        return self.name


class stablishments(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=150)
    employee_id = models.ForeignKey(employee, on_delete=models.CASCADE)
    district = models.CharField(max_length=50)
    latitude = models.FloatField()
    longitude = models.FloatField()
    status = models.IntegerField(default=1)

    def __str__(self):
        return self.name

class child(models.Model):
    id = models.AutoField(primary_key=True)
    date_of_entry = models.DateField()
    unique_code = models.IntegerField()
    class_group_id = models.ForeignKey(class_group, on_delete=models.CASCADE)
    schedule_id = models.ForeignKey(schedule, on_delete=models.CASCADE)
    status = models.IntegerField(default=1)

    def __str__(self):
        return self.unique_code


class tutor_child(models.Model):
    tutor_id = models.ForeignKey(tutor, on_delete=models.CASCADE)
    child_id = models.ForeignKey(child, on_delete=models.CASCADE)
    status = models.IntegerField(default=1)
    tutor_user = models.IntegerField()

    def __str__(self):
        return self.tutor_id.name

class announcements(models.Model):
    id = models.AutoField(primary_key=True)
    stablishments_id = models.ForeignKey(stablishments, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=300)
    start_date = models.DateField()
    end_date = models.DateField()
    multimedia = models.CharField(max_length=100)
    status = models.IntegerField(default=1)

    def __str__(self):
        return self.title


class complaint(models.Model):
    id = models.AutoField(primary_key=True)
    description = models.CharField(max_length=500)
    stablishments_id = models.ForeignKey(stablishments, on_delete=models.CASCADE)
    type = models.CharField(max_length=50)
    status = models.IntegerField(default=1)

    def __str__(self):
        return self.type