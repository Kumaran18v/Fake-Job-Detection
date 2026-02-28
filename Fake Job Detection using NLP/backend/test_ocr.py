import asyncio
from app.routes.ocr import predict_from_image
from app.models import Prediction
import datetime
import io
from PIL import Image

class MockFile:
    def __init__(self):
        img = Image.new('RGB', (100, 100))
        b = io.BytesIO()
        img.save(b, 'PNG')
        self._data = b.getvalue()
        self.filename = "test.png"
        self.content_type = "image/png"
        
    async def read(self):
        return self._data

class MockUser:
    id = 1

class MockDB:
    def add(self, record): pass
    def commit(self): pass
    def refresh(self, record):
        record.id = 1
        record.created_at = datetime.datetime.now()

async def run():
    try:
        res = await predict_from_image(MockFile(), MockDB(), MockUser())
        print("Success:", res)
    except Exception as e:
        import traceback
        traceback.print_exc()

asyncio.run(run())
