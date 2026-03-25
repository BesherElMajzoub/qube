import { describe, it, expect, beforeEach, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("contact.submit", () => {
  it("should accept valid contact form submission", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submit({
      name: "Ahmed Al-Rashid",
      phone: "+966123456789",
      email: "ahmed@example.com",
      message: "I am interested in your marble surfaces for my new project.",
    });

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.message).toContain("sent successfully");
  });

  it("should reject submission with short name", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.contact.submit({
        name: "A",
        phone: "+966123456789",
        email: "test@example.com",
        message: "This is a valid message with enough characters.",
      });
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.message).toContain("at least 2 characters");
    }
  });

  it("should reject submission with short phone", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.contact.submit({
        name: "Ahmed Al-Rashid",
        phone: "123",
        email: "test@example.com",
        message: "This is a valid message with enough characters.",
      });
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.message).toContain("at least 7 characters");
    }
  });

  it("should reject submission with short message", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.contact.submit({
        name: "Ahmed Al-Rashid",
        phone: "+966123456789",
        email: "test@example.com",
        message: "Short",
      });
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.message).toContain("at least 10 characters");
    }
  });

  it("should accept submission without email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submit({
      name: "Fatima Al-Otaibi",
      phone: "+966987654321",
      message: "I would like to inquire about your engineered surfaces.",
    });

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
  });
});

describe("products queries", () => {
  it("should fetch featured products", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const products = await caller.products.featured();
    expect(Array.isArray(products)).toBe(true);
  });

  it("should fetch all products", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const products = await caller.products.all();
    expect(Array.isArray(products)).toBe(true);
  });

  it("should fetch products by category", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const marbleProducts = await caller.products.byCategory({ category: "marble" });
    expect(Array.isArray(marbleProducts)).toBe(true);
  });
});

describe("projects queries", () => {
  it("should fetch featured projects", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const projects = await caller.projects.featured();
    expect(Array.isArray(projects)).toBe(true);
  });

  it("should fetch all projects", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const projects = await caller.projects.all();
    expect(Array.isArray(projects)).toBe(true);
  });

  it("should fetch projects by category", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const residentialProjects = await caller.projects.byCategory({ category: "residential" });
    expect(Array.isArray(residentialProjects)).toBe(true);
  });
});

describe("locations queries", () => {
  it("should fetch all locations", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const locations = await caller.locations.all();
    expect(Array.isArray(locations)).toBe(true);
  });

  it("should fetch headquarters", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const hq = await caller.locations.headquarters();
    if (hq) {
      expect(hq.isHeadquarters).toBe(1);
    }
  });
});
