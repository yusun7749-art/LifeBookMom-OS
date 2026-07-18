from __future__ import annotations

import struct
import tempfile
import unittest
from pathlib import Path

from lifebookmom_assets.asset_qa_engine import image_size, validate


def fake_png(path: Path, width: int, height: int) -> None:
    path.write_bytes(b"\x89PNG\r\n\x1a\n" + b"\x00" * 8 + struct.pack(">II", width, height))


class AssetQATests(unittest.TestCase):
    def test_valid_dimensions_and_reviews_become_publish_ready(self):
        with tempfile.TemporaryDirectory() as tmp:
            base = Path(tmp)
            thumb = base / "thumb.png"
            info = base / "info.png"
            fake_png(thumb, 1600, 900)
            fake_png(info, 1080, 1920)
            manifest = {
                "content_id": "LBM-1",
                "status": "ASSETS_READY",
                "assets": [
                    {"type": "thumbnail", "path": str(thumb)},
                    {"type": "infographic", "path": str(info)},
                ],
            }
            draft = {"content_id": "LBM-1", "status": "ASSETS_READY"}
            review = {
                "infographic_has_10_panels": True,
                "watermark_present_bottom_right_inside": True,
                "character_matches_brand_lock": True,
                "no_adult_teen_or_male_main_character": True,
                "text_is_legible_and_not_clipped": True,
            }
            report, updated = validate(manifest, draft, review)

        self.assertTrue(report["passed"])
        self.assertEqual(report["status"], "ASSET_QA_PASS")
        self.assertEqual(updated["status"], "PUBLISH_READY")
        self.assertEqual(updated["next_stage"], "PUBLISH_READY")

    def test_missing_visual_review_fails_closed(self):
        with tempfile.TemporaryDirectory() as tmp:
            base = Path(tmp)
            thumb = base / "thumb.png"
            info = base / "info.png"
            fake_png(thumb, 1600, 900)
            fake_png(info, 1080, 1920)
            manifest = {
                "content_id": "LBM-2",
                "status": "ASSETS_READY",
                "assets": [
                    {"type": "thumbnail", "path": str(thumb)},
                    {"type": "infographic", "path": str(info)},
                ],
            }
            report, updated = validate(manifest, {"content_id": "LBM-2"}, {})

        self.assertFalse(report["passed"])
        self.assertEqual(updated["next_stage"], "ASSET_REWORK")
        self.assertTrue(any(issue["code"].startswith("REVIEW_") for issue in report["issues"]))

    def test_wrong_ratio_is_rejected(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / "square.png"
            fake_png(path, 1000, 1000)
            self.assertEqual(image_size(path), (1000, 1000))
            manifest = {
                "content_id": "LBM-3",
                "status": "ASSETS_READY",
                "assets": [
                    {"type": "thumbnail", "path": str(path)},
                    {"type": "infographic", "path": str(path)},
                ],
            }
            review = {
                "infographic_has_10_panels": True,
                "watermark_present_bottom_right_inside": True,
                "character_matches_brand_lock": True,
                "no_adult_teen_or_male_main_character": True,
                "text_is_legible_and_not_clipped": True,
            }
            report, _ = validate(manifest, {"content_id": "LBM-3"}, review)

        codes = {issue["code"] for issue in report["issues"]}
        self.assertIn("THUMBNAIL_RATIO_INVALID", codes)
        self.assertIn("INFOGRAPHIC_RATIO_INVALID", codes)


if __name__ == "__main__":
    unittest.main()
