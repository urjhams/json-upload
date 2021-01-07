import firebase_admin
from firebase_admin import credentials
from firebase_admin import storage
import os

dirname = os.path.dirname(os.path.realpath(__file__))
keyFilePath = dirname + '/json-upload-12aa7-12e10899219f.json'

cred = credentials.Certificate(keyFilePath)
firebase_admin.initialize_app(cred, {
    'storageBucket' : 'json-upload-12aa7.appspot.com'
})

bucket = storage.bucket()

fileName = dirname + '/test.zip'

blob = bucket.blob(fileName)

blob.upload_from_filename(fileName)

blob.make_public()

print("your file url ", blob.public_url)
