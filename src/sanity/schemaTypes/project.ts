import { defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Projects",
  type: "document",

  fields: [
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
      options: {
        source: "title",
        maxLength: 96,
      },
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
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "technologies",
      title: "Technologies",
      type: "array",
      of: [{ type: "string" }],
    }),

    defineField({
      name: "role",
      title: "My Role",
      type: "string",
    }),

    defineField({
      name: "overview",
      title: "Project Overview",
      type: "text",
      rows: 5,
    }),

    defineField({
      name: "keyFeatures",
      title: "Key Features",
      type: "array",
      of: [{ type: "string" }],
    }),

    defineField({
      name: "githubUrl",
      title: "GitHub URL",
      type: "url",
    }),

    defineField({
      name: "liveUrl",
      title: "Live URL",
      type: "url",
    }),

    defineField({
      name: "featured",
      title: "Featured Project",
      type: "boolean",
      initialValue: false,
    }),

    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 1,
    }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "role",
      media: "thumbnail",
    },
  },
});