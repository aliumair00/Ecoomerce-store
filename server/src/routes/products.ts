import { Router } from "express"
import { asyncHandler } from "../utils/asyncHandler"
import { listProducts, getProduct, createProduct, updateProduct, deleteProduct, archiveProduct, restoreProduct, setApproval } from "../controllers/products"
import { requireAdmin } from "../middleware/auth"

const router = Router()

router.get("/", asyncHandler(listProducts))
router.get("/:id", asyncHandler(getProduct))
router.post("/", requireAdmin, asyncHandler(createProduct))
router.put("/:id", requireAdmin, asyncHandler(updateProduct))
router.delete("/:id", requireAdmin, asyncHandler(deleteProduct))
router.patch("/:id/archive", requireAdmin, asyncHandler(archiveProduct))
router.patch("/:id/restore", requireAdmin, asyncHandler(restoreProduct))
router.patch("/:id/approve", requireAdmin, asyncHandler(setApproval))

export default router
