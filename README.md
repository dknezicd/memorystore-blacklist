# memorystore-blacklist


# JWT Blacklist (via MemoryStore) example

This example contains an example API Proxy that shows an example of interacting with a cloud function capable of tracking ids for the use case of blacklisting.

Note, this example API Proxy is to simply demonstrate interacting with the underlying Cloud Function. An actual solution for JWT Blacklisting would leverage these policies and cloud function as part of your token validation process.

## Disclaimer

This example is not an official Google product, nor is it part of an official Google product

## Contents

* API Proxy - jwt-test
  (An Example test proxy that reads from KVM, get a googleapis Token, and invokes the cloud function, returning its response.)   This proxy is supported by 3 shared flows:
  * gcp-auth (Retrieves a token from https://oauth2.googleapis.com/token using a service account)
  * blacklist-put (Sends a PUT request to the example cloud function)
  * blacklist-lookup (Sends a GET request to the example cloud function)
* Cloud Function - Interacts with a configured MemoryStore instance to check the state of a particular id or to set its value

## Configuration
* The API Proxy requires an environment kvm named `gcp-cf-jwtids`, containing entries
  * `service_account_key`
    
    Your Google Cloud Service Account for access to your Cloud Function
  * `target`

    Address of your deployed Cloud Function eg `https://us-central1-bob-project.cloudfunctions.net/jwt-ids`
          
* By default, the gcp-auth shared flow is using the shared cache. This can be modified to use a specific cache which can then have specific expiry settings applied.
* GCP Project should be configured with a MemoryStore instance, noting configuration of an appropriate eviction method for your use case.
* Your cloud function requires the environment variable REDISHOST with the IP address of your memorystore instance
* Your cloud function requires the function to execute to be set. flag is the exported function that can be used

## Invocation
Once the API Proxy, Shared Flows and KVM are deployed and configured within Apigee, along with your Cloud Function and MemoryStore in your Google Cloud Project, the API Proxy can be invoked as follows

Checking if an id has been blacklisted

`GET http://<apigee org>-<env>.apigee.net/<proxy basepath>/jwt/<id>`

Eg `GET http://bobcorp-test.apigee.net/jwt-test/jwt/123`


Blacklisting an id

`PUT http://<apigee org>-<env>.apigee.net/<proxy basepath>/jwt/<id>`

Eg `PUT http://bobcorp-test.apigee.net/jwt-test/jwt/123`

Note, this example API Proxy is to simply demonstrate interacting with the underlying Cloud Function. An actual solution for JWT Blacklisting would leverage these policies and cloud function as part of your token validation process.

## License

This material is Copyright 2017-2020 Google LLC and is licensed under the [Apache 2.0
License](LICENSE).
