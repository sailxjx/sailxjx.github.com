#!/bin/bash

jade index.jade
stylus -c stylus -o stylesheets
coffee -o javascripts -c coffeescripts
