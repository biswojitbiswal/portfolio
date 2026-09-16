import { defineField, defineType } from "sanity";

export const footerType = defineType({
  name: "footer",
  title: "Footer",
  type: "document",

  fields: [
    // ------------------------------------------------
    // Brand
    // ------------------------------------------------

    defineField({
      name: "brandName",
      title: "Brand Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "role",
      title: "Role",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),

    // ------------------------------------------------
    // Navigation
    // ------------------------------------------------

    defineField({
      name: "navigationTitle",
      title: "Navigation Title",
      type: "string",
      initialValue: "Navigation",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "navigationLinks",
      title: "Navigation Links",
      type: "array",
      validation: (Rule) => Rule.required().min(1),

      of: [
        {
          type: "object",
          name: "footerNavigationLink",
          title: "Navigation Link",

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
                "Example: #home, #projects, #experience, #contact",
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "highlighted",
              title: "Highlighted",
              type: "boolean",
              initialValue: false,
              description:
                "Highlights the link using the technical accent style.",
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
    // Connect
    // ------------------------------------------------

    defineField({
      name: "connectTitle",
      title: "Connect Title",
      type: "string",
      initialValue: "Connect",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "connectLinks",
      title: "Connect Links",
      type: "array",
      validation: (Rule) => Rule.required().min(1),

      of: [
        {
          type: "object",
          name: "footerConnectLink",
          title: "Connect Link",

          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "linkType",
              title: "Link Type",
              type: "string",
              options: {
                list: [
                  {
                    title: "URL",
                    value: "url",
                  },
                  {
                    title: "Resume File",
                    value: "resume",
                  },
                ],
                layout: "radio",
              },
              initialValue: "url",
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "url",
              title: "URL",
              type: "string",
              description:
                "Used for LinkedIn, GitHub and other external links.",
              hidden: ({ parent }) => parent?.linkType !== "url",
            }),

            defineField({
              name: "file",
              title: "File",
              type: "file",
              description:
                "Upload the resume or another downloadable document.",
              options: {
                accept: ".pdf",
              },
              hidden: ({ parent }) => parent?.linkType !== "resume",
            }),

            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              options: {
                list: [
                  {
                    title: "File / Resume",
                    value: "file",
                  },
                  {
                    title: "LinkedIn",
                    value: "linkedin",
                  },
                  {
                    title: "GitHub",
                    value: "github",
                  },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "external",
              title: "Open In New Tab",
              type: "boolean",
              initialValue: true,
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
              subtitle: "linkType",
            },
          },
        },
      ],
    }),

    // ------------------------------------------------
    // Footer Bottom
    // ------------------------------------------------

    defineField({
      name: "copyrightName",
      title: "Copyright Name",
      type: "string",
      description:
        "The current year will be generated automatically.",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "builtWithText",
      title: "Built With Text",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "backToTopLabel",
      title: "Back To Top Label",
      type: "string",
      initialValue: "Back to top",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "backToTopHref",
      title: "Back To Top Link",
      type: "string",
      initialValue: "#home",
      validation: (Rule) => Rule.required(),
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
      subtitle: "role",
    },

    prepare({ subtitle }) {
      return {
        title: "Portfolio Footer",
        subtitle,
      };
    },
  },
});