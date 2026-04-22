![presentation](/img/doqmen-presentation.png)

# DOQMEN User Guide

DOQMEN is an open-source documentation template built with Next.js, Tailwind CSS, and MDX. It's designed to be fast, accessible, and very easy to customize.

In this guide, you'll learn how to download the repository, install dependencies, modify your site's information, and create your own documents.

---

## 1. Local Installation and Execution

If you have downloaded or cloned the DOQMEN repository, follow these steps to run the development server on your computer:

1.  **Install dependencies:** Open your terminal in the project folder and run:
    ```bash
    npm install
    ```

2.  **Start the development server:**
    ```bash
    npm run dev
    ```

3.  **Open your browser:** Go to `http://localhost:3000` to see your live site.

---

## 2. Customize the Site Name

To change the name "DOQMEN" to your project or brand name, you need to edit the main configuration file.

1.  Open the `config/site.ts` file.
2.  Modify the `name` and `description` properties:

```typescript
export const siteConfig = {
  name: "My New Documentation",
  description: "Description of my amazing project.",
  links: {
    github: "https://github.com/your-username/your-repo",
  },
};
```

This change will be automatically reflected in the header, footer, and metadata (SEO) across the entire site.

---

## 3. Change the Logo / Icon

The icon next to the site name in the navigation bar is a React component that renders an SVG.

1.  Open the `components/Logo.tsx` file.
2.  Replace the `<svg>...</svg>` code with your own logo's SVG.
3.  Make sure to keep the `className={className}` property on your `<svg>` tag so that the size and color styles are applied correctly.

Example:
```tsx
export function Logo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      {/* Your logo's path here */}
    </svg>
  );
}
```

---

## 4. Modify Features

On the main page (`/`), there's a "Features" section. To modify the text or icons of these cards:

1.  Open the `app/page.tsx` file.
2.  Find the `<section>` element containing the "Features" title.
3.  Inside, you'll see several `<div>` blocks representing each card. You can change the `<h3>` title, the `<p>` paragraph, and the `<svg>` code representing each icon.

---

## 5. Create and Upload MDX Files

DOQMEN uses **MDX**, which means you can write in standard Markdown and simultaneously use React components (like alerts or buttons) within your documents.

All documentation files reside in the `docs/` folder.

### Create a New Page

1.  Create a new file in the `docs/` folder, for example, `docs/my-page.mdx`.
2.  Add **Frontmatter** at the beginning of the file. This defines the page's title and description:

```mdx
---
title: "My First Page"
description: "This is a test page."
---

# Hello World

This is where the content of your documentation goes.
```

### Organize Navigation

To make your new page appear in the sidebar with the correct name and order, you need to edit the `docs/_meta.json` file.

```json
{
  "index": {
    "title": "Home",
    "icon": "Home"
  },
  "my-page": {
    "title": "My First Page",
    "icon": "FileText"
  }
}
```
*Note: The key in the JSON (`my-page`) must exactly match your filename without the `.mdx` extension.*

And that's it! With these steps, you can adapt DOQMEN to your needs and create amazing documentation.
