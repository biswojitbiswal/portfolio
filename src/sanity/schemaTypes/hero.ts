import { defineField, defineType } from "sanity";

export const heroType = defineType({
  name: "hero",
  title: "Hero Section",
  type: "document",

  fields: [
    defineField({
      name: "developerTag",
      title: "Developer Tag",
      type: "string",
      description: "Example: Backend Developer",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "heading",
      title: "Main Heading",
      type: "string",
      description:
        "Example: I build dependable backend systems for real products.",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "subtitle",
      title: "Subtitle / Tech Stack",
      type: "text",
      rows: 2,
      description:
        "Example: Node.js, NestJS, TypeScript, PostgreSQL, MongoDB and Redis.",
      validation: (Rule) => Rule.required(),
    }),

    // Primary CTA
    defineField({
      name: "primaryCta",
      title: "Primary CTA",
      type: "object",

      fields: [
        defineField({
          name: "label",
          title: "Button Label",
          type: "string",
          initialValue: "View Projects",
          validation: (Rule) => Rule.required(),
        }),

        defineField({
          name: "href",
          title: "Button Link",
          type: "string",
          initialValue: "/projects",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    // Resume CTA
    defineField({
      name: "resumeCta",
      title: "Resume CTA",
      type: "object",

      fields: [
        defineField({
          name: "label",
          title: "Button Label",
          type: "string",
          initialValue: "Download Resume",
          validation: (Rule) => Rule.required(),
        }),

        defineField({
          name: "resumeFile",
          title: "Resume PDF",
          type: "file",
          options: {
            accept: ".pdf",
          },
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    // Socials
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",

      of: [
        {
          type: "object",
          name: "socialLink",
          title: "Social Link",

          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",

              options: {
                list: [
                  { title: "GitHub", value: "github" },
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "Twitter / X", value: "twitter" },
                  { title: "Website", value: "website" },
                ],
              },

              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "url",
              title: "Profile URL",
              type: "url",
              validation: (Rule) =>
                Rule.required().uri({
                  scheme: ["http", "https"],
                }),
            }),
          ],

          preview: {
            select: {
              title: "label",
              subtitle: "url",
            },
          },
        },
      ],
    }),

    // Hero Image
    defineField({
      name: "profileImage",
      title: "Profile Image",
      type: "image",

      options: {
        hotspot: true,
      },

      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
          description:
            "Example: Biswojit Biswal, Backend Developer",
          validation: (Rule) => Rule.required(),
        }),
      ],

      validation: (Rule) => Rule.required(),
    }),

    // Left floating code card
    defineField({
      name: "codeCard",
      title: "Code Card",
      type: "object",

      fields: [
        defineField({
          name: "code",
          title: "Code",
          type: "text",
          rows: 4,
          initialValue: "const\nideas =\nrealProducts();",
        }),
      ],
    }),

    // Bottom quote card
    defineField({
      name: "quoteCard",
      title: "Quote Card",
      type: "object",

      fields: [
        defineField({
          name: "firstLine",
          title: "First Line",
          type: "string",
          initialValue: "// Keep Building",
        }),

        defineField({
          name: "secondLine",
          title: "Second Line",
          type: "string",
          initialValue: "Better Solutions",
        }),
      ],
    }),

    defineField({
      name: "isActive",
      title: "Active",
      type: "boolean",
      initialValue: true,
    }),
  ],

  preview: {
    select: {
      title: "heading",
      media: "profileImage",
    },

    prepare({ title, media }) {
      return {
        title: "Hero Section",
        subtitle: title,
        media,
      };
    },
  },
});