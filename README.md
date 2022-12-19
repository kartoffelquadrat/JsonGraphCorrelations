# Json Graph Correlator (JGC)

Minimal Graph navigation based on parent / child correlations.

![clojure linter](https://img.shields.io/badge/Clojure%20Linter-202.1-blue)
![boostrap css](https://img.shields.io/badge/Bootstrap%20CSS-4.1.3-blue)

## About

This repository hosts sources of the *Json Graph Correlator* (JGC), an interactive website to explore git-commit diff
data, mined form github.  
Purpose of the analysis is to identify which code changes are overrepresented in the context of bugfix commits.

## Access

The JGC is ready for exploration on [github pages](https://m5c.github.io/JsonGraphCorrelator/).

### Usage

 * Graph exploration starts at the root node, which is the default node in *Node Info* section.
 * Click on sub or parent nodes, using the *Related Nodes* section.
 * At any time you can jump back to the root node, using the *Focus Root-Node* button.

#### Other Features

Use the checkboxes to enable / disable:

 * *Show Identifiers*, to show / hide node IDs.
 * *Show Extensions*, to show / hide node extension counters.
 * *Dynamic Payload Height*, to auto-grow node concepts to wrap overly long content, rather than cropping to an excerpt.

## Sources

The JCG sources and graph data are located in the [```docs``` directory](docs):

* Sources
    * ```docs/index.html```: Static parts of JGC DOM-Tree
    * ```docs/styles.css```: Custom styles, mostly for grid-view and side-by side panels.
    * ```docs/graphNavigationUtils.js```: JavaScript functions for graph parsing and dynamic DOM updates.
    * ```docs/uiElements```: JavaScript functions to replace BootStrap overhead (we only use BootStrap's CSS)
* Graph data:
    * [```docs/minified_lattice.json```](https://raw.githubusercontent.com/kartoffelquadrat/JsonGraphCorrelator/master/docs/minified_lattice.json): Graph data as JSON map. Every entry represents a node-id +
      associated data.

## Contributions / Pull Requests

 * Graph Data: [Jessie Galasso-Carbonnel](https://jgalasso.github.io/), Université de Montréal
 * HTML / JS Implementation: [Maximilian Schiedermeier](https://www.cs.mcgill.ca/~mschie3/), McGill University 
