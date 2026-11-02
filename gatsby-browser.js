import '@fontsource-variable/inter';
import '@fontsource-variable/jetbrains-mono';
import '@fortawesome/fontawesome-svg-core/styles.css';
import './src/styles/global.css';

import { config } from '@fortawesome/fontawesome-svg-core';

// the CSS is imported above, so stop Font Awesome injecting it at runtime (avoids icon flash)
config.autoAddCss = false;
