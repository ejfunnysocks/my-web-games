(() => {
  const safeText = (value) => String(value || '');

  function install(options) {
    const id = safeText(options.id);
    const storageKey = `arcade_tutorial_${id}_v1`;
    const host = document.body;
    const startButton = document.querySelector(options.startButton);
    const pauseOverlay = document.querySelector(options.pauseOverlay || '#pause-overlay');

    const tutorial = document.createElement('section');
    tutorial.className = 'arcade-tutorial';
    tutorial.hidden = true;
    tutorial.setAttribute('role', 'dialog');
    tutorial.setAttribute('aria-modal', 'true');
    tutorial.setAttribute('aria-labelledby', `tutorial-${id}-title`);
    tutorial.innerHTML = `
      <div class="arcade-tutorial__card">
        <h2 id="tutorial-${id}-title">${safeText(options.title)}</h2>
        <span class="arcade-tutorial__label">Goal</span><p>${safeText(options.goal)}</p>
        <span class="arcade-tutorial__label">Controls</span><p>${safeText(options.controls)}</p>
        <div class="arcade-tutorial__actions">
          <button type="button" data-action="close">Got it</button>
          <button type="button" class="secondary" data-action="skip">Skip tutorial</button>
        </div>
      </div>`;
    host.appendChild(tutorial);

    const closeTutorial = () => {
      tutorial.hidden = true;
      localStorage.setItem(storageKey, 'seen');
      startButton?.focus();
    };
    tutorial.querySelectorAll('[data-action]').forEach((button) => button.addEventListener('click', closeTutorial));

    const showTutorial = () => { tutorial.hidden = false; tutorial.querySelector('[data-action="close"]')?.focus(); };

    if (startButton) {
      const help = document.createElement('button');
      help.type = 'button';
      help.className = 'arcade-help-btn';
      help.textContent = 'How to play';
      help.addEventListener('click', showTutorial);
      startButton.insertAdjacentElement('afterend', help);
    }

    const pause = () => {
      options.clearInputs?.();
      options.pause?.();
    };
    document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); });
    window.addEventListener('blur', pause);
    tutorial.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeTutorial();
    });

    if (pauseOverlay && !pauseOverlay.querySelector('.arcade-pause-extra')) {
      const actions = document.createElement('div');
      actions.className = 'arcade-pause-extra';
      const restart = document.createElement('button');
      restart.type = 'button';
      restart.textContent = 'Restart';
      restart.addEventListener('click', () => options.restart?.());
      const hub = document.createElement('a');
      hub.href = options.hubHref || '../';
      hub.textContent = 'Return to Hub';
      actions.append(restart, hub);
      pauseOverlay.appendChild(actions);
    }
  }

  function createCoach(id) {
    const storageKey = `arcade_gameplay_tutorial_${id}_v1`;
    const panel = document.createElement('aside');
    panel.className = 'arcade-coach';
    panel.setAttribute('role', 'status');
    panel.setAttribute('aria-live', 'polite');
    panel.hidden = true;
    document.body.appendChild(panel);
    return {
      get needed() { return !localStorage.getItem(storageKey); },
      show(message) { panel.innerHTML = `<strong>Tutorial</strong><br>${safeText(message)}`; panel.hidden = false; },
      complete(message = 'Tutorial complete!') {
        localStorage.setItem(storageKey, 'done');
        panel.innerHTML = `<strong>${safeText(message)}</strong>`;
        window.setTimeout(() => { panel.hidden = true; }, 1600);
      },
      hide() { panel.hidden = true; }
    };
  }

  window.ArcadeCommon = { install, createCoach };
})();
