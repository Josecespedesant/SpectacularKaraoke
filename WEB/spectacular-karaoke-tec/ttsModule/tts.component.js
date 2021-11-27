// Copyright 2017 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * This application demonstrates how to perform basic recognize operations with
 * with the Google Cloud Speech API.
 *
 * For more information, see the README.md under /speech and the documentation
 * at https://cloud.google.com/speech/docs.
 */

 'use strict';

 
 function main(
   encoding = 'LINEAR16',
   sampleRateHertz = 16000,
   languageCode = 'en-US'
 ) {
   // [START micStreamRecognize]
   const recorder = require('node-record-lpcm16');
 
   // Imports the Google Cloud client library
   const speech = require('@google-cloud/speech');

   
 
   /**
    * TODO(developer): Uncomment the following lines before running the sample.
    */
   // const encoding = 'LINEAR16';
   // const sampleRateHertz = 16000;
   // const languageCode = 'en-US';
 
   const config = {
     encoding: encoding,
     sampleRateHertz: sampleRateHertz,
     languageCode: languageCode,
   };
 
   const request = {
     config,
     interimResults: false, //Get interim results from stream
   };
 
   // Creates a client
   const client = new speech.SpeechClient();
 
   let trans=[]
   
   // Create a recognize stream
   const fs = require('fs')
   fs.writeFile('./test.txt', '', function(){})
   var access = fs.createWriteStream('./test.txt');
   process.stdout.write = access.write.bind(access);
     
   const recognizeStream = client
     .streamingRecognize(request)
     .on('error', console.error)
     .on('data', data =>
       process.stdout.write(
         data.results[0] && data.results[0].alternatives[0]
           ? `${data.results[0].alternatives[0].transcript} `
           : '\n\nReached transcription time limit, press Ctrl+C\n'
       )
     );
 
   // Start recording and send the microphone input to the Speech API
   recorder
     .record({
       sampleRateHertz: sampleRateHertz,
       threshold: 0, //silence threshold
       recordProgram: 'rec', // Try also "arecord" or "sox"
       silence: '5.0', //seconds of silence before ending
     })
     .stream()
     .on('error', console.error)
     .pipe(recognizeStream);
   // [END micStreamRecognize]
 }
 
 process.on('unhandledRejection', err => {
   console.error(err.message);
   process.exitCode = 1;
 });
 
 main(...process.argv.slice(2));