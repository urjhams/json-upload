import firebase_admin
from firebase_admin import credentials, firestore
import os
import sys
import json

# base64 decoded key file will be stored in temporary directory
# https://github.com/marketplace/actions/base64-to-file
githubTempPath = '/Users/runner/work/_temp'

# google cloud's service account key file absolute path on github's machine directory
keyFilePath = githubTempPath + '/service_account_key.json'

cred = credentials.Certificate(keyFilePath)
firebase_admin.initialize_app(cred, {
    'databaseURL': 'json-upload-12aa7.firebaseio.com'
})

db = firestore.client()

def uploadJsonToFireBase(json, version):
    docRef = db.collection(u'firmware').document(u'wr1')
    docRef.set({
        'json': json,
        'version': version
    })

dirname = os.path.dirname(os.path.realpath(__file__))

fileName = 'default_table_v3.2.json'
fileFullPath = dirname + '/' + fileName

with open(fileFullPath) as json_file:
    data = json.load(json_file)
    version = data['version']
    uploadJsonToFireBase(data, version)

