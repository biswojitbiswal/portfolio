import { defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",

  fields: [
    defineField({
      name: "status", title: "Status", type: "string",
      options: { list: ["Production", "Development", "Completed"] },
    }),
    defineField({
      name: "highlights", title: "Project Highlights", type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "liveSiteHref", title: "Live Website", type: "url",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "title",
      title: "Project Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description:
        "Used for the project URL. Example: blink-brand-solutions",
      options: {
        source: "title",
        maxLength: 100,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "category",
      title: "Category",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "role",
      title: "My Role",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "description",
      title: "Short Description",
      type: "text",
      rows: 3,
      description:
        "Short project description used on the home page and projects page.",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "image",
      title: "Project Image",
      type: "image",
      options: {
        hotspot: true,
      },

      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
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
      name: "featured",
      title: "Featured Project",
      type: "boolean",
      description:
        "Featured project is displayed as the large project card.",
      initialValue: false,
    }),

    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      validation: (Rule) =>
        Rule.required().integer().min(1),
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
      title: "title",
      subtitle: "category",
      media: "image",
    },

    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle,
        media,
      };
    },
  },
});