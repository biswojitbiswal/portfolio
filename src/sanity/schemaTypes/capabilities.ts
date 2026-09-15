import { defineField, defineType } from "sanity";

export const capabilitiesType = defineType({
  name: "capabilities",
  title: "Capabilities Section",
  type: "document",

  fields: [
    defineField({
      name: "sectionLabel",
      title: "Section Label",
      type: "string",
      initialValue: "Backend Capabilities",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "capabilityItems",
      title: "Capabilities",
      type: "array",
      validation: (Rule) => Rule.required().min(1),

      of: [
        {
          type: "object",
          name: "capabilityItem",
          title: "Capability",

          fields: [
            defineField({
              name: "key",
              title: "Key",
              type: "string",
              description:
                "Internal identifier. Example: api, auth, database",
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "title",
              title: "Title",
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

            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              options: {
                list: [
                  { title: "Braces", value: "braces" },
                  { title: "Shield Check", value: "shieldCheck" },
                  { title: "Database", value: "database" },
                  { title: "Zap", value: "zap" },
                  { title: "Radio", value: "radio" },
                  { title: "Puzzle", value: "puzzle" },
                  { title: "Cloud Cog", value: "cloudCog" },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "examples",
              title: "Examples",
              type: "array",
              of: [{ type: "string" }],
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
              title: "title",
              subtitle: "description",
            },
          },
        },
      ],
    }),

    defineField({
      name: "approachLabel",
      title: "Engineering Approach Label",
      type: "string",
      initialValue: "Engineering approach",
    }),

    defineField({
      name: "approachItems",
      title: "Engineering Approach",
      type: "array",
      of: [
        {
          type: "object",
          name: "approachItem",
          title: "Approach Item",

          fields: [
            defineField({
              name: "title",
              title: "Title",
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
              title: "title",
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
        title: "Capabilities Section",
        subtitle: title,
      };
    },
  },
});