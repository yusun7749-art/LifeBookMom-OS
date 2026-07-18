from __future__ import annotations
import tempfile, unittest
from pathlib import Path
from lifebookmom_assets.asset_completion_engine import complete

class AssetCompletionTests(unittest.TestCase):
    def test_images_are_attached_to_matching_draft(self):
        request = {"asset_request_id":"ASSET-LBM-1","content_id":"LBM-1","status":"ASSET_REQUESTED","qa_rules":{"watermark_required":True}}
        draft = {"content_id":"LBM-1","status":"DRAFT_GENERATED","assets":[]}
        with tempfile.TemporaryDirectory() as tmp:
            thumb = Path(tmp)/"thumb.png"; info = Path(tmp)/"info.png"
            thumb.write_bytes(b"x"*2048); info.write_bytes(b"y"*4096)
            manifest, updated = complete(request, draft, thumb, info)
        self.assertEqual(manifest["status"], "ASSETS_READY")
        self.assertEqual(updated["asset_status"], "ASSETS_READY")
        self.assertEqual(updated["next_stage"], "ASSET_QA")
        self.assertEqual(len(updated["assets"]), 2)

    def test_content_id_mismatch_is_blocked(self):
        with self.assertRaisesRegex(ValueError, "content_id"):
            complete({"status":"ASSET_REQUESTED","content_id":"A"}, {"content_id":"B"}, Path("a.png"), Path("b.png"))

if __name__ == "__main__":
    unittest.main()
