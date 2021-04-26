
# The Primo New UI Customization Workflow Development Environment

## UG NOTES

The 01OCUL_GUE-GUELPH folders and vid related naming is required for packaging up the zip for customization package

The portion under the heading Package documentation was the default that came from github. UG notes follow.

### to deploy to Primo
To create a zip file of this view code for Primo deployment there are apparently two options:

1. you can upload the <VIEW> directory to Primo studio:  and create/download the package - UG did not try this
2. Just create the zip locally while excluding a few files, do this from the views parent directory, ie the custom folder:
zip -r 01OCUL_GUE-GUELPH.zip 01OCUL_GUE-GUELPH/ -x "*.DS_Store" -x "*.git*" -x "*.json"
zip -r 01OCUL_GUE-DEV.zip 01OCUL_GUE-DEV/ -x "*.DS_Store" -x "*.git*" -x "*.json"
zip -r GUELPH.zip GUELPH/ -x "*.DS_Store" -x "*.git*" -x "*.json"
zip -r LAURIER.zip LAURIER/ -x "*.DS_Store" -x "*.git*" -x "*.json"

******************* END OF UG NOTES *******************


## Package documentation

The development package allows you to configure :

- css

- images

- html

- JavaScript

- The root directory of the package should be named either by the `viewCode` or `CENTRAL_PACKAGE` in case of a consortia level package
- Whether you develop a consortia level package or a view level package the process remains the same
- Once deployed the hierarchy is as follows:
    1. For css - use the cascading ability of css and load the consortia level (CENTRAL_PACKAGE) css first and the view level css afterwards
    2. For images and html - the system checks for every file if it exists in each level - and prefers the view level file if exists
    3. For JavaScript - the two package types define 2 different Angular modules:
        - ```var app = angular.module('viewCustom', ['angularLoad']);```
        - ```var app = angular.module('centralCustom', ['angularLoad']);```

  and loads both of the modules,

- For each configuration type there is a specified folder in the custom package folder (that can be downloaded form your Primo Back Office)
- In each folder you will find a specific README.md file with recipes/examples.











