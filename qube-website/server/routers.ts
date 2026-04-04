import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { 
  getFeaturedProducts, 
  getProductsByCategory, 
  getAllProducts,
  getFeaturedProjects,
  getProjectsByCategory,
  getAllProjects,
  getAllLocations,
  getHeadquarters,
  createContactSubmission,
  getContactSubmissions,
  updateContactSubmissionStatus
} from "./db";
import { z } from "zod";
import { notifyOwner } from "./_core/notification";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Products procedures
  products: router({
    featured: publicProcedure.query(async () => {
      return getFeaturedProducts();
    }),
    byCategory: publicProcedure
      .input(z.object({ category: z.enum(["marble", "wood", "engineered"]) }))
      .query(async ({ input }) => {
        return getProductsByCategory(input.category);
      }),
    all: publicProcedure.query(async () => {
      return getAllProducts();
    }),
  }),

  // Projects procedures
  projects: router({
    featured: publicProcedure.query(async () => {
      return getFeaturedProjects();
    }),
    byCategory: publicProcedure
      .input(z.object({ category: z.enum(["residential", "commercial"]) }))
      .query(async ({ input }) => {
        return getProjectsByCategory(input.category);
      }),
    all: publicProcedure.query(async () => {
      return getAllProjects();
    }),
  }),

  // Locations procedures
  locations: router({
    all: publicProcedure.query(async () => {
      return getAllLocations();
    }),
    headquarters: publicProcedure.query(async () => {
      return getHeadquarters();
    }),
  }),

  // Contact submissions procedures
  contact: router({
    submit: publicProcedure
      .input(z.object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        phone: z.string().min(7, "Phone must be at least 7 characters"),
        email: z.string().email().optional(),
        message: z.string().min(10, "Message must be at least 10 characters"),
        projectType: z.string().optional(),
        measurements: z.string().optional(),
        preferredColor: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        try {
          const result = await createContactSubmission({
            name: input.name,
            phone: input.phone,
            email: input.email || null,
            message: [
              input.message,
              input.projectType ? `Project Type: ${input.projectType}` : '',
              input.measurements ? `Measurements: ${input.measurements}` : '',
              input.preferredColor ? `Preferred Color: ${input.preferredColor}` : '',
            ].filter(Boolean).join('\n'),
            status: "new",
            notificationSent: 0,
          });

          // Send notification to owner
          try {
            await notifyOwner({
              title: "New Quote Request",
              content: `New request from ${input.name}\n\nPhone: ${input.phone}\nEmail: ${input.email || "Not provided"}\nProject Type: ${input.projectType || "Not specified"}\nMeasurements: ${input.measurements || "Not specified"}\nPreferred Color: ${input.preferredColor || "Not specified"}\n\nMessage:\n${input.message}`,
            });
          } catch (error) {
            console.error("Failed to send owner notification:", error);
          }

          return {
            success: true,
            message: "Your message has been sent successfully",
          };
        } catch (error) {
          console.error("Failed to create contact submission:", error);
          throw new Error("Failed to submit contact form");
        }
      }),

    list: publicProcedure.query(async ({ ctx }) => {
      // Only allow admin users to view submissions
      if (ctx.user?.role !== "admin") {
        throw new Error("Unauthorized");
      }
      return getContactSubmissions();
    }),

    updateStatus: publicProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["new", "read", "responded"]),
      }))
      .mutation(async ({ input, ctx }) => {
        // Only allow admin users to update status
        if (ctx.user?.role !== "admin") {
          throw new Error("Unauthorized");
        }
        return updateContactSubmissionStatus(input.id, input.status);
      }),
  }),
});

export type AppRouter = typeof appRouter;
