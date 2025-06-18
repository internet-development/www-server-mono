# SERVER MONO

This repository contains the [source files](https://github.com/internet-development/www-server-mono/tree/main/fonts) for Server Mono and the source code for our website, which is built using our [next-sass-starter](https://github.com/internet-development/nextjs-sass-starter) template system used across all our websites.

Server Mono is a typeface inspired by typewriters, Apple's San Francisco Mono, ASCII art, command-line interfaces, and programming tools.

Server Mono continues the long tradition of monospace fonts, renowned for their versatility in command-line interfaces due to their clear readability and uniform character width. You'll notice our own preferences reflected in the design, as we value how it performs across various viewing contexts. Server Mono offers excellent readability and pairs well with its uniform, predictable, and orderly appearance.

This single-weight font was released in 2024 by the Internet Development Studio Company of Seattle, Washington. Created by designers Tim Vanhille and Matthieu Salvaggio, with supplemental direction from Jimmy Lee and the Internet Development Studio Company community.

## Download

You can download the latest version from our [GitHub Releases](https://github.com/internet-development/www-server-mono/releases) page.

Alternatively, you can install it locally using [Homebrew `font-server-mono`](https://formulae.brew.sh/cask/font-server-mono)

```bash
brew install --cask font-server-mono
```

## Usage

Add the downloaded font files to your website's public/static directory. The examples below use a `/fonts/` prefix, but you can adjust this path to match your project structure.

Copy the below snippet into your CSS file:

```css
/* Regular weight - used for normal text */
@font-face {
  font-family: 'ServerMono';
  src: url('/fonts/ServerMono-Regular.woff2') format('woff2'),    /* Best compression, modern browsers */
       url('/fonts/ServerMono-Regular.woff') format('woff'),      /* Good compression, wider support */
       url('/fonts/ServerMono-Regular.otf') format('opentype');   /* Largest files, universal support */
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

/* Slanted variant - used for italic/oblique text */
@font-face {
  font-family: 'ServerMono';
  src: url('/fonts/ServerMono-RegularSlanted.woff2') format('woff2'),
       url('/fonts/ServerMono-RegularSlanted.woff') format('woff'),
       url('/fonts/ServerMono-RegularSlanted.otf') format('opentype');
  font-weight: normal;
  font-style: oblique;
  font-display: swap;
}

```

Then you can use it across your entire site like so:

```css
:root {
   font-family: 'ServerMono', monospace;
}
```

## Setup Website (MacOS)

Start by cloning the repository

Then run the server

```bash
npm install
npm run dev
```

Go to `http://localhost:10000` in your browser of choice.

---

### Contact

- [Internet Development Studio Company](https://internet.dev)
- [X for BlazeType](https://x.com/BlazeFoundry)
- [X for INTDEV](https://x.com/internetxstudio)

### Thanks

- Tim Vanhille
- Matthieu Salvaggio
- Andrew Alimbuyuguen
- Jimmy Lee
- Whyrusleeping
- Philip Bedford
- Caidan Williams
