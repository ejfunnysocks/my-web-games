# Arcade Games File Guide

Each game folder can be opened directly through the local Arcade Hub.

| Game | Main page | Balance and content | Shared interface |
| --- | --- | --- | --- |
| Ninja Dash | `gravity-flip/index.html` | `gravity-flip/content.js` | `shared/arcade-common.js` and `shared/arcade-common.css` |
| Vortex Voyager | `vortex-voyager/index.html` | `vortex-voyager/content.js` | `shared/arcade-common.js` and `shared/arcade-common.css` |
| Star Catcher | `star-catcher/index.html` | `star-catcher/content.js` | `shared/arcade-common.js` and `shared/arcade-common.css` |
| Cannon Crush | `cannon-crush/index.html` | `cannon-crush/content.js` | `shared/arcade-common.js` and `shared/arcade-common.css` |

`content.js` contains values intended for balancing. `index.html` still contains each existing game engine and its unique look. The shared files own the first-play guide, visibility pausing, and pause-menu restart/return actions.
