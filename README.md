### Hoja de ruta

* Como hemos de relacionarnos con los tests de los componentes

### Fallos conocidos

* Cambios de URL no provocan re-rendering del componente

# Convention
## Naming
lowerCamelCase is the choice for directories and files.
```
components/house/mainWindow/...
```

# Workflows

## Creating a new component
### 1) Create a component
```
$ suistudio generate house window
```

### 2) Install component dependencies
```
$ suistudio run-all npm install
```

### 3) Commit changes using the appropiate command
First of all, stage you changes for commit with ```git add``` or whatever you use.

DO NOT use ```git commit``` directly. Instead, use:
```
$ npm run co
```
It will prompt a question form. The way you answer to this question form affects the way the commit's comment is built. Comments will be used later, after merging to master in order to decide what kind of change (release) is going to be done (minor or major).

Then just push your changes using ```git push``` and merge them into master after review.

### 4) Release

Select master branch. First, check that the release will be properly built by executing:
```
$ suistudio check-release
```
If the output is the expected then run:
```
$ suistudio release
```




