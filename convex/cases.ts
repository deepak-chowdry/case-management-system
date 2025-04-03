import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

// Create a new case
export const createCase = mutation({
  args: {
    caseName: v.string(),
    caseType: v.string(),
    fileId: v.optional(v.string()),
    fileName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const caseId = await ctx.db.insert("cases", {
      caseName: args.caseName,
      caseType: args.caseType,
      fileId: args.fileId,
      fileName: args.fileName,
      status: "pending",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return caseId;
  },
});

// Update case file information
export const updateCaseFile = mutation({
  args: {
    caseId: v.id("cases"),
    fileId: v.string(),
    fileName: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.caseId, {
      fileId: args.fileId,
      fileName: args.fileName,
      updatedAt: Date.now(),
    });
  },
});

// Store file metadata
export const storeFileMetadata = mutation({
  args: {
    caseId: v.id("cases"),
    storageId: v.string(),
    fileName: v.string(),
    fileSize: v.number(),
  },
  handler: async (ctx, args) => {
    const fileId = await ctx.db.insert("files", {
      caseId: args.caseId,
      storageId: args.storageId,
      fileName: args.fileName,
      fileSize: args.fileSize,
      uploadedAt: Date.now(),
    });

    return fileId;
  },
});

// Get case by ID
export const getCase = query({
  args: { id: v.id("cases") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Get all cases
export const getAllCases = query({
  handler: async (ctx) => {
    return await ctx.db.query("cases").collect();
  },
});
