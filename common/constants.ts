export const MAX_SIZE_BYTES = 15728640;

export const API = `https://api.internet.dev/api`;
// NOTE(jimmylee):
// https://github.com/internet-development/apis
// export const API = `http://localhost:10001`;

export const TEMPLATE_EXAMPLES_ANIMATIONS = [
  {
    name: 'Animations ➝ CSS scroll carousel horizontal',
    href: '/examples/animations/scroll-carousel-horizontal',
    label: 'CSS scroll carousel horizontal',
  },
  {
    name: 'Animations ➝ CSS scroll vertical',
    href: '/examples/animations/scroll-vertical',
    isWIP: true,
    label: 'CSS scroll vertical',
  },
  {
    name: 'Animations ➝ CSS deck spread and flip',
    href: '/examples/animations/card-hand',
    isWIP: true,
    label: 'CSS card hand',
  },
  {
    name: 'Animations ➝ CSS flippable card with tilt',
    href: '/examples/animations/card',
    isWIP: true,
    label: 'CSS card',
  },
  {
    name: 'Animations ➝ text swapping',
    href: '/examples/animations/text-swapping',
    label: 'CSS text swapping',
  },
];

export const TEMPLATE_EXAMPLES_COMPONENTS = [
  {
    name: 'Fonts ➝ Server Mono',
    href: '/examples/fonts/server-mono',
    label: 'Server Mono preview',
  },
  {
    name: 'Components ➝ navigation, hero section',
    href: '/examples',
    label: 'Simple hero marketing',
  },
  {
    name: 'Components ➝ application overview, footer',
    href: '/examples/components/application-site',
    label: 'Application marketing',
  },
  {
    name: 'Components ➝ navigation, application toolbar',
    href: '/examples/components/application-toolbar',
    label: 'Application toolbar',
  },
  {
    name: 'Components ➝ navigation, dashboard',
    href: '/examples/components/dashboard',
    label: 'Dashboard skeleton',
  },
  {
    name: 'Components ➝ navigation, dashboard for privacy settings',
    href: '/examples/components/dashboard-settings-privacy',
    label: 'Dashboard skeleton',
  },
  {
    name: 'Components ➝ navigation, blog post, footer',
    href: '/examples/components/post',
    label: 'Post',
  },
  {
    name: 'Components ➝ navigation, form elements',
    href: '/examples/components/forms',
    label: 'Form',
  },
  {
    name: 'Components ➝ navigation, full dvh sections',
    href: '/examples/components/full-section',
    label: 'Landing with large spacing',
  },
  {
    name: 'Components ➝ navigation, naked components',
    href: '/examples/components/no-sections',
    label: 'Landing with no spacing',
  },
  {
    name: 'Components ➝ navigation, ½ dvh sections',
    href: '/examples/components/half-section',
    label: 'Landing with moderate spacing',
  },
  {
    name: 'Components ➝ navigation, horizontal marketing',
    href: '/examples/components/horizontal-stack-marketing',
    label: 'Landing with horizontal stack',
  },
  {
    name: 'Components ➝ navigation, modal book index trigger',
    href: '/examples/components/modals',
    label: 'Book modal',
  },
  {
    name: 'Components ➝ navigation, modal color picker for themes',
    href: '/examples/components/modals-color-picker',
    label: 'Color picker modal',
    isWIP: true,
  },
  {
    name: 'Components ➝ navigation, modal website prompt trigger',
    href: '/examples/components/modals-website-prompt',
    label: 'Website prompt modal',
  },
  {
    name: 'Components ➝ navigation, product marketing',
    href: '/examples/components/product-marketing',
    label: 'Website prompt product box',
  },
  {
    name: 'Components ➝ navigation, table',
    href: '/examples/components/table',
    label: 'Tables',
  },
  {
    name: 'Components ➝ windows',
    href: '/examples/components/windows',
    label: 'Windows',
  },
  {
    name: 'Components ➝ windows connected, diagram',
    href: '/examples/components/windows-connected',
    isWIP: true,
    label: 'Windows connected',
  },
  {
    name: 'Components ➝ windows arrow connected, diagram',
    href: '/examples/components/windows-arrow-connected',
    isWIP: true,
    label: 'Windows with arrows connected',
  },
  {
    name: 'Components ➝ windows level selector',
    href: '/examples/components/windows-level-selector',
    isWIP: true,
    label: 'Windows for game levels',
  },
];

