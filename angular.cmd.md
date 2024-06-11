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

## preview markdon VSCODE

#### preview with side by side editing
`ctrl+k then v`

#### just previewing
`ctrl+shit+v`


## Angular Schematics
Entity
ng g entity store/entities/settings/aircraft --reducers ../../reducers/index.ts --flat false --skip-tests true

Effect
ng g effect store/entities/settings/aircraft --root -m app.module.ts --flat false --skip-tests true

Selector
ng g selector store/settings/material-category --flat false --skip-tests true

Module
ng g m modules/asset-disposal --routing=true --flat false && ng g c modules/asset-disposal --skip-tests=true -m=asset-disposal


### DEPENDING on your store configuration
Entity
ng g entity store/entities/settings/aircraft/aircraft --reducers ../../reducers/index.ts --flat false --skip-tests true

Effect
ng g effect store/entities/settings/aircraft --root -m ../../effects/index.ts --flat false --skip-tests true

Selector
ng g selector store/entities/settings/aircraft --flat false --skip-tests true

Module
ng g m modules/asset-disposal --routing=true --flat false && ng g c modules/asset-disposal --skip-tests=true -m=asset-disposal



### REACTIVE APPLICATION
Reactive applications1234are designed to be:
* `Responsive:` They can handle real-time changes and react to events.
* `Resilient:` They can handle changing conditions and scale dynamically.
* `Scalable:` They elastically scale up or down based on workload.
* `Message-driven:` They rely on asynchronous programming and data streams.