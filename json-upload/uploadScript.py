import firebase_admin
from firebase_admin import credentials, storage
import os

# Import UUID4 to create token
from uuid import uuid4

dirname = os.path.dirname(os.path.realpath(__file__))
keyFilePath = dirname + '/json-upload-12aa7-12e10899219f.json'

cred = credentials.Certificate(keyFilePath)
firebase_admin.initialize_app(cred, {
    'storageBucket' : 'json-upload-12aa7.appspot.com'
})

bucket = storage.bucket()

fileName = 'test.zip'

fileFullPath = dirname + '/' + fileName

blob = bucket.blob(fileName)

# Create new token, this one only used for downloading directly from firebase console page
accessToken = uuid4()

# Create new dictionary with the metadata
metadata = { "firebaseStorageDownloadTokens": accessToken }

# Set meta data for the blob wich contains the access token
blob.metadata = metadata

blob.upload_from_filename(fileFullPath)

blob.make_public()

print("your file url ", blob.public_url)