export const TEMPLATE_EXAMPLES_EMPTY = [
  {
    name: 'Empty ➝ application template page',
    href: '/examples/empty/application-template-page',
    label: 'Application template',
  },
  {
    name: 'Empty ➝ grid template page',
    href: '/examples/empty/grid-template-page',
    label: 'Grid application template',
  },
  {
    name: 'Empty ➝ isometric grid template page',
    href: '/examples/empty/isometric-grid-template-page',
    label: 'Isometric application template',
  },
];

export const TEMPLATE_EXAMPLES_FEATURES = [
  {
    name: 'Features ➝ authentication ➝ to API key and optional session',
    href: '/examples/features/authentication',
    label: 'Authentication',
  },
  {
    name: 'Features ➝ authentication ➝ Bluesky to API key and optional session',
    href: '/examples/features/authentication/bluesky',
    isWIP: true,
    isBluesky: true,
    label: 'Bluesky authentication',
  },
  {
    name: 'Features ➝ authentication ➝ modal to session',
    href: '/examples/features/authentication/modal',
    label: 'Global modal authentication',
  },
  {
    name: 'Features ➝ authentication ➝ Google to API key and optional session',
    href: '/examples/features/authentication/google',
    label: 'Google authentication',
  },
  {
    name: 'Features ➝ authentication ➝ forgot password',
    href: '/examples/features/authentication/forgot-password',
    label: 'Forgot password',
  },
  {
    name: 'Features ➝ earnings requirement calculator',
    href: '/examples/features/earnings-requirement-calculator',
    label: 'Earnings requirement calculator',
  },
  {
    name: 'Features ➝ documents ➝ employment',
    href: '/examples/features/employment',
    label: 'Employment agreements',
  },
  {
    name: 'Features ➝ documents ➝ invoices',
    href: '/examples/features/invoices',
    label: 'Invoices',
  },
  {
    name: 'Features ➝ documents ➝ statement of work',
    href: '/examples/features/statement-of-work',
    label: 'Statement of Work',
  },
  {
    name: 'Features ➝ file management (with AWS S3 presigned URL)',
    href: '/examples/features/files-s3',
    label: 'Upload using Amazon S3',
  },
  {
    name: 'Features ➝ file management (with GCS presigned URL)',
    href: '/examples/features/files-gcs',
    label: 'Upload using Google Storage',
  },
  {
    name: 'Features ➝ fixed stock watchlist',
    href: '/examples/features/stocks/fixed-watchlist',
    label: 'Fixed stock watchlist',
  },
  {
    name: 'Features ➝ job posting',
    href: '/examples/features/job-posting',
    label: 'Job posting',
  },
  {
    name: 'Features ➝ purchase services',
    href: '/examples/features/services',
    label: 'API service subscribe',
  },
  {
    name: 'Features ➝ settings',
    href: '/examples/features/settings',
    isWIP: true,
    label: 'Settings',
  },
  {
    name: 'Features ➝ threads',
    href: '/examples/features/threads',
    label: 'Threads',
  },
];

export const TEMPLATE_EXAMPLES_SYSTEM = [
  {
    name: 'System ➝ colors',
    href: '/examples/system/colors',
    label: 'Colors',
  },
  {
    name: 'System ➝ typography',
    href: '/examples/system/typography',
    label: 'Typography',
  },
  {
    name: 'System ➝ data visualization (12/14 complete)',
    href: '/examples/system/data-visualization',
    isWIP: true,
    label: 'Data visualization',
  },
];

export const TEMPLATE_POSTS = [
  { href: 'https://txt.dev/wwwjim/intdev-acceptable-use', label: 'Acceptable Use' },
  { href: 'https://txt.dev/wwwjim/intdev-privacy-policy', label: 'Privacy Policy' },
  { href: 'https://txt.dev/wwwjim/intdev-terms-of-service', label: 'Terms of Service' },
];

export const TEMPLATE_LINKS = [
  { href: 'https://bsky.app/profile/internetstudio.bsky.social', label: 'Bluesky' },
  { href: 'https://github.com/internet-development/nextjs-sass-starter', label: 'Github' },
  { href: 'https://internet.dev', label: 'internet.dev' },
  { href: 'https://read.cv/teams/intdev', label: 'ReadCV' },
  { href: 'https://x.com/internetxstudio', label: 'X (formerly Twitter)' },
];

export const TEMPLATE_EXAMPLES = [
  ...TEMPLATE_EXAMPLES_ANIMATIONS,
  ...TEMPLATE_EXAMPLES_COMPONENTS,
  ...TEMPLATE_EXAMPLES_EMPTY,
  ...TEMPLATE_EXAMPLES_FEATURES,
  ...TEMPLATE_EXAMPLES_SYSTEM,
];
