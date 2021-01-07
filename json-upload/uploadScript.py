import firebase_admin
from firebase_admin import credentials
from firebase_admin import storage
import pathlib
import os

dirname = os.path.dirname(__file__)
keyFilePath = os.path.join(dirname, './json-upload-301011-6cd8a2247084.json')
cred = credentials.Certificate(keyFilePath)
firebase_admin.initialize_app(cred, {
    'storageBucket' : 'json-upload-12aa7.appspot.com'
})

bucket = storage.bucket()

fileName = 'usb_conversion_tables.json'

blob = bucket.blob(fileName)

blob.upload_from_filename(fileName)

blob.make_public()

print("your file url ", blob.public_url)
