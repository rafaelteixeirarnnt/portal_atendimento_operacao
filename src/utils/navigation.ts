export const navigateInCurrentTab = (url: string) => {
  window.location.assign(url);
};

export const replaceWithHashRoute = (route: string) => {
  const normalizedRoute = route.startsWith("/") ? route : `/${route}`;
  window.history.replaceState(null, "", `/#${normalizedRoute}`);
};
