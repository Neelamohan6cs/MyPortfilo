from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from .models import Hero, Skill, Project, Education, Internship, Certification, Workshop, ContactMessage
from .serializers import (
    HeroSerializer, SkillSerializer, ProjectSerializer, EducationSerializer,
    InternshipSerializer, CertificationSerializer, WorkshopSerializer, ContactMessageSerializer
)


class PublicPortfolioView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        hero = Hero.objects.first()
        return Response({
            'hero':           HeroSerializer(hero, context={'request': request}).data if hero else {},
            'skills':         SkillSerializer(Skill.objects.all(), many=True).data,
            'projects':       ProjectSerializer(Project.objects.all(), many=True, context={'request': request}).data,
            'education':      EducationSerializer(Education.objects.all(), many=True).data,
            'internships':    InternshipSerializer(Internship.objects.all(), many=True).data,
            'certifications': CertificationSerializer(Certification.objects.all(), many=True, context={'request': request}).data,
            'workshops':      WorkshopSerializer(Workshop.objects.all(), many=True, context={'request': request}).data,
        })


class PublicContactView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        s = ContactMessageSerializer(data=request.data)
        if s.is_valid():
            s.save()
            return Response({'message': 'Sent!'}, status=201)
        return Response(s.errors, status=400)


class AdminHeroView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes     = [MultiPartParser, FormParser, JSONParser]

    def get(self, request):
        hero = Hero.objects.first()
        return Response(HeroSerializer(hero, context={'request': request}).data if hero else {})

    def put(self, request):
        hero, _ = Hero.objects.get_or_create(pk=1)
        s = HeroSerializer(hero, data=request.data, partial=True, context={'request': request})
        if s.is_valid():
            s.save()
            return Response(s.data)
        return Response(s.errors, status=400)


class AdminSkillListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(SkillSerializer(Skill.objects.all(), many=True).data)

    def post(self, request):
        s = SkillSerializer(data=request.data)
        if s.is_valid():
            s.save()
            return Response(s.data, status=201)
        return Response(s.errors, status=400)


class AdminSkillDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        skill = Skill.objects.get(pk=pk)
        s = SkillSerializer(skill, data=request.data, partial=True)
        if s.is_valid():
            s.save()
            return Response(s.data)
        return Response(s.errors, status=400)

    def delete(self, request, pk):
        Skill.objects.get(pk=pk).delete()
        return Response(status=204)


class AdminProjectListView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes     = [MultiPartParser, FormParser, JSONParser]

    def get(self, request):
        return Response(ProjectSerializer(Project.objects.all(), many=True, context={'request': request}).data)

    def post(self, request):
        s = ProjectSerializer(data=request.data, context={'request': request})
        if s.is_valid():
            s.save()
            return Response(s.data, status=201)
        return Response(s.errors, status=400)


class AdminProjectDetailView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes     = [MultiPartParser, FormParser, JSONParser]

    def put(self, request, pk):
        proj = Project.objects.get(pk=pk)
        s = ProjectSerializer(proj, data=request.data, partial=True, context={'request': request})
        if s.is_valid():
            s.save()
            return Response(s.data)
        return Response(s.errors, status=400)

    def delete(self, request, pk):
        Project.objects.get(pk=pk).delete()
        return Response(status=204)


class AdminInternshipListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(InternshipSerializer(Internship.objects.all(), many=True).data)

    def post(self, request):
        s = InternshipSerializer(data=request.data)
        if s.is_valid():
            s.save()
            return Response(s.data, status=201)
        return Response(s.errors, status=400)


class AdminInternshipDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        obj = Internship.objects.get(pk=pk)
        s = InternshipSerializer(obj, data=request.data, partial=True)
        if s.is_valid():
            s.save()
            return Response(s.data)
        return Response(s.errors, status=400)

    def delete(self, request, pk):
        Internship.objects.get(pk=pk).delete()
        return Response(status=204)


class AdminCertListView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes     = [MultiPartParser, FormParser, JSONParser]

    def get(self, request):
        return Response(CertificationSerializer(Certification.objects.all(), many=True, context={'request': request}).data)

    def post(self, request):
        s = CertificationSerializer(data=request.data, context={'request': request})
        if s.is_valid():
            s.save()
            return Response(s.data, status=201)
        return Response(s.errors, status=400)


class AdminCertDetailView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes     = [MultiPartParser, FormParser, JSONParser]

    def put(self, request, pk):
        obj = Certification.objects.get(pk=pk)
        s = CertificationSerializer(obj, data=request.data, partial=True, context={'request': request})
        if s.is_valid():
            s.save()
            return Response(s.data)
        return Response(s.errors, status=400)

    def delete(self, request, pk):
        Certification.objects.get(pk=pk).delete()
        return Response(status=204)


class AdminWorkshopListView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes     = [MultiPartParser, FormParser, JSONParser]

    def get(self, request):
        return Response(WorkshopSerializer(Workshop.objects.all(), many=True, context={'request': request}).data)

    def post(self, request):
        s = WorkshopSerializer(data=request.data, context={'request': request})
        if s.is_valid():
            s.save()
            return Response(s.data, status=201)
        return Response(s.errors, status=400)


class AdminWorkshopDetailView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes     = [MultiPartParser, FormParser, JSONParser]

    def put(self, request, pk):
        obj = Workshop.objects.get(pk=pk)
        s = WorkshopSerializer(obj, data=request.data, partial=True, context={'request': request})
        if s.is_valid():
            s.save()
            return Response(s.data)
        return Response(s.errors, status=400)

    def delete(self, request, pk):
        Workshop.objects.get(pk=pk).delete()
        return Response(status=204)


class AdminMessagesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(ContactMessageSerializer(ContactMessage.objects.all(), many=True).data)


class PublicGalleryView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        from .models import GalleryImage
        from .serializers import GalleryImageSerializer
        images = GalleryImage.objects.all()
        return Response(GalleryImageSerializer(images, many=True, context={'request': request}).data)


class AdminGalleryListView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes     = [MultiPartParser, FormParser, JSONParser]

    def get(self, request):
        from .models import GalleryImage
        from .serializers import GalleryImageSerializer
        images = GalleryImage.objects.all()
        return Response(GalleryImageSerializer(images, many=True, context={'request': request}).data)

    def post(self, request):
        from .models import GalleryImage
        from .serializers import GalleryImageSerializer
        s = GalleryImageSerializer(data=request.data, context={'request': request})
        if s.is_valid():
            s.save()
            return Response(s.data, status=201)
        return Response(s.errors, status=400)


class AdminGalleryDetailView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes     = [MultiPartParser, FormParser, JSONParser]

    def put(self, request, pk):
        from .models import GalleryImage
        from .serializers import GalleryImageSerializer
        obj = GalleryImage.objects.get(pk=pk)
        s = GalleryImageSerializer(obj, data=request.data, partial=True, context={'request': request})
        if s.is_valid():
            s.save()
            return Response(s.data)
        return Response(s.errors, status=400)

    def delete(self, request, pk):
        from .models import GalleryImage
        GalleryImage.objects.get(pk=pk).delete()
        return Response(status=204)
