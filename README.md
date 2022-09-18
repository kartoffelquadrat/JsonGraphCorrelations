# Json Graph Correlator (JGC)

Minimal Graph navigation based on parent / child correlations.

![clojure linter](https://img.shields.io/badge/Clojure%20Linter-202.1-blue)
![boostrap css](https://img.shields.io/badge/Bootstrap%20CSS-4.1.3-blue)

## About

This repository hosts sources of the *Json Graph Correlator* (JGC), an interactive website to explore git-commit diff
data, mined form github.  
Purpose of the analysis is to identify which code changes are overrepresented in the context of bugfix commits.

## Access

The JGC is ready for exploration on [github pages](https://kartoffelquadrat.github.io/JsonGraphCorrelator/).

## Sources

The JCG sources and graph data are located in the [```docs``` directory](docs):

* Sources
    * ```docs/index.html```: Static parts of JGC DOM-Tree
    * ```docs/styles.css```: Custom styles, mostly for grid-view and side-by side panels.
    * ```docs/graphNavigationUtils.js```: JavaScript functions for graph parsing and dynamic DOM updates.
    * ```docs/uiElements```: JavaScript functions to replace BootStrap overhead (we only use BootStrap's CSS)
* Graph data:
    * [```minified_lattice.json```](minified_lattice.json): Graph data as JSON map. Every entry represents a node-id +
      associated data.

## Contributions / Pull Requests

* Graph Data: [Jessie Galasso-Carbonnel](https://jgalasso.github.io/), Université de Montréal
* HTML / JS Implementation: [Maximilian Schiedermeier](https://www.cs.mcgill.ca/~mschie3/). McGill University 
