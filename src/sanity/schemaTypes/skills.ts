import { defineField, defineType } from "sanity";
import { extraSkillPresets } from "@/lib/skill-icon-presets";

const customIconFields = () => [
  defineField({
    name: "iconName",
    title: "Custom Icon Name",
    type: "string",
    description: "Overrides the preset. Lucide: Database, brain-circuit, or lucide/Server. React Icons: SiReactquery, SiPostman, fa6/FaAws, or md/MdCode. Copy the exact name from lucide.dev or react-icons.github.io/react-icons. Names must exist in the installed library version; unknown names show a default icon.",
    validation: (Rule) => Rule.max(100).regex(/^(?:[a-z0-9]+\/)?[A-Za-z][A-Za-z0-9-]*$/, { name: "icon name" }),
  }),
  defineField({
    name: "iconImage",
    title: "Icon Image (optional)",
    type: "image",
    description: "Takes priority over the custom name and preset. Use a square PNG or WebP with a transparent background. If no icon is provided, the UI uses a default icon.",
    options: { accept: "image/png,image/webp,image/jpeg,image/svg+xml" },
  }),
];

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
                "Internal identifier. Add any category, such as frontend, testing, devops, or ai-search. No frontend code change is needed.",
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
                  { title: "Testing", value: "testing" },
                  { title: "Cloud / DevOps", value: "cloud" },
                  { title: "AI & Search", value: "ai" },
                  { title: "API Tools", value: "apiTools" },
                ],
              },

            }),
            ...customIconFields(),

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
                        "Choose a preset, enter a Custom Icon Name, or upload an Icon Image below.",

                      options: {
                        list: [
                          ...extraSkillPresets.map(({ title, value }) => ({ title, value })),
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

                    }),
                    ...customIconFields(),

                    defineField({
                      name: "color",
                      title: "Icon Color",
                      type: "string",
                      description:
                        "Optional CSS color for icons (not uploaded images). Example: #339933",
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