import { defineField, defineType } from "sanity";

export const projectsSectionType = defineType({
  name: "projectsSection",
  title: "Projects Section",
  type: "document",

  fields: [
    defineField({
      name: "desktopSectionLabel",
      title: "Desktop Section Label",
      type: "string",
      initialValue: "Projects",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "mobileSectionLabel",
      title: "Mobile Section Label",
      type: "string",
      initialValue: "Selected Work",
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

    defineField({
      name: "viewAllLabel",
      title: "View All Label",
      type: "string",
      initialValue: "View all projects",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "viewAllHref",
      title: "View All Link",
      type: "string",
      initialValue: "/projects",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "caseStudyLabel",
      title: "Case Study Button Label",
      type: "string",
      initialValue: "View case study",
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
      title: "heading",
    },

    prepare({ title }) {
      return {
        title: "Projects Section",
        subtitle: title,
      };
    },
  },
});