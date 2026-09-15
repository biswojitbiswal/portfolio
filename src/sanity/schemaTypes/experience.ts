import { defineField, defineType } from "sanity";

export const experienceType = defineType({
  name: "experience",
  title: "Experience Section",
  type: "document",

  fields: [
    // ----------------------------------------------------------------
    // Section Content
    // ----------------------------------------------------------------

    defineField({
      name: "desktopSectionLabel",
      title: "Desktop Section Label",
      type: "string",
      initialValue: "Professional Experience",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "mobileSectionLabel",
      title: "Mobile Section Label",
      type: "string",
      initialValue: "Experience",
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

    // ----------------------------------------------------------------
    // Statistics
    // ----------------------------------------------------------------

    defineField({
      name: "stats",
      title: "Statistics",
      type: "array",
      validation: (Rule) => Rule.required().min(1),

      of: [
        {
          type: "object",
          name: "experienceStat",
          title: "Statistic",

          fields: [
            defineField({
              name: "value",
              title: "Value",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),

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
              title: "value",
              subtitle: "label",
            },
          },
        },
      ],
    }),

    // ----------------------------------------------------------------
    // Current Focus
    // ----------------------------------------------------------------

    defineField({
      name: "focusLabel",
      title: "Focus Label",
      type: "string",
      initialValue: "Current focus",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "focusItems",
      title: "Current Focus Items",
      type: "array",
      of: [
        {
          type: "object",
          name: "focusItem",
          title: "Focus Item",

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

    // ----------------------------------------------------------------
    // Experience Timeline
    // ----------------------------------------------------------------

    defineField({
      name: "experiences",
      title: "Experiences",
      type: "array",
      validation: (Rule) => Rule.required().min(1),

      of: [
        {
          type: "object",
          name: "experienceItem",
          title: "Experience",

          fields: [
            defineField({
              name: "experienceId",
              title: "Experience ID",
              type: "slug",
              description:
                "Internal identifier. Example: kgn-infotech",
              options: {
                source: "company",
                maxLength: 80,
              },
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "company",
              title: "Company",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "shortName",
              title: "Short Name",
              type: "string",
              description:
                "Short text displayed inside the company icon. Example: K",
              validation: (Rule) =>
                Rule.required().max(3),
            }),

            defineField({
              name: "role",
              title: "Role",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "employmentType",
              title: "Employment Type",
              type: "string",
              options: {
                list: [
                  { title: "Full-time", value: "Full-time" },
                  { title: "Part-time", value: "Part-time" },
                  { title: "Internship", value: "Internship" },
                  { title: "Freelance", value: "Freelance" },
                  { title: "Contract", value: "Contract" },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "location",
              title: "Location",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "period",
              title: "Period",
              type: "string",
              description: "Example: Jul 2024 — Present",
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "current",
              title: "Current Position",
              type: "boolean",
              initialValue: false,
            }),

            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "achievements",
              title: "Achievements",
              type: "array",
              of: [
                {
                  type: "string",
                },
              ],
              validation: (Rule) => Rule.required().min(1),
            }),

            defineField({
              name: "technologies",
              title: "Technologies",
              type: "array",
              of: [
                {
                  type: "string",
                },
              ],
              validation: (Rule) => Rule.required().min(1),
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
              title: "company",
              subtitle: "role",
            },
          },
        },
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
    },

    prepare({ title }) {
      return {
        title: "Experience Section",
        subtitle: title,
      };
    },
  },
});