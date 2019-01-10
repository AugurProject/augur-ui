document.documentElement.className += (("ontouchstart" in document.documentElement) ? " touch-enabled" : " touch-disabled");
  if (window.navigator && navigator.serviceWorker) {
    navigator.serviceWorker.getRegistrations()
      .then(function(registrations) {
        if (registrations.length === 0) return;
        var p = registrations.map(function(registration) {
          return registration.unregister();
        });

        return Promise.all(p).then(function() {
          // We must reload to prevent unregistered service workers from running.
          window.location.reload();
        });
      });
  }