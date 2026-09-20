import { defineField, defineType } from "sanity";

export const skillsType = defineType({
  name: "skills",
  title: "Skills Section",
  type: "document",

  fields: [
    defineField({
      name: "sectionLabel",
      title: "Section Label",
      type: "string",
      initialValue: "Technical Skills",
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
    // Skill Categories
    // ------------------------------------------------

    defineField({
      name: "categories",
      title: "Skill Categories",
      type: "array",
      validation: (Rule) => Rule.required().min(1),

      of: [
        {
          type: "object",
          name: "skillCategory",
          title: "Skill Category",

          fields: [
            defineField({
              name: "categoryId",
              title: "Category ID",
              type: "slug",
              description:
                "Internal identifier. Example: backend, databases, devops",
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "shortTitle",
              title: "Short Title",
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

            defineField({
              name: "icon",
              title: "Category Icon",
              type: "string",

              options: {
                list: [
                  { title: "Server", value: "server" },
                  { title: "Database", value: "database" },
                  { title: "Layers", value: "layers" },
                  { title: "Shield Check", value: "shieldCheck" },
                  { title: "Wrench", value: "wrench" },
                  { title: "Panels", value: "panels" },
                ],
              },

              validation: (Rule) => Rule.required(),
            }),

            // ------------------------------------------------
            // Skills
            // ------------------------------------------------

            defineField({
              name: "skills",
              title: "Skills",
              type: "array",
              validation: (Rule) => Rule.required().min(1),

              of: [
                {
                  type: "object",
                  name: "skillItem",
                  title: "Skill",

                  fields: [
                    defineField({
                      name: "name",
                      title: "Skill Name",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    }),

                    defineField({
                      name: "icon",
                      title: "Icon Key",
                      type: "string",
                      description:
                        "Must match a key from the frontend skillIcons map.",

                      options: {
                        list: [
                          // Backend
                          { title: "Node.js", value: "nodejs" },
                          { title: "NestJS", value: "nestjs" },
                          { title: "Express", value: "express" },
                          { title: "TypeScript", value: "typescript" },
                          { title: "JavaScript", value: "javascript" },
                          { title: "Zod", value: "zod" },

                          // Databases
                          { title: "PostgreSQL", value: "postgresql" },
                          { title: "MongoDB", value: "mongodb" },
                          { title: "Prisma", value: "prisma" },
                          { title: "SQL", value: "sql" },

                          // Caching & Jobs
                          { title: "Redis", value: "redis" },
                          { title: "BullMQ", value: "bullmq" },
                          { title: "Cron Jobs", value: "cron" },

                          // APIs & Security
                          { title: "REST APIs", value: "restApi" },
                          { title: "JWT", value: "jwt" },
                          { title: "RBAC", value: "rbac" },
                          { title: "Socket.IO", value: "socketio" },
                          { title: "Webhooks", value: "webhooks" },
                          { title: "Swagger", value: "swagger" },

                          // DevOps
                          { title: "Linux", value: "linux" },
                          { title: "Nginx", value: "nginx" },
                          { title: "PM2", value: "pm2" },
                          { title: "Docker", value: "docker" },
                          { title: "Git", value: "git" },

                          // Frontend
                          { title: "React", value: "react" },
                          { title: "Next.js", value: "nextjs" },
                          { title: "Tailwind CSS", value: "tailwind" },
                          { title: "Shadcn UI", value: "shadcn" },
                        ],
                      },

                      validation: (Rule) => Rule.required(),
                    }),

                    defineField({
                      name: "color",
                      title: "Icon Color",
                      type: "string",
                      description:
                        "CSS color used for the skill icon. Example: #339933",
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
                      title: "name",
                      subtitle: "icon",
                    },
                  },
                },
              ],
            }),

            defineField({
              name: "order",
              title: "Category Order",
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
        title: "Skills Section",
        subtitle: title,
      };
    },
  },
});