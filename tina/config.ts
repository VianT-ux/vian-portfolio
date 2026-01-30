import { defineConfig } from "tinacms";

// Reusable SEO field group
const seoFields = [
  {
    name: "metaTitle",
    label: "Meta Title",
    type: "string" as const,
  },
  {
    name: "metaDescription",
    label: "Meta Description",
    type: "string" as const,
    ui: {
      component: "textarea",
    },
  },
  {
    name: "ogImage",
    label: "OG Image",
    type: "image" as const,
  },
];

// Rich-text custom component templates
const richTextTemplates = [
  {
    name: "Callout",
    label: "Callout Box",
    fields: [
      {
        name: "type",
        label: "Type",
        type: "string" as const,
        options: ["info", "warning", "tip"],
      },
      {
        name: "heading",
        label: "Heading",
        type: "string" as const,
      },
      {
        name: "text",
        label: "Text",
        type: "string" as const,
        ui: {
          component: "textarea",
        },
      },
    ],
  },
  {
    name: "CTABanner",
    label: "CTA Banner",
    fields: [
      {
        name: "heading",
        label: "Heading",
        type: "string" as const,
      },
      {
        name: "buttonText",
        label: "Button Text",
        type: "string" as const,
      },
      {
        name: "buttonUrl",
        label: "Button URL",
        type: "string" as const,
      },
    ],
  },
  {
    name: "CaptionedImage",
    label: "Image with Caption",
    fields: [
      {
        name: "image",
        label: "Image",
        type: "image" as const,
      },
      {
        name: "caption",
        label: "Caption",
        type: "string" as const,
      },
      {
        name: "attribution",
        label: "Attribution",
        type: "string" as const,
      },
    ],
  },
];

