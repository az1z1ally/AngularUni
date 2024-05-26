## NPM update
`npm install npm@latest -g`

## Updating angular globally
`npm uninstall -g @angular/cli`
`npm i -g @angular/cli`

## Upgrading Angular to a new version
eg. upgrading to angular 17
`ng update`  -- get a list of packages/library to update
`ng update @angular/core@17 @nagular/cli@17`  -- you can use --force flag
`npm install`

-- You can include all the items tu update in a single ng update i.e `$ @angular/cdk @angular/core @nagular/cli --force`

#### - most of the time runing ng update @angular/cdk --force will update most dependency in package.json then you can follow with ng update @angular/cli@17. Feel free to check the angular upgrade guide for your specific version.