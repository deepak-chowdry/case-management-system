import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  cases: defineTable({
    caseName: v.string(),
    caseType: v.string(),
    fileId: v.optional(v.string()),
    fileName: v.optional(v.string()),
    status: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }),
  files: defineTable({
    caseId: v.id("cases"),
    storageId: v.string(),
    fileName: v.string(),
    fileSize: v.number(),
    uploadedAt: v.number(),
  }),
});
