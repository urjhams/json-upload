import firebase_admin
from firebase_admin import credentials, storage
import os
import sys

# Import UUID4 to create token
from uuid import uuid4

# base64 decoded key file will be stored in temporary directory
# https://github.com/marketplace/actions/base64-to-file
githubTempPath = '/Users/runner/work/_temp'

# google cloud's service account key file absolute path on github's machine directory
keyFilePath = githubTempPath + '/service_account_key.json'

# apply the bucket domain to the credentials
cred = credentials.Certificate(keyFilePath)
firebase_admin.initialize_app(cred, {
    'storageBucket' : 'json-upload-12aa7.appspot.com'
})

# refer to the storage bucket
bucket = storage.bucket()

# get the upload file's path in repository's directory
fileName = 'test.zip'
dirname = os.path.dirname(os.path.realpath(__file__))
fileFullPath = dirname + '/' + fileName

# if the file name contains file path, the bucket will create folders corresponding to the path.
blob = bucket.blob(fileName)

# Create new token, this one only used for downloading directly from firebase console page
accessToken = uuid4()

# Create new dictionary with the metadata
metadata = { "firebaseStorageDownloadTokens": accessToken }

# Set meta data for the blob wich contains the access token
blob.metadata = metadata

#upload to firebase storage
blob.upload_from_filename(fileFullPath)

# optional
blob.make_public()

print("your file url ", blob.public_url)