export default defineConfig({
  branch:
    process.env.TINA_BRANCH ||
    process.env.VERCEL_GIT_COMMIT_REF ||
    process.env.HEAD ||
    "main",

  // Tina Cloud credentials (set in .env)
  clientId: process.env.TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  media: {
    tina: {
      publicFolder: "public",
      mediaRoot: "uploads",
    },
  },

  schema: {
    collections: [
      // ── Collection 1: Homepage (Singleton) ──────────────────────
      {
        name: "homepage",
        label: "Homepage",
        path: "content/homepage",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            name: "headline",
            label: "Headline",
            type: "string",
            required: true,
          },
          {
            name: "subtitle",
            label: "Subtitle",
            type: "string",
            required: true,
          },
          {
            name: "photo",
            label: "Profile Photo",
            type: "image",
          },
          {
            name: "shippedResultsLabel",
            label: "Shipped Results Label",
            type: "string",
            description: 'Text above company names, e.g. "Shipped results for"',
          },
          {
            name: "companies",
            label: "Companies",
            type: "object",
            list: true,
            ui: {
              itemProps: (item: { name?: string }) => ({
                label: item?.name || "Company",
              }),
            },
            fields: [
              {
                name: "name",
                label: "Company Name",
                type: "string",
                required: true,
              },
            ],
          },
          {
            name: "aboutHeading",
            label: "About Section Heading",
            type: "string",
          },
          {
            name: "aboutText",
            label: "About Text",
            type: "string",
            ui: {
              component: "textarea",
            },
          },
          {
            name: "seo",
            label: "SEO",
            type: "object",
            fields: seoFields,
          },
        ],
      },

      // ── Collection 2: Capabilities (Singleton) ─────────────────
      {
        name: "capabilities",
        label: "Capabilities",
        path: "content/capabilities",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            name: "tabs",
            label: "Capability Tabs",
            type: "object",
            list: true,
            ui: {
              itemProps: (item: { label?: string }) => ({
                label: item?.label || "Tab",
              }),
            },
            fields: [
              {
                name: "id",
                label: "Tab ID",
                type: "string",
                required: true,
                description:
                  "Internal identifier (e.g. pmm, growth, commercial). Used in code, do not change without updating JS.",
              },
              {
                name: "label",
                label: "Tab Label",
                type: "string",
                required: true,
              },
              {
                name: "accent",
                label: "Accent Color",
                type: "string",
                required: true,
                ui: {
                  component: "color",
                },
              },
              {
                name: "ctaText",
                label: "CTA Button Text",
                type: "string",
              },
              {
                name: "metrics",
                label: "Metrics",
                type: "object",
                list: true,
                ui: {
                  itemProps: (item: { highlight?: string }) => ({
                    label: item?.highlight || "Metric",
                  }),
                },
                fields: [
                  {
                    name: "highlight",
                    label: "Highlight Number",
                    type: "string",
                    required: true,
                    description: 'The big number, e.g. "164%", "2x", "6 Months"',
                  },
                  {
                    name: "description",
                    label: "Description",
                    type: "string",
                    required: true,
                    description: "One-line summary of the metric",
                  },
                  {
                    name: "detail",
                    label: "Detail",
                    type: "string",
                    ui: {
                      component: "textarea",
                    },
                    description:
                      "Full narrative explanation (shown in the detail panel on desktop)",
                  },
                ],
              },
            ],
          },
        ],
      },

      // ── Collection 3: Case Studies ─────────────────────────────
      {
        name: "caseStudy",
        label: "Case Studies",
        path: "content/case-studies",
        format: "mdx",
        fields: [
          {
            name: "title",
            label: "Title",
            type: "string",
            required: true,
            isTitle: true,
          },
          {
            name: "company",
            label: "Company",
            type: "string",
          },
          {
            name: "coverImage",
            label: "Cover Image",
            type: "image",
          },
          {
            name: "tags",
            label: "Tags",
            type: "string",
            list: true,
          },
          {
            name: "publishedDate",
            label: "Published Date",
            type: "datetime",
          },
          {
            name: "seo",
            label: "SEO",
            type: "object",
            fields: seoFields,
          },
          {
            name: "body",
            label: "Body",
            type: "rich-text",
            isBody: true,
            templates: richTextTemplates,
          },
        ],
      },

      // ── Collection 4: Blog Posts ───────────────────────────────
      {
        name: "blogPost",
        label: "Blog Posts",
        path: "content/blog",
        format: "mdx",
        fields: [
          {
            name: "title",
            label: "Title",
            type: "string",
            required: true,
            isTitle: true,
          },
          {
            name: "excerpt",
            label: "Excerpt",
            type: "string",
            ui: {
              component: "textarea",
            },
          },
          {
            name: "coverImage",
            label: "Cover Image",
            type: "image",
          },
          {
            name: "tags",
            label: "Tags",
            type: "string",
            list: true,
          },
          {
            name: "publishedDate",
            label: "Published Date",
            type: "datetime",
          },
          {
            name: "seo",
            label: "SEO",
            type: "object",
            fields: seoFields,
          },
          {
            name: "body",
            label: "Body",
            type: "rich-text",
            isBody: true,
            templates: richTextTemplates,
          },
        ],
      },

      // ── Collection 5: Testimonials (Singleton) ─────────────────
      {
        name: "testimonials",
        label: "Testimonials",
        path: "content/testimonials",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            name: "items",
            label: "Testimonials",
            type: "object",
            list: true,
            ui: {
              itemProps: (item: { authorName?: string }) => ({
                label: item?.authorName || "Testimonial",
              }),
            },
            fields: [
              {
                name: "quote",
                label: "Quote",
                type: "string",
                required: true,
                ui: {
                  component: "textarea",
                },
              },
              {
                name: "authorName",
                label: "Author Name",
                type: "string",
                required: true,
              },
              {
                name: "authorRole",
                label: "Author Role & Company",
                type: "string",
              },
              {
                name: "authorAvatar",
                label: "Author Avatar",
                type: "image",
              },
            ],
          },
        ],
      },

      // ── Collection 6: Site Settings (Singleton / Global) ──────
      {
        name: "siteSettings",
        label: "Site Settings",
        path: "content/settings",
        format: "json",
        ui: {
          global: true,
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            name: "logoText",
            label: "Logo Text",
            type: "string",
            description: 'The text displayed as the logo, e.g. "VIAN"',
          },
          {
            name: "resumeFile",
            label: "Resume File",
            type: "image",
            description: "Upload your resume PDF",
          },
          {
            name: "footerCopyright",
            label: "Footer Copyright",
            type: "string",
            description: 'e.g. "2026 Vian. Growth Marketer."',
          },
          {
            name: "footerLocation",
            label: "Footer Location",
            type: "string",
          },
          {
            name: "contactEmail",
            label: "Contact Email",
            type: "string",
          },
          {
            name: "socialLinks",
            label: "Social Links",
            type: "object",
            list: true,
            ui: {
              itemProps: (item: { platform?: string }) => ({
                label: item?.platform || "Link",
              }),
            },
            fields: [
              {
                name: "platform",
                label: "Platform",
                type: "string",
                options: ["LinkedIn", "Twitter", "Email", "GitHub"],
              },
              {
                name: "url",
                label: "URL",
                type: "string",
              },
            ],
          },
        ],
      },
    ],
  },
});
