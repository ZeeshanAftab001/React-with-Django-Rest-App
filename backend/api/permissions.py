from rest_framework.permissions import BasePermission

class IsAccountAdminOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        # Allow read-only access for all users
        if request.method in ('GET', 'HEAD', 'OPTIONS'):
            return True
        # Allow only admin users to modify
        return request.user and request.user.is_staff
