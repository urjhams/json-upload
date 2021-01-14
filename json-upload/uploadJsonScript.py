import firebase_admin
from firebase_admin import credentials, firestore
import os
import sys
import json

cred = credentials.ApplicationDefault()

firebase_admin.initialize_aap(cred, {
    'apiKey' : 'AIzaSyDUEhb8jGrhNR53qEA0wB9f1M9IcnhPrXQ',
    'authDomain' : 'json-upload-12aa7.firebaseapp.com'
    'projectId': 'json-upload-12aa7',
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

