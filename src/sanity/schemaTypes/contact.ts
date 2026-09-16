import { defineField, defineType } from "sanity";

export const contactType = defineType({
  name: "contact",
  title: "Contact Section",
  type: "document",

  fields: [
    // ------------------------------------------------
    // Section Content
    // ------------------------------------------------

    defineField({
      name: "sectionLabel",
      title: "Section Label",
      type: "string",
      initialValue: "Contact",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),

    // ------------------------------------------------
    // Availability
    // ------------------------------------------------

    defineField({
      name: "availabilityText",
      title: "Availability Text",
      type: "string",
      description: "Example: Open to backend opportunities",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "showAvailability",
      title: "Show Availability",
      type: "boolean",
      initialValue: true,
    }),

    // ------------------------------------------------
    // Contact Methods
    // ------------------------------------------------

    defineField({
      name: "contactMethods",
      title: "Contact Methods",
      type: "array",
      validation: (Rule) => Rule.required().min(1),

      of: [
        {
          type: "object",
          name: "contactMethod",
          title: "Contact Method",

          fields: [
            defineField({
              name: "methodId",
              title: "Method ID",
              type: "string",
              description:
                "Internal identifier used by the frontend.",

              options: {
                list: [
                  {
                    title: "Email",
                    value: "email",
                  },
                  {
                    title: "LinkedIn",
                    value: "linkedin",
                  },
                  {
                    title: "WhatsApp",
                    value: "whatsapp",
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
              name: "label",
              title: "Label",
              type: "string",
              description: "Example: Email, LinkedIn, WhatsApp",
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "title",
              title: "Title",
              type: "string",
              description:
                "Main card title. Example: Send an email",
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "value",
              title: "Display Value",
              type: "string",
              description:
                "Text displayed below the card title.",
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "href",
              title: "Link",
              type: "string",
              description:
                "Can be a mailto: link or an external URL.",
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              description:
                "Icon key mapped to a frontend icon component.",

              options: {
                list: [
                  {
                    title: "Email",
                    value: "email",
                  },
                  {
                    title: "LinkedIn",
                    value: "linkedin",
                  },
                  {
                    title: "WhatsApp",
                    value: "whatsapp",
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
              name: "actionLabel",
              title: "Action Label",
              type: "string",
              description:
                "Bottom action text. Example: Write to me",
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
              subtitle: "title",
            },
          },
        },
      ],
    }),

    // ------------------------------------------------
    // Bottom Information
    // ------------------------------------------------

    defineField({
      name: "replyText",
      title: "Reply Information",
      type: "string",
      description:
        "Example: Usually replies within 24–48 hours",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "footerText",
      title: "Footer Text",
      type: "string",
      description:
        "Small text displayed on the bottom-right of the section.",
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
      title: "heading",
    },

    prepare({ title }) {
      return {
        title: "Contact Section",
        subtitle: title,
      };
    },
  },
});