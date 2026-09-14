import { defineField, defineType } from "sanity";

export const aboutType = defineType({
  name: "about",
  title: "About Section",
  type: "document",

  fields: [
    defineField({
      name: "sectionLabel",
      title: "Section Label",
      type: "string",
      initialValue: "About Me",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "headingFirstLine",
      title: "Heading First Line",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "headingSecondLine",
      title: "Heading Second Line",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "desktopDescription",
      title: "Desktop Description",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "mobileDescription",
      title: "Mobile Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "statsLabel",
      title: "Stats Label",
      type: "string",
      initialValue: "At a glance",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "stats",
      title: "Statistics",
      type: "array",
      validation: (Rule) => Rule.required().min(1),

      of: [
        {
          type: "object",
          name: "aboutStat",
          title: "Statistic",

          fields: [
            defineField({
              name: "title",
              title: "Title / Value",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "description",
              title: "Description",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              options: {
                list: [
                  {
                    title: "Briefcase",
                    value: "briefcase",
                  },
                  {
                    title: "File",
                    value: "file",
                  },
                  {
                    title: "Rocket",
                    value: "rocket",
                  },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "order",
              title: "Order",
              type: "number",
              validation: (Rule) => Rule.required().integer().min(1),
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
      name: "currentStatus",
      title: "Current Status",
      type: "string",
      validation: (Rule) => Rule.required(),
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
      title: "headingFirstLine",
      subtitle: "headingSecondLine",
    },

    prepare({ title, subtitle }) {
      return {
        title: "About Section",
        subtitle: `${title ?? ""} ${subtitle ?? ""}`,
      };
    },
  },
});