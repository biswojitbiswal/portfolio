import { defineField, defineType } from "sanity";

export const educationType = defineType({
  name: "education",
  title: "Education Section",
  type: "document",

  fields: [
    // ------------------------------------------------
    // Section Content
    // ------------------------------------------------

    defineField({
      name: "sectionLabel",
      title: "Section Label",
      type: "string",
      initialValue: "Education",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "desktopDescription",
      title: "Desktop Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "mobileDescription",
      title: "Mobile Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),

    // ------------------------------------------------
    // Learn → Build → Improve
    // ------------------------------------------------

    defineField({
      name: "learningSteps",
      title: "Learning Steps",
      type: "array",
      description:
        "Small labels displayed below the desktop introduction.",
      of: [
        {
          type: "object",
          name: "learningStep",
          title: "Learning Step",

          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
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
            },
          },
        },
      ],
    }),

    // ------------------------------------------------
    // Education Records
    // ------------------------------------------------

    defineField({
      name: "educationItems",
      title: "Education Items",
      type: "array",
      validation: (Rule) => Rule.required().min(1),

      of: [
        {
          type: "object",
          name: "educationItem",
          title: "Education Item",

          fields: [
            defineField({
              name: "educationId",
              title: "Education ID",
              type: "slug",
              description:
                "Internal identifier. Example: masters, bachelors, higher-secondary",
              options: {
                source: "qualification",
                maxLength: 100,
              },
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "qualification",
              title: "Qualification",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "institution",
              title: "Institution",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "period",
              title: "Period",
              type: "string",
              description: "Example: 2022 — 2024",
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "location",
              title: "Location",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "category",
              title: "Category",
              type: "string",
              options: {
                list: [
                  {
                    title: "Postgraduate",
                    value: "Postgraduate",
                  },
                  {
                    title: "Undergraduate",
                    value: "Undergraduate",
                  },
                  {
                    title: "Higher Secondary",
                    value: "Higher Secondary",
                  },
                  {
                    title: "Secondary",
                    value: "Secondary",
                  },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "focus",
              title: "Focus",
              type: "text",
              rows: 2,
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              description:
                "Icon key mapped to a Lucide icon on the frontend.",

              options: {
                list: [
                  {
                    title: "Graduation Cap",
                    value: "graduationCap",
                  },
                  {
                    title: "Book Open",
                    value: "bookOpen",
                  },
                  {
                    title: "School",
                    value: "school",
                  },
                ],
              },

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
              title: "qualification",
              subtitle: "institution",
            },
          },
        },
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
      title: "heading",
    },

    prepare({ title }) {
      return {
        title: "Education Section",
        subtitle: title,
      };
    },
  },
});