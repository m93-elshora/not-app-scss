import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loggedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const plat_id: object = inject(PLATFORM_ID);

  if (isPlatformBrowser(plat_id)) {
    if (localStorage.getItem('userToken') !== null) {
      router.navigate(['/home']);
      return false;
    } else {
      return true;
    }
  }
  return false;
};
