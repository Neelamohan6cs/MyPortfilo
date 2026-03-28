from rest_framework import serializers
from .models import Hero, Skill, Project, Education, Internship, Certification, Workshop, ContactMessage, GalleryImage


class HeroSerializer(serializers.ModelSerializer):
    photo_url = serializers.SerializerMethodField()

    def get_photo_url(self, obj):
        if not obj.photo:
            return None
        request = self.context.get('request')
        if request:
            return request.build_absolute_uri(obj.photo.url)
        return f'http://localhost:8000{obj.photo.url}'

    class Meta:
        model  = Hero
        fields = '__all__'


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Skill
        fields = '__all__'


class ProjectSerializer(serializers.ModelSerializer):
    tech_list = serializers.SerializerMethodField()
    image_url = serializers.SerializerMethodField()

    def get_tech_list(self, obj):
        return [t.strip() for t in obj.tech_stack.split(',') if t.strip()]

    def get_image_url(self, obj):
        if not obj.image:
            return None
        request = self.context.get('request')
        if request:
            return request.build_absolute_uri(obj.image.url)
        return f'http://localhost:8000{obj.image.url}'

    class Meta:
        model  = Project
        fields = '__all__'


class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Education
        fields = '__all__'


class InternshipSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Internship
        fields = '__all__'


class CertificationSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    def get_image_url(self, obj):
        if not obj.image:
            return None
        request = self.context.get('request')
        if request:
            return request.build_absolute_uri(obj.image.url)
        return f'http://localhost:8000{obj.image.url}'

    class Meta:
        model  = Certification
        fields = '__all__'


class WorkshopSerializer(serializers.ModelSerializer):
    image_url  = serializers.SerializerMethodField()
    image_url2 = serializers.SerializerMethodField()
    image_url3 = serializers.SerializerMethodField()

    def _build_url(self, obj, field_name):
        field = getattr(obj, field_name, None)
        if not field:
            return None
        request = self.context.get('request')
        if request:
            return request.build_absolute_uri(field.url)
        return f'http://localhost:8000{field.url}'

    def get_image_url(self,  obj): return self._build_url(obj, 'image')
    def get_image_url2(self, obj): return self._build_url(obj, 'image2')
    def get_image_url3(self, obj): return self._build_url(obj, 'image3')

    class Meta:
        model  = Workshop
        fields = '__all__'


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model  = ContactMessage
        fields = '__all__'


class GalleryImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    def get_image_url(self, obj):
        if not obj.image:
            return None
        request = self.context.get('request')
        if request:
            return request.build_absolute_uri(obj.image.url)
        return f'http://localhost:8000{obj.image.url}'

    class Meta:
        model  = GalleryImage
        fields = '__all__'