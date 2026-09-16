import { defineField, defineType } from "sanity";

export const headerType = defineType({
  name: "header",
  title: "Header",
  type: "document",

  fields: [
    // ------------------------------------------------
    // Brand
    // ------------------------------------------------

    defineField({
      name: "brandName",
      title: "Brand Name",
      type: "string",
      initialValue: "BISWOJIT",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "specialization",
      title: "Specialization",
      type: "string",
      initialValue: "Backend Developer",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "showSpecialization",
      title: "Show Specialization",
      type: "boolean",
      initialValue: true,
    }),

    // ------------------------------------------------
    // Navigation
    // ------------------------------------------------

    defineField({
      name: "navigation",
      title: "Navigation",
      type: "array",
      validation: (Rule) => Rule.required().min(1),

      of: [
        {
          type: "object",
          name: "headerNavigationItem",
          title: "Navigation Item",

          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "href",
              title: "Link",
              type: "string",
              description:
                "Example: /projects, /#experience, /#contact",
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "order",
              title: "Order",
              type: "number",
              validation: (Rule) =>
                Rule.required().integer().min(1),
            }),
          ],

          preview: {
            select: {
              title: "label",
              subtitle: "href",
            },
          },
        },
      ],
    }),

    // ------------------------------------------------
    // Resume
    // ------------------------------------------------

    defineField({
      name: "resume",
      title: "Resume",
      type: "object",

      fields: [
        defineField({
          name: "label",
          title: "Desktop Label",
          type: "string",
          initialValue: "Resume",
          validation: (Rule) => Rule.required(),
        }),

        defineField({
          name: "mobileLabel",
          title: "Mobile Label",
          type: "string",
          initialValue: "Download Resume",
          validation: (Rule) => Rule.required(),
        }),

        defineField({
          name: "file",
          title: "Resume File",
          type: "file",
          options: {
            accept: ".pdf",
          },
          validation: (Rule) => Rule.required(),
        }),

        defineField({
          name: "downloadFileName",
          title: "Download File Name",
          type: "string",
          description:
            "Example: Biswojit_Backend_Developer.pdf",
        }),
      ],
    }),

    // ------------------------------------------------
    // CTA
    // ------------------------------------------------

    defineField({
      name: "cta",
      title: "Primary CTA",
      type: "object",

      fields: [
        defineField({
          name: "label",
          title: "Label",
          type: "string",
          initialValue: "Let's Talk",
          validation: (Rule) => Rule.required(),
        }),

        defineField({
          name: "href",
          title: "Link",
          type: "string",
          initialValue: "/#contact",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    // ------------------------------------------------
    // Mobile Menu
    // ------------------------------------------------

    defineField({
      name: "mobileMenu",
      title: "Mobile Menu",
      type: "object",

      fields: [
        defineField({
          name: "title",
          title: "Menu Title",
          type: "string",
          initialValue: "Biswojit Biswal",
          validation: (Rule) => Rule.required(),
        }),

        defineField({
          name: "description",
          title: "Menu Description",
          type: "string",
          initialValue: "Backend Developer",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    // ------------------------------------------------
    // Status
    // ------------------------------------------------

    defineField({
      name: "isActive",
      title: "Active",
      type: "boolean",
      initialValue: true,
    }),
  ],

  preview: {
    select: {
      title: "brandName",
      subtitle: "specialization",
    },

    prepare({ title, subtitle }) {
      return {
        title: title || "Header",
        subtitle,
      };
    },
  },
});